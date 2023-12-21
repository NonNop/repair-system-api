// นำการเชื่อมต่อฐานข้อมูลมาใช้
const dbConnection = require("../config/connection");

// ประกาศใช้การเข้ารหัส hash passwprd
const bcrypt = require("bcrypt");

// Token และสร้างคีย์ลับขึ้นมา ในที่นี้ใเก็บไว้ใน .env คือ JWT_SECRET
const jwt = require("jsonwebtoken");

// รหัสลับ
const secret = process.env.JWT_SECRET || awdadkhawudauidi;

// เข้าสู่ระบบ
exports.login = async (req, res) => {
  const { username, password } = await req.body;
  try {
    dbConnection.execute(
      "SELECT users.id, users.name, users.password ,role.name AS role_name, users.user_position FROM users LEFT JOIN role ON users.role_id = role.id WHERE username = ?",
      [username],
      (err, users, fields) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        if (users.length == 0) {
          res.json({ status: "error", message: "ไม่พบผู้ใช้" });
          return;
        }

        const payload = {
          id: users[0].id,
          name: users[0].name,
          role: users[0].role_name,
          position: users[0].user_position,
        };

        bcrypt.compare(password, users[0].password, (err, isLogin) => {
          if (isLogin) {
            const token = jwt.sign(
              { id: users[0].id, roleName: users[0].role_name },
              secret,
              {
                expiresIn: "4h",
              }
            );
            res.json({
              status: "success",
              message: "เข้าสู่ระบบสำเร็จ!",
              token,
              payload,
            });
          } else {
            return res.json({ status: "error", message: "รหัสผ่านไม่ถูกต้อง" });
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// ยืนยันตัวตนผู้ใช้งาน
exports.currentUser = (req, res) => {
  try {
    dbConnection.query(
      "SELECT users.id, users.name, role.name AS role_name, users.user_position FROM users LEFT JOIN role ON users.role_id = role.id WHERE users.id = ?",
      [userId],
      (err, result) => {
        if (err) {
          res.json({ status: "error", message: err.message });
          return;
        }
        const payload = {
          id: result[0].id,
          name: result[0].name,
          role: result[0].role_name,
          position: result[0].user_position,
        };
        res.json({ status: "ok", payload: payload });
      }
    );
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};
