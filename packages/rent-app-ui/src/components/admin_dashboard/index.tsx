import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Vehicles from './vehicles';
import Users from './users';
import Locations from './locations';
import Settings from './settings';
import Prices from './prices';
import Sidebar from './sidebar';

type AdminDashboardProps = {}

type AdminDashboardState = 'vehicles' | 'locations' | 'prices' | 'users' | 'settings';

const AdminDashboard = function (props: AdminDashboardProps) {

    const [state, handleStateChange] = useState<AdminDashboardState>('vehicles');

    const components = {
        vehicles: <Vehicles />,
        locations: <Locations />,
        prices: <Prices />,
        users: <Users />,
        settings: <Settings />
    };

    return (
        <Row className="m-0">
            <Sidebar stateChange={handleStateChange} />
            <Col lg="10" md="12">
                {
                    components[state]
                }
            </Col>
        </Row>
    );
}

export default AdminDashboard;