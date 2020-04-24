import React, { useState } from 'react';
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
import { faPlus, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { ALL_PRICES } from '../../../queries';
import Table from '../../util/table';
import CreatePrice from './createPrice';
import { useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import * as _ from 'lodash';
import Price from './Price';

/*
 * File Created: Thursday, 16th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

type UserProps = {};

const Prices = (props: UserProps) => {

  const [fetchVars, setFetchVars] = useState({
    take: 5,
    skip: 0
  });

  const { data, loading, refetch } = useQuery(ALL_PRICES, {
    variables: fetchVars,
  });

  const [isOpen, toggleCollapse] = useState(false);

  const { path } = useRouteMatch();

  let datax;
  const headers = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Cost $',
      accessor: 'cost',
    },
    {
      Header: 'Duration',
      accessor: 'duration',
    },
    {
      Header: 'Vehicle Type',
      accessor: 'vehicleType',
    },
  ];

  const fetchPrev = (e: any) => {
    e.preventDefault();
    if (_.isEqual(fetchVars, { skip: 0, take: 5 })) {
      swal({ icon: 'warning', text: 'Already on first page.' });
    } else {
      setFetchVars({ skip: fetchVars.skip - 5, take: fetchVars.take - 5 });
      refetch(fetchVars);
    }
  }

  const fetchNext = (e: any) => {
    e.preventDefault();
    if (data.findAllPrices.length === 0) {
      swal({ icon: 'warning', text: 'Already on last page.' });
    } else {
      setFetchVars({ skip: fetchVars.skip + 5, take: fetchVars.take + 5 });
      refetch(fetchVars);
    }
  }

  if (!loading) {
    datax = data.findAllPrices.map((p: any) => {
      if (p.vehicleType) {
        const vehicleType = p.vehicleType.vehicleType;
        return { ...p, vehicleType };
      } else {
        return { ...p, vehicleType: null };
      }
    });
  }

  return (
    <Card className='border-0 shadow-sm mt-2'>
      <CardHeader className='border-0 bg-dark text-white'>
        <h5 className='mb-0'>Prices</h5>
      </CardHeader>
      <CardBody>
        <ButtonToolbar className='d-flex justify-content-between bg-light rounded-lg p-1 mb-1'>
          <div className='left d-flex align-items-center'>
            <h5 className='mb-0'>View Prices</h5>
          </div>
          <div className='center'></div>
          <div className='right'>
            <ButtonGroup size='sm'>
              {isOpen ? (
                <Button onClick={() => toggleCollapse(!isOpen)} color='dark'>
                  <span className='mr-1 '>Close</span>
                  <Fa icon={faTimes} />
                </Button>
              ) : (
                <Button onClick={() => toggleCollapse(!isOpen)} color='dark'>
                  <span className='mr-1 '>New</span>
                  <Fa icon={faPlus} />
                </Button>
              )}
            </ButtonGroup>
          </div>
        </ButtonToolbar>
        <Collapse isOpen={isOpen}>
          <CreatePrice />
        </Collapse>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary' />
          </div>
        ) : (
          <Table data={datax} headers={headers} clickable path={path} />
        )}
        <ButtonToolbar className='d-flex mt-2 justify-content-center'>
          <ButtonGroup>
            <Button outline onClick={fetchPrev} color='dark' size='sm'><Fa icon={faChevronLeft} /></Button>
            <Button outline onClick={fetchNext} color='dark' size='sm'><Fa icon={faChevronRight} /></Button>
          </ButtonGroup>
        </ButtonToolbar>
      </CardBody>
    </Card>
  );
};

export default Prices;
export { Price };
