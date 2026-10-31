const express = require("express");

const router = express.Router();

const {
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
} = require("../controllers/safeMargaController");

const {
    statusChecker,
    secondChecker,
    riskChecker,
    sensorChecker
} = require("../middleware/safeMargaMiddleware");

const logger = require("../middleware/logger");

router.get("/", logger, getHome);

router.get("/status", logger, statusChecker, secondChecker, getStatus);

router.get("/risk", logger, riskChecker, getRisk);

router.post("/sensor", logger, sensorChecker, createSensorReading);

router.post("/device", logger, createDevice);

router.post("/check-risk", logger, checkRisk);

router.get("/error-test", logger, errorTest);

router.get("/server-error", logger, serverErrorTest);

router.put("/device/:id", logger, updateDeviceFully);

router.patch("/device/:id", logger, updateDeviceField);

router.delete("/device/:id", logger, deleteDevice);

module.exports = router;