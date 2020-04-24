import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './private_route';
import AdminRoute from './admin_route';
import Home from '../home';
import Auth from '../auth';
import Dashboard from '../dashboard';
import AdminDashboard from '../admin_dashboard';
import Navbar from './navbar';

type RouterProps = {
  children?: any;
};

const Router = ({ children }: RouterProps) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Auth />
        </Route>
        <PrivateRoute path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
        <AdminRoute path='/admin-dashboard'>
          <AdminDashboard />
        </AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
