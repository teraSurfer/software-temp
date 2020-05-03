import React, { Fragment, useState } from 'react';
import { Card, CardHeader, CardBody, Spinner } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { FIND_PAYMENTS_USER } from '../../../queries';
import Table from '../../util/table';
import Paginate from '../../admin_dashboard/util/Paginate';

type PaymentProps = {};

const Payments = (props: PaymentProps) => {
  const { data, loading, refetch } = useQuery(FIND_PAYMENTS_USER);
  const [page, setPage] = useState({
    take: 5,
    skip: 0
  });
  let datax: any[] = [];

  if (!loading) {
    console.log(data);
    datax = [...data.getPaymentsForUser];
  }

  return (
    <Card className='shadow-sm border-0 mt-2'>
      <CardHeader className='bg-dark border-0 text-light'>
        <h5 className='mb-0 text-center'>Payments</h5>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className='text-center'>
            <Spinner color='primary' />
          </div>
        ) : (
          <Fragment>
            <Table data={datax} headers={paymentHeaders} />
            <Paginate data={datax} page={page} setPage={setPage} refetch={refetch} />
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

const paymentHeaders = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Total Cost', accessor: 'totalCost' },
  { Header: 'Payment Date', accessor: 'paymentDate' },
];

export default Payments;
