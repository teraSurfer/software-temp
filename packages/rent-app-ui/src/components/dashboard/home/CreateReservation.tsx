import React, { Fragment, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Spinner,
  Button,
} from 'reactstrap';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  FIND_PRICE,
  FETCH_VEHICLE,
  CREATE_RESERVATION,
} from '../../../queries';
import swal from 'sweetalert';

type CreateReservationProps = {};

const rentalHours = ['1 hour', '5 hours', '8 hours'];
const seconds = [3600, 18000, 28800];

const CreateReservation = (props: CreateReservationProps) => {
  const { vehicleId, startTime, endTime } = useParams();
  const [price, setPrice] = useState({
    cost: '',
    duration: ''
  });
  const vehicle = useQuery(FETCH_VEHICLE, {
    variables: {
      id: vehicleId,
    },
  });
  const [fetchPrice, { loading, data, error, called }] = useLazyQuery(FIND_PRICE, {
    onCompleted: (datax: any) => setPrice({ cost: datax.findPriceForVehicleType.cost, duration: datax.findPriceForVehicleType.duration })
  });
  
  useEffect(() => {
    const vt = window.sessionStorage.getItem('vehicleType');
    const d = window.sessionStorage.getItem('duration');
    async function fetchData(vtx: string, dx: string) {
        try {
          fetchPrice({
            variables: {
              vehicleType: vtx,
              duration: dx
            }
          });
        } catch (err) {
          console.log(err);
        }
    }

    if (vt && vt !== '' && d && d !== '' && !called) {
      fetchData(vt, d);
    }
  })

  const [createReservation] = useMutation(
    CREATE_RESERVATION,
  );

  if (
    vehicleId === '' ||
    !vehicleId ||
    startTime === '' ||
    !startTime ||
    endTime === '' ||
    !endTime
  ) {
    return <Redirect to='/dashboard' />;
  } else if (vehicle.data && vehicle.data.findVehicle) {
    const st = moment(decodeURI(startTime));
    const et = moment(decodeURI(endTime));
    const timeInSeconds = et.diff(st, 's');
    const v = seconds.findIndex((s) => timeInSeconds <= s);

    window.sessionStorage.setItem('duration', rentalHours[v]);
  }

  if (vehicle.data && vehicle.data.findVehicle) {
    if (
      window.sessionStorage.getItem('vehicleType') !==
        vehicle.data.findVehicle.vehicleType.vehicleType ||
      !window.sessionStorage.getItem('vehicleType')
    ) {
      window.sessionStorage.setItem(
        'vehicleType',
        vehicle.data.findVehicle.vehicleType.vehicleType,
      );
    }
  }

  if (error) {
    // do nothing.
    console.log(error);
  }

  if (data && data.findPriceForVehicleType) {
    console.log(data);
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    const input = {
      vehicleId,
      reservationStart: moment(startTime).toISOString(),
      reservationEnd: moment(endTime).toISOString(),
      priceId: Number(data.findPriceForVehicleType.id)
    }

    try {
      const createdReservation = await createReservation({
        variables: {
          data: {
            ...input
          }
        }
      });

      if (createdReservation.data && createdReservation.data.createReservation) {
        swal({ icon: 'success', text: 'Created Reservation' });
        return <Redirect to="/dashboard" />
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message });
    }
  }

  return (
    <Card className='border-0 shadow-sm mt-2'>
      <CardHeader className='border-0 text-light bg-dark'>
        <h6 className='mb-0'>Reservation</h6>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm={3}>
            <p>Vehicle ID: </p>
          </Col>
          <Col sm={9}>
            <p>{vehicleId}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <p>Reservation Start: </p>
          </Col>
          <Col sm={9}>
            <p>{moment(startTime).toLocaleString()}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <p>Reservation End: </p>
          </Col>
          <Col sm={9}>
            <p>{moment(endTime).toLocaleString()}</p>
          </Col>
        </Row>
        {loading && !data ? (
          <div className='text-center'>
            <Spinner color='primary' />
          </div>
        ) : (
          <Fragment>
            <Row>
              <Col sm={3}>
                <p>Cost: </p>
              </Col>
              <Col sm={9}>
                <p>{`$${price.cost}`}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <p>Duration: </p>
              </Col>
              <Col sm={9}>
                <p>
                  {`${price.duration}`} -{' '}
                  <span>
                    <span className='text-danger'>*</span>Rounded to nearest
                    time frame
                  </span>
                </p>
              </Col>
            </Row>
            <div className='text-center'>
              <Button color='dark' onClick={handleSubmit} type='button'>
                Create
              </Button>
            </div>
          </Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default CreateReservation;
