import React, { useState, Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
  Spinner,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FETCH_LOCATION } from '../../../queries';
import { useQuery } from '@apollo/react-hooks';
import Table from '../../util/table';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateLocation from './UpdateLocation';
import swal from 'sweetalert';

type LocationProps = {};

const Location = (props: LocationProps) => {
  const { id } = useParams();
  const [editMode, toggleEditMode] = useState(false);

  const { data, loading } = useQuery(FETCH_LOCATION, {
    variables: {
      id: Number(id),
    },
  });

  if (!loading) {
    console.log(data);
    console.log(editMode);
  }

  const vehicleHeaders = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Make',
      accessor: 'make',
    },
    {
      Header: 'Model',
      accessor: 'model',
    },
    {
      Header: 'Registration Tag',
      accessor: 'registrationTag',
    },
  ];

  function deleteLocation(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    swal({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Once deleted this location will be lost.',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true
    });
  }

  return (
    <Card className='shadow-sm mt-2 border-0'>
      <CardHeader className='bg-dark text-white d-flex justify-content-between'>
        <h4 className='mb-0'>Location - {id}</h4>
        <ButtonGroup className='mb-0'>
          <Button
            onClick={() => toggleEditMode(!editMode)}
            color='light'
            outline
            size='sm'
          >
            {editMode ? <Fa icon={faTimes} /> : <Fa icon={faPen} />}
          </Button>
          <Button onClick={deleteLocation} color='light' outline size='sm'>
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
            <UpdateLocation editMode={editMode} location={data.findLocation} />
            <Card className='border-0 mt-2'>
              <CardHeader className='bg-dark text-white'>
                <h6 className='text-center mb-0'>Vehicles</h6>
              </CardHeader>
              <Table
                headers={vehicleHeaders}
                data={data.findLocation.vehicles}
              />
            </Card>
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default Location;
