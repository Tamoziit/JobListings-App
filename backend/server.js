const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jobRoutes = require("./routes/job.routes.js");
const { connectToDb, sequelize } = require("./db/connectToDb.js");
const Job = require("./models/job.model.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/v1", (req, res) => {
    res.send("<h1>Server up & running!</h1>");
});

app.use('/api/v1/jobs', jobRoutes);

app.listen(PORT, async () => {
    try {
        await connectToDb();
        await sequelize.sync({ force: false });
        console.log(`Connected to the database successfully.`);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
});
