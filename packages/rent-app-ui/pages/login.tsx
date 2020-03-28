import React, { useState } from 'react';
import { Card, CardHeader, Container, CardBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import AppLayout from '../components/layouts/AppLayout';
import '../assets/scss/login.scss';
import AppLogin from '../components/login/AppLogin';
import AppRegister from '../components/login/AppRegister';

/*
 * File Created: Thursday, 12th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

interface ILogin {}

const Login = function(props: ILogin) {

    const [isLogin, setIsLogin] = useState(true);

    function toggleType() {
        setIsLogin(!isLogin);
    }

    return (
        <AppLayout>
            <Container className="h-100 d-flex justify-content-center align-items-center">
                {isLogin? <AppLogin toggleType={toggleType} /> : <AppRegister toggleType={toggleType} />}
            </Container>
        </AppLayout>
    )
}

export default Login;
