const express = require("express");
const router = require("./routes/index")
const cors = require("cors")
const app = express();
require("./db/config")

// app level middlewares
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use('/uploads', express.static('uploads'));

// app routes
app.use("/api", router);

app.listen(5000, () => {
    console.log("Server is up and running on 5000 port")
})