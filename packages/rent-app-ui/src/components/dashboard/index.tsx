import React from 'react';
import { Row, Col } from 'reactstrap';
import Sidebar from './sidebar';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import CreateReservation from './home/CreateReservation';
import Profile from './profile';
import Reservation from './home/Reservation';

type dashboardProps = {};

const Dashboard = (props: dashboardProps) => {
  const { path, url } = useRouteMatch();

  return (
    <Row className='m-0'>
      <Sidebar url={url} />
      <Col className='main-content' lg='10' md='12'>
        <Switch>
          <Route exact path={`${path}/`}>
            <Redirect to={`${path}/home`} />
          </Route>
          <Route exact path={`${path}/home`}>
            <Home />
          </Route>
          <Route
            exact
            path={`${path}/home/book/:startTime/:endTime/:vehicleId`}
          >
            <CreateReservation />
          </Route>

          <Route exact path={`${path}/home/reservations/:id`}>
            <Reservation />
          </Route>
          <Route exact path={`${path}/profile`}>
            <Profile />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
};

export default Dashboard;
