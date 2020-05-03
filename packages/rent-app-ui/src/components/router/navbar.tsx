import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Container,
  Nav,
  NavLink,
  Collapse,
  NavItem,
  Button,
} from 'reactstrap';

import { NavLink as RRNavLink, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../queries';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

/*
 * File Created: Tuesday, 10th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

type IAppNavbar = {};

const DefaultNavs = () => {
  return (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/' activeClassName='active'>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/login' activeClassName='active'>
          Login
        </NavLink>
      </NavItem>
    </Nav>
  );
};

const UserNavs = ({ handleLogout, loading }: any) => {
  return (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/' activeClassName='active'>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/dashboard' activeClassName='active'>
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem className='d-flex align-items-center'>
        <Button disabled={loading} className='rounded-pill' outline size='sm' onClick={handleLogout} color='light'>
          {loading ? <Fa icon={faCircleNotch} spin /> : 'Logout'}
        </Button>
      </NavItem>
    </Nav>
  );
};

const AdminNavs = ({ handleLogout, loading }: any) => {
  return (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <NavLink tag={RRNavLink} exact to='/' activeClassName='active'>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RRNavLink}
          exact
          to='/admin-dashboard'
          activeClassName='active'
        >
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem className='d-flex align-items-center'>
        <Button disabled={loading} className='rounded-pill' outline size='sm' onClick={handleLogout} color='light'>
          {loading ? <Fa icon={faCircleNotch} spin /> : 'Logout'}
        </Button>
      </NavItem>
    </Nav>
  );
};

export default (props: IAppNavbar) => {
  const [isOpen, setIsOpen] = useState(false);

  const [logout, { loading }] = useMutation(LOGOUT);

  const isAdmin = window.localStorage.getItem('ADMIN') === 'true';
  const isLoggedIn = window.localStorage.getItem('LOGGED_IN') === 'true';

  const location = useLocation();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (evt: any) => {
    evt.preventDefault();
    try {
      const response = await logout();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    window.localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Navbar
      color={location.pathname === '/' ? 'primary' : 'dark'}
      style={{ zIndex: 99 }}
      expand='md'
      dark
    >
      <Container>
        <NavbarBrand href='/'>
          <h5 className='mb-0'>Rent App</h5>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {
            (isLoggedIn && isAdmin) ? <AdminNavs handleLogout={handleLogout} loading={loading} />
              : (isLoggedIn && !isAdmin) ? <UserNavs handleLogout={handleLogout} loading={loading} />
                : <DefaultNavs />
          }
        </Collapse>
      </Container>
    </Navbar>
  );
};
