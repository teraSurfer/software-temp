import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { ALL_LOCATIONS } from '../../../queries';
import Table from '../../util/table';
type UserProps = {};

const Locations = (props: UserProps) => {
  const { data, loading } = useQuery(ALL_LOCATIONS, {
    variables: {
      take: 10,
      skip: 0,
    },
  });

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
              <Button outline color='dark'>
                <span className='mr-1 '>New</span>
                <Fa icon={faPlus} />
              </Button>
            </ButtonGroup>
          </div>
        </ButtonToolbar>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary' />
          </div>
        ) : (
          <Table data={datax} headers={headers} />
        )}
      </CardBody>
    </Card>
  );
};

export default Locations;
