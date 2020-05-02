import React, { useState, Fragment } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Collapse,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Table from '../../util/table';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_VEHICLES } from '../../../queries';
import CreateVehicle from './CreateVehicle';
import Vehicle from './Vehicle';
import Paginate from '../util/Paginate';

type VehicleProps = {};

const Vehicles = (props: VehicleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState({
    skip: 0,
    take: 5,
  });
  const { data, loading, refetch } = useQuery(GET_VEHICLES, {
    variables: {
      skip: page.skip,
      take: page.take,
    },
  });
  const { path } = useRouteMatch();

  let datax = [];

  if (!loading) {
    console.log(data);
    datax = data.findAllVehicles;
  }

  return (
    <Card className='border-0 shadow-sm mt-2'>
      <CardHeader className='border-0 bg-dark text-white'>
        <h5 className='mb-0'>Vehicles</h5>
      </CardHeader>
      <CardBody>
        <ButtonToolbar className='d-flex justify-content-between bg-light rounded-lg p-1 mb-1'>
          <div className='left d-flex align-items-center'>
            <h5 className='mb-0'>View Vehicles</h5>
          </div>
          <div className='center'></div>
          <div className='right'>
            <ButtonGroup size='sm'>
              <Button onClick={() => setIsOpen(!isOpen)} color='dark'>
                {isOpen ? (
                  <Fragment>
                    <span className='mr-1'>Close</span>
                    <Fa icon={faTimes} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <span className='mr-1 '>New</span>
                    <Fa icon={faPlus} />
                  </Fragment>
                )}
              </Button>
            </ButtonGroup>
          </div>
        </ButtonToolbar>
        <Collapse className='my-2' isOpen={isOpen}>
          <CreateVehicle />
        </Collapse>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary' />
          </div>
        ) : (
          <Table clickable path={path} headers={VehicleHeaders} data={datax} />
        )}
        <Paginate data={datax} page={page} setPage={setPage} refetch={refetch} />
      </CardBody>
    </Card>
  );
};

const VehicleHeaders = [
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

export default Vehicles;
export { Vehicle };
