import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  ButtonToolbar,
  ButtonGroup,
  Button,
  // Spinner,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { useQuery } from '@apollo/react-hooks';
// import { ALL_USERS } from '../../queries';
type UserProps = {};

const Users = (props: UserProps) => {
  // const { data, loading } = useQuery(ALL_USERS);

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
              <Button outline color='dark'>
                <span className='mr-1 '>New</span>
                <Fa icon={faPlus} />
              </Button>
            </ButtonGroup>
          </div>
        </ButtonToolbar>
      </CardBody>
    </Card>
  );
};

export default Users;
