// Imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Custom Imports
const connectDB = require('./config/dbConn');
const credentials = require('./middlewares/credentials');
const corsOption = require('./config/corsOption');

// Port Number
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Database Connection Initialization
connectDB();

// Cors Option
app.use(credentials);
app.use(cors(corsOption));

// Cookie parser
app.use(cookieParser());

// URL Encoded
app.use(express.urlencoded({ extended: true }));

// Built-in Middleware for json
app.use(express.json({ limit: '10mb' }));

// Serve Static Files
app.use('/public', express.static(path.join(__dirname, '/public')));
console.log("serving file from: ", path.join(__dirname, '/public'));

// Routes
app.use('/ssa/api/v1/admin', require('./routes/admin'));
app.use('/ssa/api/v1/client', require('./routes/client'));
app.use('/ssa/api/v1/blogs', require('./routes/blogs'));
app.use('/ssa/api/v1/portal', require('./routes/portal'));
app.use('/ssa/api/v1/notices', require('./routes/notices'));
app.use('/ssa/api/v1/testimonials', require('./routes/testimonials'));
app.use('/ssa/api/v1/courses', require('./routes/courses'));
app.use('/ssa/api/v1/types', require('./routes/types'));
app.use('/ssa/api/v1/contact', require('./routes/contact'));
app.use('/ssa/api/v1/eligibility', require('./routes/eligibility'));
app.use('/ssa/api/v1/enroll', require('./routes/enrollNow'));
app.use('/ssa/api/v1/refers', require('./routes/refers'));
app.use('/ssa/api/v1/faqs', require('./routes/faq'));
app.use('/ssa/api/v1/resetPass', require('./routes/resetPass'));
app.use('/ssa/api/v1/userProfile', require('./routes/userProfile'));

mongoose.connection.once('open', () => {
    console.log('Connected to Mongo DB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
