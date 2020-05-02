import React, { useState } from 'react';
import { IVehicleType } from '../../../interfaces';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_VEHICLE_TYPE } from '../../../queries';
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import swal from 'sweetalert';

type UpdateVehicleTypeProps = {
  editMode: boolean;
  vehicleType: IVehicleType;
};

const UpdateVehicleType = (props: UpdateVehicleTypeProps) => {
  const [vt, setVt] = useState<IVehicleType>(props.vehicleType);

  const [updateVt, { loading }] = useMutation(UPDATE_VEHICLE_TYPE);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedVt = {
      id: Number(vt.id),
      vehicleType: vt.vehicleType,
      vehicleTypeDescription: vt.vehicleDescription,
    };
    try {
      const { data } = await updateVt({
        variables: {
          input: updatedVt,
        },
      });

      if (data && data.updateVehicleType) {
        swal({ icon: 'success', text: 'Updated successfully.' });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message.replace('GraphQL error: ', '') });
    }
  }

  function handleChange(e: any) {
    e.preventDefault();
    setVt({
      ...vt,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row>
        <Label sm={3}>ID:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='id'
            type='text'
            required
            defaultValue={vt.id}
            disabled
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Vehicle Type:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='vehicleType'
            type='text'
            required
            defaultValue={vt.vehicleType}
            disabled
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Vehicle Type:</Label>
        <Col sm={9}>
          <Input
            onChange={handleChange}
            id='vehicleDescription'
            type='textarea'
            required
            defaultValue={vt.vehicleDescription}
            disabled={!props.editMode}
          />
        </Col>
      </FormGroup>
      {props.editMode ? (
        <div className='text-center'>
          <Button color='dark' type='submit'>
            {loading ? <Spinner color='light' /> : 'Update'}
          </Button>
        </div>
      ) : null}
    </Form>
  );
};

export default UpdateVehicleType;
