import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

interface PrivateRouteProps extends RouteProps {
  data?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  
  const RenderedComponent = () => {
    if (
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

export default PrivateRoute;
