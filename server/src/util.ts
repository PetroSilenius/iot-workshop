const assertReading = (reading: NewReading | null) => {
    if (!reading) {
        throw 'Invalid request body';
    }
    const {name, temperature, pressure, humidity} = reading;

    if(!name|| typeof name !== 'string' || name.length < 3){
        throw 'Invalid or missing parameter "name"';
    }
    else if(!temperature || typeof temperature !== 'number'){
        throw 'Invalid or missing parameter "Temperature"';
    }
    else if (!pressure || typeof pressure !== 'number'){
        throw 'Invalid or missing parameter "Pressure"';
    }
    else if (!humidity || typeof humidity !== 'number'){
        throw 'Invalid or missing parameter "Humidity"';
    }
};

export {assertReading};