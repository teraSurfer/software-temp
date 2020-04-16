import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faCarAlt,
  faUser,
  faDollarSign,
  faMapMarked,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import styles from './admin.module.scss';

type SidebarProps = {
  stateChange: any;
};

type navItemState = {
  icon: any;
  active: boolean;
  text: 'Vehicles' | 'Locations' | 'Prices' | 'Users' | 'Settings';
  state: 'vehicles' | 'locations' | 'prices' | 'users' | 'settings';
};

const Sidebar = ({ stateChange }: SidebarProps) => {
  const [navItems, setNavItems] = useState<navItemState[]>([
    { icon: faCarAlt, active: true, text: 'Vehicles', state: 'vehicles' },
    { icon: faMapMarked, active: false, text: 'Locations', state: 'locations' },
    { icon: faDollarSign, active: false, text: 'Prices', state: 'prices' },
    { icon: faUser, active: false, text: 'Users', state: 'users' },
    { icon: faCog, active: false, text: 'Settings', state: 'settings' },
  ]);

  const handleClick = (evt: any, nextActive: number) => {
    evt.preventDefault();
    const currActive = navItems.findIndex((n) => n.active === true);
    const stateCopy = [...navItems];
    stateCopy[currActive].active = false;
    stateCopy[nextActive].active = true;
    setNavItems(stateCopy);
    stateChange(stateCopy[nextActive].state);
  };

  const navs = navItems.map((nav, index) => {
    return (
      <NavItem className={styles.navItem} key={index}>
        <NavLink active={nav.active} onClick={(e) => handleClick(e, index)}>
          <Fa icon={nav.icon} className={styles.fw} />
          <span className='d-none d-lg-inline'>{nav.text}</span>
        </NavLink>
      </NavItem>
    );
  });

  return (
    <Col lg='2' md='12' className={'border ' +styles.sidebar}>
      <div className='d-none d-lg-block rounded-lg  bg-white'>
        <h5 className='mt-3 text-center'>Admin Dashboard</h5>
        <hr />
        <Nav vertical pills>
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
