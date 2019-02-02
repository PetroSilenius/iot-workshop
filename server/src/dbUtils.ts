import sqlite from 'sqlite';
import SQL from 'sql-template-strings';


const dbPromise = Promise.resolve()
    .then(() => sqlite.open('database.db'))
    .then(db => db.migrate({force:'last'}));

const insertReading = (reading: NewReading): Promise<void> => {
    const {name, temperature, pressure, humidity} = reading;
    const timestamp = new Date().toISOString();

    //If the sensor is missing in the 'sensor' table insert it
    const insertSensorQuery = SQL`
        INSERT OR IGNORE INTO Sensor (name, firstonline, lastonline)
        VALUES (${name}, ${timestamp}, ${timestamp})
    `;

    //Update the sensor's last online time
    const updateSensorQuery = SQL`
        UPDATE Sensor
        SET lastonline = ${timestamp} WHERE name = ${name}
    `;

    //insert reading into 'reading' table
    const insertReadingQuery = SQL`
        INSERT INTO Reading (sensorname, temperature, pressure, humidity, timestamp)
        VALUES (${name}, ${temperature}, ${pressure}, ${humidity}, ${timestamp})
    `;

    return dbPromise
        .then(db => Promise.all([
            db.run(insertSensorQuery),
            db.run(updateSensorQuery),
            db.run(insertReadingQuery)
        ]))
        .then(() => console.log('Succesfully inserted reading into database.'));
};

const getSensors = () : Promise<Sensor[]> => {
    const query =`
        SELECT *
        FROM sensor
    `;

    return dbPromise
        .then(db => db.all(query));
};

const getReadings = (noOfReadings: number = 100): Promise<Reading[]> =>{
    console.log(noOfReadings);
    const query = SQL`
        SELECT sensorname, temperature, pressure, humidity, timestamp
        FROM Reading
        ORDER BY timestamp DESC
        LIMIT ${noOfReadings}
    `;

    return dbPromise
        .then(db => db.all(query));
};

export { insertReading, getSensors, getReadings };