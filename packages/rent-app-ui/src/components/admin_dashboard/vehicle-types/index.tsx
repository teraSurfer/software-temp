import React, { useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VEHICLE_TYPES } from '../../../queries';
import {
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  ButtonToolbar,
  Button,
  Collapse,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import Table from '../../util/table';
import { useRouteMatch } from 'react-router-dom';
import CreateVehicleType from './CreateVT';
import Paginate from '../util/Paginate';
import VehicleType from './VehicleType';

type VehicleTypesProps = {};

const VehicleTypes = (props: VehicleTypesProps) => {
  const [page, setPage] = useState({
    skip: 0,
    take: 5,
  });

  const [isOpen, toggle] = useState(false);
  const { path } = useRouteMatch();

  const { data, loading, refetch } = useQuery(GET_VEHICLE_TYPES, {
    variables: {
      ...page,
    },
  });

  let vt = [];

  if (!loading) {
    vt = data.findAllVehicleTypes;
  }

  

  return (
    <Card className='shadow-sm border-0 mt-2'>
      <CardHeader className='border-0 bg-dark text-white'>
        <h5 className='mb-0'>Vehicle Types</h5>
      </CardHeader>
      <CardBody>
        <ButtonToolbar className='d-flex justify-content-between bg-light rounded-lg p-1 mb-1'>
          <div className='left d-flex align-items-center'>
            <h5 className='mb-0'>View Vehicle Types</h5>
          </div>
          <div className='center'></div>
          <div className='right'>
            <ButtonGroup size='sm'>
              <Button onClick={() => toggle(!isOpen)} color='dark'>
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
        <Collapse isOpen={isOpen}>
          <CreateVehicleType />
        </Collapse>
        <Table headers={vehicleTypeHeaders} data={vt} clickable path={path} />
        <Paginate data={vt} page={page} refetch={refetch} setPage={setPage} />
      </CardBody>
    </Card>
  );
};

const vehicleTypeHeaders = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Vehicle Type',
    accessor: 'vehicleType',
  },
  {
    Header: 'Vehicle Type Description',
    accessor: 'vehicleTypeDescription',
  },
];

export default VehicleTypes;
export { VehicleType };
