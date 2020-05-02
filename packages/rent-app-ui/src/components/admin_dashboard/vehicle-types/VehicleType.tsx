import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_VEHICLE_TYPE } from '../../../queries';
import {
  Spinner,
  CardBody,
  Card,
  CardHeader,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateVehicleType from './UpdateVT';
import { IVehicleType } from '../../../interfaces';

type VehicleTypeProps = {};

const VehicleType = (props: VehicleTypeProps) => {
  const { id } = useParams();

  const [editMode, toggleEditMode] = useState(false);
  const { data, loading } = useQuery(GET_VEHICLE_TYPE, {
    variables: { id: Number(id) },
  });

  let vt: IVehicleType = {
    id: '',
    vehicleType: '',
    vehicleDescription: ''
  }

  if (!loading) {
    console.log(data);
    const vtd = data.findOneVehicleType.vehicleTypeDescription;
    delete data.findOneVehicleType.__typename;
    delete data.findOneVehicleType.vehicleTypeDescription;

    vt = {
      ...data.findOneVehicleType,
      vehicleDescription: vtd
    };
  }

  function deleteVt(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  return (
    <Card className='shadow-sm mt-2 border-0'>
      <CardHeader className='bg-dark text-white d-flex justify-content-between'>
        <h4 className='mb-0'>Vehicle Type - {id}</h4>
        <ButtonGroup className='mb-0'>
          <Button
            onClick={() => toggleEditMode(!editMode)}
            color='light'
            outline
            size='sm'
          >
            {editMode ? <Fa icon={faTimes} /> : <Fa icon={faPen} />}
          </Button>
          <Button onClick={deleteVt} color='light' outline size='sm'>
            <Fa icon={faTrash} />
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary'></Spinner>
            <Spinner type='grow' color='accent'></Spinner>
            <Spinner type='grow' color='warning'></Spinner>
          </div>
        ) : (
            <Fragment>
              <UpdateVehicleType editMode={editMode} vehicleType={vt}/>
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default VehicleType;
