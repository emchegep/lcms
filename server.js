const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

const API = require("./server/routes/api")
const path = require("path")


const PORT = 3000;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use("/api", API);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"))
})
app.listen(PORT, function () {
  console.log("server running at port 3000");
})
