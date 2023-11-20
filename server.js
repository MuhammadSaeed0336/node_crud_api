
const express = require('express');
const app = express();

//routes
app.get('/', (req, res) => {
    res.send("Hello SZ")
})

app.listen(8000, () => {
    console.log("Node Api is running on port 8000")
})