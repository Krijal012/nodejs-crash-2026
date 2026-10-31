const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Import routes
const safeMargaRoutes = require("./routes/safeMargaRoutes");

// Connect routes with /api prefix
app.use("/api", safeMargaRoutes);

// 404 handler
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});