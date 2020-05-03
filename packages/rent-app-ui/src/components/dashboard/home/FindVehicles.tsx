import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import {
  FIND_AVAILABLE_VEHICLES,
  VEHICLE_TYPES,
  ALL_LOCATIONS,
} from '../../../queries';
import DateTime from 'react-datetime';
import moment, { Moment } from 'moment';
import Table from '../../util/table';
import swal from 'sweetalert';
import { useRouteMatch } from 'react-router-dom';

type FindVehicleProps = {};

const FindVehicle = (props: FindVehicleProps) => {
  const [searchContent, setSearchContent] = useState({
    vehicleType: '',
    startTime: '',
    endTime: '',
    locationName: '',
  });
  const { path } = useRouteMatch();
  const vehicleTypes = useQuery(VEHICLE_TYPES, { variables: { take: 15 } });
  const locations = useQuery(ALL_LOCATIONS, { variables: { take: 15 } });
  const [fetchAvailableVehicles, { loading, data }] = useLazyQuery(
    FIND_AVAILABLE_VEHICLES,
  );

  let datax: any[] = [];

  if (data && data.findAvailableVehicles) {
    datax = data.findAvailableVehicles.map((v: any) => {
      v.vehicleType = v.vehicleType.vehicleType;
      v.location = v.location.locationName;
      return v;
    });
  }

  function handleChange(e: any) {
    e.preventDefault();
    setSearchContent({
      ...searchContent,
      [e.target.id]: e.target.value,
    });
  }

  function handleDateChange(e: string | Moment, handle: string) {
    setSearchContent({
      ...searchContent,
      [handle]: moment(e).toISOString(),
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const st = moment(searchContent.startTime);
    const et = moment(searchContent.endTime);

    if (st.isAfter(et)) {
      swal({ icon: "error", title: "Sorry", text: "Start time cannot be after end time." });
      return;
    }

    if (et.diff(st, "h") > 8 || et.diff(st, "h") < 1) {
      swal({ icon: "error", title: "Sorry", text: 'We don\'t lend for more than 8 hours' })
      return;
    }

    try {
      await fetchAvailableVehicles({
        variables: {
          ...searchContent,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className='border-dark'>
      <CardHeader className='border-0'>
        <h6 className='mb-0 bg-light text-center'>Find Vehicles</h6>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label sm={2}>Start Time:</Label>
            <Col sm={10}>
              <DateTime
                onChange={(d) => handleDateChange(d, 'startTime')}
                inputProps={{ placeholder: 'Start Time', required: true }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>End Time:</Label>
            <Col sm={10}>
              <DateTime
                onChange={(d) => handleDateChange(d, 'endTime')}
                inputProps={{ placeholder: 'End Time', required: true }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Vehicle Type:</Label>
            <Col sm={10}>
              <Input id='vehicleType' onChange={handleChange} type='select'>
                <option value=''>---</option>
                {vehicleTypes.loading
                  ? null
                  : vehicleTypes.data.findAllVehicleTypes.map((v: any) => (
                      <option key={v.id} value={v.vehicleType}>
                        {v.vehicleType.toUpperCase()}
                      </option>
                    ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Location:</Label>
            <Col sm={10}>
              <Input id='location' onChange={handleChange} type='select'>
                <option value=''>---</option>
                {locations.loading
                  ? null
                  : locations.data.findAllLocations.map((l: any) => (
                      <option key={l.id} value={l.locationName}>
                        {l.locationName}
                      </option>
                    ))}
              </Input>
            </Col>
          </FormGroup>
          <div className='text-center'>
            <Button color='dark' type='submit'>
              {loading ? <Spinner color='white' size='sm' /> : 'Find Vehicles'}
            </Button>
          </div>
        </Form>
        {data && data.findAvailableVehicles ? (
          <div className='mt-2'>
            <Table headers={vehicleHeaders} data={datax} clickable path={`${path}/book/${encodeURI(searchContent.startTime)}/${encodeURI(searchContent.endTime)}`} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

const vehicleHeaders = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Make',
    accessor: 'make',
  },
  {
    Header: 'Model',
    accessor: 'model',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'Vehicle Type',
    accessor: 'vehicleType',
  },
];

export default FindVehicle;
