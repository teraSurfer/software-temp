import * as constants from './util/constants';

import { EventEmitter } from 'events';
import { GraphQLServer } from 'graphql-yoga';
// import { applyMiddleware } from 'graphql-middleware';
import { generateSchema } from './util/schemas';
import { Props } from 'graphql-yoga/dist/types';
import { createDBConnection } from './util/type-orm';



/**
 * @class Server 
 * Server class definition
 * @author Achalaesh Lanka <me@terasurfer.com>
 */
export class Server extends EventEmitter {
    private server: GraphQLServer;
    private props: Props;
    constructor() {
        super();
    }

    async loadSettings() {
        this.emit(constants.SERVER.STARTING);
        const schema = generateSchema()
        // applyMiddleware(schema, middleware);
        this.props = {
            schema,
        };

        await createDBConnection();
    }

    start() {
        this.server = new GraphQLServer(this.props);
        this.server.start({
            port: constants.SERVER.PORT,
            endpoint: '/graph/v1',
            subscriptions: '/subscriptions',
            playground: '/playground'
        }, ({port}) => 
        console.log(`Server is running on localhost:${port}`));
    }
}

