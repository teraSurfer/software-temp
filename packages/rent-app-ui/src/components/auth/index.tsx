import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Login from './login';
import Register from './register';

type AuthProps = {};

const Auth = (props: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);

  function toggleType() {
    setIsLogin(!isLogin);
  }

  return (
    <Container className='h-100 d-flex justify-content-center align-items-center'>
      {isLogin ? (
        <Login
          toggleType={toggleType}
        />
      ) : (
        <Register toggleType={toggleType} />
      )}
    </Container>
  );
};

export default Auth;
