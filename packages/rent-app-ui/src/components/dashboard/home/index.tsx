import React from 'react';
import { Row, Col, Card, CardHeader, Container, CardBody } from 'reactstrap';
import Reservations from './Reservations';
import Payments from './Payments';
import FindVehicles from './FindVehicles';

type HomeProps = {};

const Home = (props: HomeProps) => {

  

  return (
    <Container fluid>
      <Row>
        <Col sm={12} lg={8}>
          <Card className='shadow-sm border-0 mt-2'>
            <CardHeader className='bg-dark border-0 text-light'>
              <h5 className='mb-0 text-center'>Home</h5>
            </CardHeader>
            <CardBody>
              <FindVehicles />
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} lg={4}>
          <Reservations />
          <Payments />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
