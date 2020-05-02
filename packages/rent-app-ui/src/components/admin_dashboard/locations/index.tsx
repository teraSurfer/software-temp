import React, { useState, Fragment } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Spinner,
  Collapse,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { ALL_LOCATIONS } from '../../../queries';
import Table from '../../util/table';
import Location from './Location';
import { useRouteMatch } from 'react-router-dom';
import CreateLocation from './CreateLocation';
import Paginate from '../util/Paginate';

type UserProps = {};

const Locations = (props: UserProps) => {
  const [page, setPage] = useState({
    take: 5,
    skip: 0,
  });

  const { data, loading, refetch } = useQuery(ALL_LOCATIONS, {
    variables: {
      ...page,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const { path } = useRouteMatch();

  let datax;
  const headers = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Location Name',
      accessor: 'locationName',
    },
    {
      Header: 'Address Line 1',
      accessor: 'addressFirstLine',
    },
    {
      Header: 'Address Line 2',
      accessor: 'addressSecondLine',
    },
    {
      Header: 'Address Line 3',
      accessor: 'addressThirdLine',
    },
    {
      Header: 'Address Zip Code',
      accessor: 'addressZipCode',
    },
    {
      Header: 'Capacity',
      accessor: 'vehicleCapacity',
    },
  ];

  if (!loading) {
    datax = data.findAllLocations;
  }

  return (
    <Card className='border-0 shadow-sm mt-2'>
      <CardHeader className='border-0 bg-dark text-white'>
        <h5 className='mb-0'>Locations</h5>
      </CardHeader>
      <CardBody>
        <ButtonToolbar className='d-flex justify-content-between bg-light rounded-lg p-1 mb-1'>
          <div className='left d-flex align-items-center'>
            <h5 className='mb-0'>View Locations</h5>
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
        <Collapse isOpen={isOpen}>
          <CreateLocation />
        </Collapse>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary' />
          </div>
        ) : (
          <Fragment>
            <Table data={datax} headers={headers} clickable path={path} />
            <Paginate
              data={datax}
              page={page}
              setPage={setPage}
              refetch={refetch}
            />
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default Locations;

export { Location };
