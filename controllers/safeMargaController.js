function getHome(req, res) {
    res.send("Welcome to SafeMarga API");
}

function getStatus(req, res) {
    res.json({
        status: "ok",
        server: "SafeMarga"
    });
}

function getRisk(req, res) {
    res.json({
        location: "Kavre",
        soilMoisture: 42,
        rainfall: 12,
        risk: "Moderate",
        message: "Soil moisture is low and rainfall is present."
    });
}

function createSensorReading(req, res) {
    const deviceId = req.body.deviceId;
    const soilMoisture = req.body.soilMoisture;
    const rainfall = req.body.rainfall;

    if (!deviceId || soilMoisture === undefined || rainfall === undefined) {
        return res.status(400).json({
            error: "deviceId, soilMoisture, and rainfall are required"
        });
    }

    if (
        typeof soilMoisture !== "number" ||
        typeof rainfall !== "number"
    ) {
        return res.status(400).json({
            error: "soilMoisture and rainfall must be numbers"
        });
    }

    res.json({
        message: "New sensor reading received",
        data: {
            deviceId,
            soilMoisture,
            rainfall
        }
    });
}

function createDevice(req, res) {
    const deviceId = req.body.deviceId;
    const location = req.body.location;
    const status = req.body.status;

    if (!deviceId || !location || !status) {
        return res.status(400).json({
            error: "deviceId, location, and status are required"
        });
    }

    res.status(201).json({
        message: "Device created successfully",
        device: {
            deviceId,
            location,
            status
        }
    });
}

function checkRisk(req, res) {
    const location = req.body.location;
    const soilMoisture = req.body.soilMoisture;
    const rainfall = req.body.rainfall;

    if (!location || soilMoisture === undefined || rainfall === undefined) {
        return res.status(400).json({
            error: "Location, soilMoisture, and rainfall are required"
        });
    }

    if (typeof soilMoisture !== "number" || typeof rainfall !== "number") {
        return res.status(400).json({
            error: "soilMoisture and rainfall must be numbers"
        });
    }

    let risk;
    let message;

    if (soilMoisture < 40 && rainfall > 15) {
        risk = "High";
        message = "High landslide risk. Be alert.";
    } else if (soilMoisture < 50 || rainfall > 10) {
        risk = "Moderate";
        message = "Moderate landslide risk. Stay updated.";
    } else {
        risk = "Low";
        message = "Low landslide risk. Conditions are safe.";
    }

    res.json({
        location,
        soilMoisture,
        rainfall,
        risk,
        message
    });
}

function updateDeviceFully(req, res) {
    res.json({
        message: `Device ${req.params.id} fully updated`
    });
}

function updateDeviceField(req, res) {
    res.json({
        message: `Status of device ${req.params.id} updated`
    });
}

function deleteDevice(req, res) {
    res.json({
        message: `Device ${req.params.id} deleted`
    });
}

function errorTest(req, res, next) {
    const error = new Error("This is a test error");

    next(error);
}

function serverErrorTest(req, res, next) {
    const error = new Error("Server error test");

    next(error);
}

module.exports = {
    getHome,
    getStatus,
    getRisk,
    createSensorReading,
    createDevice,
    checkRisk,
    updateDeviceFully,
    updateDeviceField,
    deleteDevice,
    errorTest,
    serverErrorTest
};