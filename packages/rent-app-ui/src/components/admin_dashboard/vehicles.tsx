import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

type VehicleProps = {}

const Vehicles = (props: VehicleProps) => {
    return (
        <Card className='border-0 shadow-sm mt-2 h-100'>
            <CardHeader>
                <h5 className='mb-0'>
                    Vehicles
                </h5>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
    )
}

export default Vehicles;