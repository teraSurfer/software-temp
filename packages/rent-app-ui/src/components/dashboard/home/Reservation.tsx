import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { FIND_RESERVATION, CANCEL_RESERVATION } from '../../../queries';
import moment from 'moment';
import swal from 'sweetalert';

type ReservationProps = {};

const Reservation = (props: ReservationProps) => {
  const { id } = useParams();

  const { data, loading } = useQuery(FIND_RESERVATION, { variables: { id } });
  const [cancelReservation] = useMutation(CANCEL_RESERVATION);

  async function handleClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (data && data.findReservation) {
      const timeToCancel = moment(data.findReservation.reservationStart).diff(
        moment(),
        's',
      );
      let confDelete: boolean;
      if (timeToCancel < 3600) {
        confDelete = await swal({
          dangerMode: true,
          icon: 'warning',
          buttons: ["Don't cancel", 'Cancel'],
          title: 'Are you sure?',
          text: 'You may be charged a fine.',
        });
      } else {
        confDelete = await swal({
          dangerMode: true,
          icon: 'warning',
          buttons: ["Don't cancel", 'Cancel'],
          title: 'Are you sure?',
        });
      }
      if (confDelete !== true) return;
    }

    try {
      console.log(id);
      const can = await cancelReservation({ variables: { reservationId: id } });
      if (can.data && can.data.cancelReservation) {
        swal({
          icon: 'success',
          title: 'Reservation has been cancelled.',
        });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      swal({ icon: 'error', text: err.message });
    }
  }

  return (
    <Card className='mt-2 shadow-sm border-0'>
      <CardHeader className='bg-dark text-white'>
        <h5 className='mb-0 text-center'>Reservation</h5>
      </CardHeader>
      <CardBody>
        {loading && !data ? (
          <div className='text-center'>
            <Spinner color='primary' />
          </div>
        ) : (
          <Form>
            <FormGroup row>
              <Label sm={3}>ID:</Label>
              <Col sm={9}>
                <Input disabled defaultValue={data.findReservation.id} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Status:</Label>
              <Col sm={9}>
                <Input disabled defaultValue={data.findReservation.status} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Start:</Label>
              <Col sm={9}>
                <Input
                  disabled
                  defaultValue={moment(
                    data.findReservation.reservationStart,
                  ).toLocaleString()}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>ID:</Label>
              <Col sm={9}>
                <Input
                  disabled
                  defaultValue={moment(
                    data.findReservation.reservationEnd,
                  ).toLocaleString()}
                />
              </Col>
            </FormGroup>
            {data.findReservation.status === 'cancelled' ? null : (
              <div className='text-center'>
                <Button color='accent' onClick={handleClick}>
                  Cancel Reservation?
                </Button>
              </div>
            )}
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default Reservation;
