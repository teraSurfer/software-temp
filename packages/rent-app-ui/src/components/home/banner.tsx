import React, { Fragment } from 'react';
import styles from './banner.module.scss';
import { Button, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Car } from '../../assets/icons/svg/003-car-rental.svg';
import { ReactComponent as Rent } from '../../assets/icons/svg/001-for-rent.svg';
import { ReactComponent as Support } from '../../assets/icons/svg/004-gamer.svg';

/*
 * File Created: Friday, 20th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


type IBannerProps = {};

const Banner = function(props: IBannerProps) {
  return (
    <Fragment>
      <section className={styles.banner}>
        <header className={styles['viewport-header']}>
          <div className={styles['image-wrap']}></div>
          <div className={styles['banner-overlay']}></div>
          <div className={styles['banner-content'] + ' text-light'}>
            <div className='text-center'>
            <h2 className={styles['banner-title']}>Rent Cars Online</h2>
              <h3 className='mt-2'>We have flexible travel solutions.</h3>
              <Button color='light'>
                <strong>Let's Go </strong>
                <Fa icon={faChevronCircleRight} />
              </Button>
            </div>
          </div>
        </header>
      </section>
    <section className='mt-2'>
        <Container>
          <Card className='mb-4 border-0 shadow-sm'>
            <CardBody>
              <Row>
                <Col sm='12' md='6' className='text-center'>
                  <h3 className='text-primary'>Wide Variety</h3>
                  <h5>
                    With different types of cars in many locations we've
                    got you covered.
                  </h5>
                </Col>
                <Col sm='12' md='6' className='text-center'>
                  <Car style={{ height: '150px', width: '150px' }} />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className='mb-4 border-0 shadow-sm'>
            <CardBody>
              <Row>
                <Col sm='12' md='6' className='text-center'>
                  <Rent style={{ height: '150px', width: '150px' }} />
                </Col>
                <Col sm='12' md='6' className='text-center'>
                  <h3 className='text-primary'>Simple Process</h3>
                  <h5>
                    We like to keep things easy, just sign-up and choose your
                    ride.
                  </h5>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className='mb-4 border-0 shadow-sm'>
            <CardBody>
              <Row>
                <Col sm='12' md='6' className='text-center'>
                  <h3 className='text-primary'>Unmatched Support</h3>
                  <h5>24x7 Unparalled Online support.</h5>
                </Col>
                <Col sm='12' md='6' className='text-center'>
                  <Support style={{ height: '150px', width: '150px' }} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </section>
    </Fragment>
  );
};

export default Banner;
