const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sensor Reading API");
});

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});