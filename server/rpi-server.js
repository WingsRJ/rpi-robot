const express = require("express");
const app = express();
app.get("/turn_right", (req, res) => {
    res.send("turn right");
});
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});