import { getConnectionOptions, createConnection } from 'typeorm';


const setupDatabase = async () => {


    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    const connection = await createConnection({...connectionOptions, name: 'default'});

    connection.synchronize();
}

setupDatabase();


