const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data sent in request body
app.use(express.json());

// Custom global middleware
app.use((req, res, next) => {
    console.log(new Date().toISOString());

    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);

    next();
})

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to SafeMarga API");
});

// Middleware only for /api/status
function statusChecker(req, res, next){
    console.log("This middleware runs only for /api/status");

    next();
}

function blockTester(req, res, next){
    res.status(403).json({
        message: "Request blocked by middleware"
    });
}

function secondChecker(req, res, next){
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
function riskChecker(req, res, next){
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
    res.json({
        message: "New sensor reading received"
    });
});

// Check landslide risk using data sent by client
app.post("/api/check-risk", (req, res) => {
    const location = req.body.location;
    const soilMoisture = req.body.soilMoisture;
    const rainfall = req.body.rainfall;

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

// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});