import { Server } from './server';
import 'module-alias/register';
/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


async function main() {
    const server = new Server();
    await server.loadSettings();
    server.start();
}

main();