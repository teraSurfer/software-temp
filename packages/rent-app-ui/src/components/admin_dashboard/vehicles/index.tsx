import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

type VehicleProps = {};

const Vehicles = (props: VehicleProps) => {
  return (
    <Card className='border-0 shadow-sm mt-2'>
      <CardHeader className='border-0 bg-dark text-white'>
        <h5 className='mb-0'>Vehicles</h5>
      </CardHeader>
      <CardBody>
        <ButtonToolbar className='d-flex justify-content-between bg-light rounded-lg p-1'>
          <div className='left'>
            <ButtonGroup size='sm'>
              <Button color='dark' outline>
                <Fa icon={faMinus} />
              </Button>
            </ButtonGroup>
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

export default Vehicles;
