const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data sent in request body
app.use(express.json());

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: err.message
    });
});

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to SafeMarga API");
});

// Middleware only for /api/status
function statusChecker(req, res, next) {
    console.log("This middleware runs only for /api/status");

    next();
}

function blockTester(req, res, next) {
    res.status(403).json({
        message: "Request blocked by middleware"
    });
}

function secondChecker(req, res, next) {
    console.log("Second Middleware");

    next();
}

// Check API status
app.get("/api/status", statusChecker, secondChecker, (req, res) => {
    const status = {
        status: "ok",
        server: "SafeMarga"
    };

    res.json(status);
});

// Middleware only for /api/risk
function riskChecker(req, res, next) {
    console.log("Risk route middleware is running...");

    next();
}

// Get current risk data
app.get("/api/risk", riskChecker, (req, res) => {
    const riskData = {
        location: "Kavre",
        soilMoisture: 42,
        rainfall: 12,
        risk: "Moderate",
        message: "Soil moisture is low and rainfall is present."
    };

    res.json(riskData);
});

// Middleware only for /api/sensor
function sensorChecker(req, res, next) {
    console.log("Sensor middleware is running...");

    next();
}

// Add new sensor reading
app.post("/api/sensor", sensorChecker, (req, res) => {
    const deviceId = req.body.deviceId;
    const soilMoisture = req.body.soilMoisture;
    const rainfall = req.body.rainfall;

    // Task 1: Check missing data
    if (!deviceId || soilMoisture === undefined || rainfall === undefined) {
        return res.status(400).json({
            error: "deviceId, soilMoisture, and rainfall are required"
        });
    }

    // Check data types
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
            deviceId: deviceId,
            soilMoisture: soilMoisture,
            rainfall: rainfall
        }
    });
});

app.post("/api/device", (req, res) => {
    const deviceId = req.body.deviceId;
    const location = req.body.location;
    const status = req.body.status;

    // Missing Value
    if(!deviceId || location === undefined || status === undefined){
        return res.status(400).json({
            error: "DeviceID, Location and STatus are required"
        });
    }

    res.status(201).json({
        message: "Device created successfully",
        device: {
            deviceId: deviceId,
            location: location,
            status: status
        }
    })
})

// Check landslide risk using data sent by client
app.post("/api/check-risk", (req, res) => {
    const location = req.body.location;
    const soilMoisture = req.body.soilMoisture;
    const rainfall = req.body.rainfall;

    // Check missing data
    if (!location || soilMoisture === undefined || rainfall === undefined) {
        return res.status(400).json({
            error: "Location, soilMoisture, and rainfall are required"
        });
    }

    // Check invalid data types
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
        location: location,
        soilMoisture: soilMoisture,
        rainfall: rainfall,
        risk: risk,
        message: message
    });
});

// Test route for error-handling middleware
app.get("/api/error-test", (req, res, next) => {
    const error = new Error("This is a test error");

    next(error);
});

// Fully update a device
app.put("/api/device/:id", (req, res) => {
    res.json({
        message: `Device ${req.params.id} fully updated`
    });
});

// Update one field of a device
app.patch("/api/device/:id", (req, res) => {
    res.json({
        message: `Status of device ${req.params.id} updated`
    });
});

// Delete a device
app.delete("/api/device/:id", (req, res) => {
    res.json({
        message: `Device ${req.params.id} deleted`
    });
});

// Server error test route
app.get("/api/server-error", (req, res, next) => {
    const error = new Error("Server error test");

    next(error);
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: `Cannot ${req.method} ${req.url}`
    });
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: "Something went wrong on the server"
    });
});

// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});