import React from 'react';
import { Row, Col } from 'reactstrap';
import Vehicles from './vehicles';
import Users from './users';
import Locations from './locations';
import Settings from './settings';
import Prices, {Price} from './prices';
import Sidebar from './sidebar';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import Home from './home';
type AdminDashboardProps = {};

const AdminDashboard = function (props: AdminDashboardProps) {
  const { path, url } = useRouteMatch();
  return (
    <Row className='m-0'>
      <Sidebar url={url} />
      <Col className='main-content' lg='10' md='12'>
        <Switch>
          <Route exact path={`${path}/`}>
            <Redirect to={`${path}/home`}></Redirect>
          </Route>
          <Route exact path={`${path}/home`}>
            <Home />
          </Route>
          <Route exact path={`${path}/vehicles`}>
            <Vehicles />
          </Route>
          <Route exact path={`${path}/locations`}>
            <Locations />
          </Route>
          <Route exact path={`${path}/prices`}>
            <Prices />
          </Route>
          <Route exact path={`${path}/prices/:id`}>
            <Price />
          </Route>
          <Route exact path={`${path}/users`}>
            <Users />
          </Route>
          <Route exact path={`${path}/settings`}>
            <Settings />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
