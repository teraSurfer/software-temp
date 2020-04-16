import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

interface AdminRouteProps extends RouteProps {
  data?: any;
}

const AdminRoute = (props: AdminRouteProps) => {
  
  const RenderedComponent = () => {
    if (
      window.localStorage.getItem('ADMIN') === 'true' &&
      window.localStorage.getItem('LOGGED_IN') === 'true'
    ) {
      return <Route {...props}>{props.children}</Route>;
    } else {
      return (
        <Route
          {...props}
          render={({ location }) => (
            <Redirect to={{ pathname: '/', state: { from: location } }} />
          )}
        />
      );
    }
  };
  return <RenderedComponent />;
};

export default AdminRoute;
