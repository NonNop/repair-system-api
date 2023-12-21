const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

// กำหนด App เป็น Express
const app = express();

// ส่วนที่ทำงานกับ express คือการใช้ use
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// เรียกใช้งาน routes
const manageRepair = require("./routes/repair");
const authen = require("./routes/auth");

// route | เส้นทาง
app.use("/api", manageRepair);
app.use("/api", authen);

// แสดงเว็บไซ์ port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on port " + port));
