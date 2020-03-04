import {config} from 'dotenv';
import * as path from 'path';

config({
    path: path.join(__dirname, `../../environment/${process.env.NODE_ENV}.env`)
});

export const SERVER = {
    RUNNING: "SERVER_RUNNING",
    STOPPED: "SERVER_STOPPED",
    STARTING: "SERVER_STARTING",
    STOPPING: "SERVER_STOPPING",
    PORT: process.env.PORT
};

export const DB = {
    // DBI_URI: process.env.DB_URI
}

export const SESSION = {
    SECRET: process.env.SESSION_SECRET
}

export const FRONTEND = {
    URL: process.env.FRONTEND_URL
}

