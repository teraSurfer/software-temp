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
import { ALL_USERS } from '../../../queries';
import Table from '../../util/table';
import CreateUser from './CreateUser';
import Paginate from '../util/Paginate';

type UserProps = {};

const Users = (props: UserProps) => {
  const [page, setPage] = useState({
    skip: 0,
    take: 5,
  });
  const { data, loading, refetch } = useQuery(ALL_USERS, { variables: page });

  const [isOpen, setIsOpen] = useState(false);
  let datax;
  const headers = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Role',
      accessor: 'roleName',
    },
  ];

  if (!loading) {
    datax = data.findAllUsers.map((user: any) => {
      const roleName = user.roles[0].roleName.toLocaleUpperCase();
      return { ...user, roleName };
    });
  }

  return (
    <Card className='border-0 shadow-sm mt-2'>
      <CardHeader className='border-0 bg-dark text-white'>
        <h5 className='mb-0'>Users</h5>
      </CardHeader>
      <CardBody>
        <ButtonToolbar className='d-flex justify-content-between bg-light rounded-lg p-1 mb-1'>
          <div className='left d-flex align-items-center'>
            <h5 className='mb-0'>View users</h5>
          </div>
          <div className='center'></div>
          <div className='right'>
            <ButtonGroup size='sm'>
              <Button onClick={() => setIsOpen(!isOpen)} color='dark'>
                {isOpen ? (
                  <Fragment>
                    <span className='mr-1 '>Close</span>
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
          <CreateUser />
        </Collapse>
        {loading ? (
          <div className='text-center'>
            <Spinner type='grow' color='primary' />
          </div>
        ) : (
          <Fragment>
              <Table data={datax} headers={headers} />
              <Paginate data={datax} page={page} setPage={setPage} refetch={refetch} />
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default Users;
