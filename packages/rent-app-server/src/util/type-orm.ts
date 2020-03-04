import { getConnectionOptions, createConnection } from 'typeorm';

export const createDBConnection = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    console.log(connectionOptions.database);
    await createConnection({...connectionOptions, name: 'default'});
}
