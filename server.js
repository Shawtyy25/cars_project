import express from 'express';
import path from "path";
import pkg from "pg";

const app = express();
const port = process.env.PORT || 3000;

const dirname = path.resolve();
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'cars',
    password: 'FB-kakimaki2525',
    port: 5432,
});

app.use(express.static(path.join(dirname, './static/login')));

app.get('/', (req,res) => {
    res.sendFile(path.join(dirname, './static/login/login.html'));
})


async function connectToDB() {
    try {
        await client.connect();
        console.log('Successfully connected to the database');

    } catch (error) {
        console.error('Unable to connect to DB', error.message);
    }

}

async function run() {
    await connectToDB();
   /* await selectQuery('users');*/
    await client.end();
}

/*async function selectQuery(table1) {
    const query = `SELECT * FROM ${table1}`;

    try {
        const res = await client.query(query);
        console.log(`Data from ${table1}: ${JSON.stringify(res.rows, null, 2)}`);

    } catch (e) {
        console.error('Error during the query', e.message);
    }
}*/

run();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})