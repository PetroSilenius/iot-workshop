import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import { assertReading } from "./util";
import { insertReading, getSensors, getReadings } from './dbUtils';

const app = express();
app.use(bodyParser.json());

app.post('/api/newreading', (req:Request, res:Response) => {
    const reading : NewReading = req.body;
    console.log('received new reading:', reading);

    try {
        assertReading(reading);
    }
    catch (error) {
        return res.status(400).send(error);
    }

    insertReading(reading)
        .then(() => res.send(reading))
        .catch(err => res.status(500).send(err));
});

app.get('/api/getsensors', (req: Request, res: Response) => {
    console.log('Received getsensors request');
    getSensors()
        .then(sensors => res.send(sensors))
        .catch(err => res.status(500).send(err));
});

app.get('/api/getreadings/:limit', (req: Request, res: Response) => {
    console.log('Received getreadings request');
    getReadings(req.params.limit)
        .then(readings => res.send(readings))
        .catch(err => res.status(500).send(err));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});