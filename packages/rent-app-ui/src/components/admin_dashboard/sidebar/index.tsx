import React from 'react';
import { Col, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faCarAlt,
  faUser,
  faDollarSign,
  faMapMarked,
  faCog,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { NavLink as RRNavLink } from 'react-router-dom';

type SidebarProps = {
  url: any;
};

type navItemState = {
  icon: any;
  text: 'Home' | 'Vehicles' | 'Locations' | 'Prices' | 'Users' | 'Settings';
  state: 'home' | 'vehicles' | 'locations' | 'prices' | 'users' | 'settings';
};

const Sidebar = ({ url }: SidebarProps) => {
  const navItems: navItemState[] = [
    { icon: faHome, text: 'Home', state: 'home' },
    { icon: faCarAlt, text: 'Vehicles', state: 'vehicles' },
    { icon: faMapMarked, text: 'Locations', state: 'locations' },
    { icon: faDollarSign, text: 'Prices', state: 'prices' },
    { icon: faUser, text: 'Users', state: 'users' },
    { icon: faCog, text: 'Settings', state: 'settings' },
  ];

  const navs = navItems.map((nav, index) => {
    return (
      <NavItem className={styles.navItem} key={index}>
        <NavLink tag={RRNavLink} activeClassName='active' to={`${url}/${nav.state}`}>
          <Fa icon={nav.icon} className={styles.fw} />
          <span className='d-none d-lg-inline'>{nav.text}</span>
        </NavLink>
      </NavItem>
    );
  });

  return (
    <Col lg='2' md='12' className={styles.sidebar}>
      <div className='d-none d-lg-block rounded-lg shadow-sm bg-white'>
        <h5 className='mt-3 text-center'>Admin Dashboard</h5>
        <hr />
        <Nav vertical pills color='dark'>
          {navs}
        </Nav>
      </div>
      <div className='d-xs-block d-lg-none text-center bg-white'>
        <h5 className='mt-2 text-center'>Admin Dashboard</h5>
        <hr className='my-1' />
        <Nav pills className='justify-content-center'>
          {navs}
        </Nav>
      </div>
    </Col>
  );
};

export default Sidebar;
