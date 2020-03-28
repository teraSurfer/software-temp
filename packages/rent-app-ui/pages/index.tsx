import React from 'react';
import AppLayout from '../components/layouts/AppLayout';
import Rent from  '../assets/icons/svg/001-for-rent.svg';
import Banner from '../components/home/Banner';

/*
 * File Created: Tuesday, 10th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

interface IApp {}

const App = (props: IApp) => {
    return(
        <AppLayout>
            <Banner />
        </AppLayout>
    );
}

export default App;