require('dotenv').config()
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const swaggerDocs = require('./config/swagger');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Swagger API documentation
swaggerDocs(app);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

