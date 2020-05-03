import React, { useState, Fragment } from 'react';
import { Card, CardHeader, CardBody, Spinner } from 'reactstrap';
import { FIND_RESERVATIONS_USER } from '../../../queries';
import { useQuery } from '@apollo/react-hooks';
import Paginate from '../../admin_dashboard/util/Paginate';
import Table from '../../util/table';
import moment from 'moment';
import { useRouteMatch } from 'react-router-dom';

type ReservationProps = {};

const ReservationTable = (props: any) => {
  console.log(props.datax);
  if (props.datax.length === 0) return <p>You have no reservations yet.</p>;
  return (
    <Fragment>
      <Table data={props.datax} headers={reservationHeaders} clickable path={`${props.path}/reservations`} />
      <Paginate data={props.datax} page={props.page} setPage={props.setPage} refetch={props.refetch} />
    </Fragment>
  );
};

const Reservations = (props: ReservationProps) => {
  const { data, loading, refetch } = useQuery(FIND_RESERVATIONS_USER);
  const [page, setPage] = useState({
    take: 5,
    skip: 0,
  });
  let datax: any[] = [];
  const { path } = useRouteMatch();
  if (!loading) {
    console.log(data);
    datax = data.getReservationsForUser.map((r: any) => {
      r.reservationStart = moment(r.reservationStart).toLocaleString();
      r.reservationEnd = moment(r.reservationEnd).toLocaleString();
      return r;
    });
  }

  return (
    <Card className='shadow-sm border-0 mt-2'>
      <CardHeader className='bg-dark border-0 text-light'>
        <h5 className='mb-0 text-center'>Reservations</h5>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className='text-center'>
            <Spinner color='primary' />
          </div>
        ) : <ReservationTable datax={datax} page={page} setPage={setPage} refetch={refetch} path={path} />
        }
      </CardBody>
    </Card>
  );
};

const reservationHeaders = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Reservation Start',
    accessor: 'reservationStart',
  },
  {
    Header: 'Reservation End',
    accessor: 'reservationEnd',
  }
];

export default Reservations;
