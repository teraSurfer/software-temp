import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_VEHICLE } from '../../../queries';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  ButtonGroup,
  Button,
  CardBody,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import UpdateVehicle from './UpdateVehicle';
import { IVehicle } from '../../../interfaces';

type VehicleProps = {};

const Vehicle = (props: VehicleProps) => {
  const { id } = useParams();
  const { data, loading } = useQuery(FETCH_VEHICLE, { variables: { id } });
  const [editMode, toggleEditMode] = useState(false);

  let vehicle: IVehicle = {
    id: '',
    condition: '',
    currentMileage: '',
    lastServiced: '',
    location: '',
    make: '',
    model: '',
    registrationTag: '',
    vehicleType: '',
    year: '',
  };

  if (!loading) {
    delete data.findVehicle.__typename;

    vehicle = {
      ...data.findVehicle,
      location: data.findVehicle.location.locationName,
      vehicleType: data.findVehicle.vehicleType.vehicleType,
    };
  }

  return (
    <Card className='border-0 mt-2 shadow-sm'>
      <CardHeader className='bg-dark text-light border-0 d-flex justify-content-between'>
        <h5 className='mb-0 d-flex align-items-center'>Vehicle</h5>
        <ButtonGroup className='mb-0'>
          <Button
            color='light'
            onClick={() => toggleEditMode(!editMode)}
            outline
            size='sm'
          >
            {editMode ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faPen} />
            )}
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
          <UpdateVehicle editMode={editMode} vehicle={vehicle} />
        )}
      </CardBody>
    </Card>
  );
};

export default Vehicle;
