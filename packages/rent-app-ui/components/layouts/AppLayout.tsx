import React, { Fragment } from 'react';
import {AppNavbar} from '../common/AppNavbar';
import '../../assets/scss/app.scss';

/*
 * File Created: Tuesday, 10th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


interface LayoutProps {
    children: any;
}

const AppLayout = function(props: LayoutProps) {
    return (
        <Fragment>
            <AppNavbar />
            <main className="hw">
                {props.children}
            </main>
        </Fragment>
    );
}

export default AppLayout;
