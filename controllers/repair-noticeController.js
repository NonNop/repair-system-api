// นำการเชื่อมต่อฐานข้อมูลมาใช้
const dbConnection = require("../config/connection");

// ดูข้อมูลการแจ้งซ่อมทั้งหมด
exports.getallRepairs = async (req, res) => {
  try {
    dbConnection.query("SELECT * FROM repair_notice", (err, result, fields) => {
      if (err) {
        res
          .status(400)
          .json({ status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้!!", message: err });
      } else {
        res
          .status(200)
          .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้!!", result });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// ดูใบแจ้งซ่อม
exports.repairNoticeList = (req, res) => {
  try {
    dbConnection.query(
      "SELECT id, repair_order_date, building, repair_list, quantity, unit, malfunction, area, repair_status FROM repair_notice WHERE user_id = ?",
      [userId],
      (err, result) => {
        res.json({ status: "ok", result: result });
      }
    );
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

// ดูใบแจ้งซ่อมด้วยไอดี
exports.getRepairNoticeid = async (req, res) => {
  const id = await req.params.id;
  console.log(id);
  try {
    dbConnection.query(
      "SELECT users.name, users.user_position, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.repair_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.id = ?",
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

// การแจ้งซ่อม
exports.repairNotice = async (req, res) => {
  const { userid, building, list, quantity, unit, malfunction, area } =
    await req.body;
  try {
    dbConnection.execute(
      "INSERT INTO repair_notice (user_id, building, repair_list, quantity, unit, malfunction, area) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userid, building, list, quantity, unit, malfunction, area],
      (err, result, fields) => {
        if (err) {
          res
            .status(400)
            .json({ status: "ไม่สามารถสร้างใบแจ้งซ่อมได้!!", message: err });
        } else {
          res.status(200).json({ status: "เพิ่มใบแจ้งซ่อมสำเร็จ!!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// ลบใบแจ้งซ่อม
exports.delRepairNotice = async (req, res) => {
  const id = await req.params.id;
  try {
    dbConnection.query(
      "DELETE FROM repair_notice WHERE id = ?",
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
    console.log(error);
    res.status(500).send();
  }
};

// อัพเดตข้อมูลใบแจ้งซ่อม
exports.updateRepairNotice = async (req, res) => {
  const { building, list, quantity, unit, malfunction, area } = await req.body;
  const id = await req.params.id;
  try {
    dbConnection.query(
      "UPDATE repair_notice SET building = ?, repair_list = ?, quantity = ?, unit = ?, malfunction = ?, area = ? WHERE id = ?",
      [building, list, quantity, unit, malfunction, area, id],
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
