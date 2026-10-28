let cl = console.log;

const express = require('express');

const cors = require('cors');

const router = require('./routers/coursesRouters');

const PORT = 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/courses' , router)

app.listen(PORT, () => {
    cl(`server is running on port ${PORT}`);
})

