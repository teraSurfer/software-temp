import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Container,
  Nav,
  Collapse,
  NavItem,
} from 'reactstrap';
import Link from 'next/link';
import {useRouter} from 'next/router';

/*
 * File Created: Tuesday, 10th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


interface IAppNavbar {}

export const AppNavbar = (props: IAppNavbar) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color={router.pathname == '/' ? 'primary' : 'dark'} style={{zIndex: 99}} expand='md' dark>
      <Container>
          <NavbarBrand href="/">
            <h5 className='mb-0'>Rent App</h5>
          </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link href='/'>
                <a className={router.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/login'>
                <a className={router.pathname === '/login' ? 'nav-link active' : 'nav-link'}>Login</a>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
