const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes.js");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://syedtahali10:Mongodb.1@mevn-student-managemnt.uthh0pr.mongodb.net/");
        console.log("Db connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});
