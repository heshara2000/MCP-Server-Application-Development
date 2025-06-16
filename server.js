const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const emailRoutes = require('./routes/email');
const cvRoutes = require('./routes/cv');

app.use('/', emailRoutes);
app.use('/', cvRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
