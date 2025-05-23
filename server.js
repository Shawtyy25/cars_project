import express from 'express';
import path from "path";
import pkg from "pg";
import bodyParser from "body-parser";
import {loginCheckQuery} from "./databaseQueries.js";

// todo static files dont appear!!!


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

app.use(bodyParser.json());

app.use(express.static(path.join(dirname, './static')));

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
}

app.post('/login/user_check', async (req, res) => {
    try {
        const { name, password } = req.body;
        console.log(`Received login credentials: ${name} : ${password}`);

        const userData = await loginCheckQuery(client, name, password);
        res.send(userData);

    } catch (e) {
        console.error(`Database query error: ${e}`);
    }


})

app.post('/login/redirect', (req, res) => {
    try {
        res.redirect('/main_page');

    } catch (error) {
        console.error(`Error while redirecting: ${error}`);
    }
})

app.get('/main_page', (req, res) => {
    res.sendFile(path.join(dirname, './static/main_page/main.car.html'));
})

app.post('/login/to/registration', (req, res) => {
    try {
        res.redirect('/registration');

    } catch (e) {
        console.error(`Error while redirecting: ${e}`);
    }
})

app.get('/registration', (req, res) => {
    res.sendFile(path.join(dirname, './static/registration/reg.main.html'));
})

run();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})