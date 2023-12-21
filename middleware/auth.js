// นำการเชื่อมต่อฐานข้อมูลมาใช้
const dbConnection = require("../config/connection");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    // const token = await req.header.authorization.split(" ")[1];
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send("ไม่มี Token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
    userRole = decoded.roleName;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Token ไม่ถูกต้อง");
  }
};

// เช็ค Role : แอดมิน
exports.adminCheck = async (req, res, next) => {
  try {
    dbConnection.execute(
      "SELECT role.name AS role_name FROM users LEFT JOIN role ON users.role_id = role.id WHERE role.name = ?",
      [userRole],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send("ไม่สามารถเข้าถึงข้อมูลได้");
          return;
        }

        const userCheck = results[0].role_name;
        if (userCheck !== "แอดมิน") {
          res
            .status(403)
            .send("คุณไม่ใช่ 'แอดมิน' ไม่ได้รับอนุญาตในการเข้าถึง");
          return;
        } else {
          next();
        }
      }
    );
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("ไม่สามารถเข้าถึงข้อมูลได้");
  }
};
