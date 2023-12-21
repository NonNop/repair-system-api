// นำการเชื่อมต่อฐานข้อมูลมาใช้
const dbConnection = require("../config/connection");

// ประกาศใช้การเข้ารหัส hash passwprd
const bcrypt = require("bcrypt");
const saltRounds = 10; // ใช้ในการ generate hash password จำนวน 10 ตัว

// ดูข้อมูลผู้ใช้
exports.getUser = async (req, res) => {
  try {
    dbConnection.query(
      "SELECT users.id, users.name ,role.name AS role_name, users.user_position FROM `users` LEFT JOIN role ON users.role_id = role.id",
      (err, result, fields) => {
        if (err) {
          res
            .status(400)
            .json({ status: "ไม่สามารถดูข้อมูลผู้ใช้ได้!!", message: err });
        } else {
          res.status(200).json({ status: "สามารถดูข้อมูลผู้ใช้ได้!!", result });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// ดูข้อมูลผู้ใช้ด้วยไอดี
exports.getUserid = async (req, res) => {
  const id = await req.params.id;
  try {
    dbConnection.query(
      "SELECT name, role_id, user_position FROM users WHERE id = ?",
      [id],
      (err, result, fields) => {
        if (err) {
          res
            .status(400)
            .json({ status: "ไม่สามารถดูข้อมูลผู้ใช้ได้!!", message: err });
        } else {
          res.status(200).json({ status: "สามารถดูข้อมูลผู้ใช้ได้!!", result });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// เพิ่ม users
exports.register = async (req, res) => {
  const { username, password, name, role, position } = await req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    try {
      dbConnection.execute(
        "INSERT INTO users (username, password, name, role_id, user_position) VALUES (?,?,?,?,?)",
        [username, hash, name, role, position],
        (err, result, fields) => {
          if (err) {
            res.status(400).json({
              status: "ไม่สามารถเพิ่มข้อมูล user ได้",
              message: err,
            });
          } else {
            res.status(201).json({ message: "เพิ่มข้อมูล user สำเร็จ!" });
          }
        }
      );
    } catch (error) {
      console.log(err);
      res.status(500).send();
    }
  });
};

// ลบข้อมูล
exports.remove = async (req, res) => {
  const id = await req.params.id;
  try {
    dbConnection.query(
      "DELETE FROM users WHERE users.id = ?",
      [id],
      (err, result, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: "ลบข้อมูลสำเร็จ!!" });
        }
      }
    );
  } catch (error) {
    console.log(err);
    res.status(500).send();
  }
};

// อัพเดตข้อมูล
exports.update = async (req, res) => {
  const { name, role, position } = await req.body;
  const id = await req.params.id;
  try {
    dbConnection.query(
      "UPDATE users SET name = ?, role_id = ?, user_position = ? WHERE id = ?",
      [name, role, position, id],
      (err, result, fields) => {
        if (err) {
          console.error(err);
        } else {
          res.json({ message: "แก้ไขข้อมูลสำเร็จ!!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
