// นำการเชื่อมต่อฐานข้อมูลมาใช้
const dbConnection = require("../config/connection");

// แสดงข้อมูลการแจ้งซ่อม
exports.DataRepairMechanice = async (req, res) => {
  const id = await req.params.id;
  try {
    dbConnection.execute(
      "SELECT normalUser.name AS normalUser_name, normalUser.user_position, mechanicUser.id AS mechanicUser_id, mechanicUser.name AS mechanicUser_name, mechanicUser.user_position AS mechanicUser_position, repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanic_date, repair_notice.mechanice_detail, repair_notice.repair_status FROM repair_notice LEFT JOIN users AS normalUser ON repair_notice.user_id = normalUser.id LEFT JOIN users AS mechanicUser ON repair_notice.mechanic_user_id = mechanicUser.id WHERE repair_notice.id = ?",
      [id],
      (err, result) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้", result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};

// แสดงข้อมูลการแจ้งซ่อมใหม่/ยังไม่ได้ทำการซ่อม
exports.listRepairMechanice = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.malfunction, repair_notice.area, repair_notice.repair_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.repair_status LIKE 'รอดำเนินการ'",
      (err, result) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้", result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};

// แสดงข้อมูลงาน : ดำเนินการเรียบร้อย
exports.listRepairMechaniceSuccess = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanic_date, repair_notice.mechanice_detail, repair_notice.repair_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.repair_status LIKE 'ดำเนินการเรียบร้อย';",
      (err, result) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้", result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};

// แสดงข้อมูลงานค้าง : ต้องแจ้งผู้มีอาชีพเข้ามาดำเนินการ
exports.listRepairMechanicePro = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id,repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanice_detail, repair_notice.repair_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.repair_status LIKE 'ต้องแจ้งผู้มีอาชีพเข้ามาดำเนินการ' OR 'ซ่อมได้แต่ต้องจัดหาอุปกรณ์เพิ่ม' OR 'ไม่สามารถซ่อมแซมได้'",
      (err, result) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้", result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};

// แสดงข้อมูลงานค้าง : ต้องแจ้งผู้มีอาชีพเข้ามาดำเนินการ
exports.listRepairMechaniceAdd = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id,repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanice_detail, repair_notice.repair_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.repair_status LIKE 'ซ่อมได้แต่ต้องจัดหาอุปกรณ์เพิ่ม'",
      (err, result) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้", result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};

// แสดงข้อมูลงานค้าง : ไม่สามารถซ่อมแซมได้
exports.listRepairMechaniceUnsuccess = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id,repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanice_detail, repair_notice.repair_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.repair_status LIKE 'ไม่สามารถซ่อมแซมได้'",
      (err, result) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถดูข้อมูลใบแจ้งซ่อมได้",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "สามารถดูข้อมูลใบแจ้งซ่อมได้", result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};

// อัพเดตรายละเอียดการซ่อมและสถานะ
exports.repairMechaniceUpdate = async (req, res) => {
  const { mechanice_date, mechanic_id, mechanice_detail, repair_status } =
    await req.body;
  const id = await req.params.id;
  try {
    dbConnection.execute(
      "UPDATE repair_notice SET mechanic_date = ?, mechanic_user_id = ?, mechanice_detail = ?, repair_status = ? WHERE id = ?",
      [mechanice_date, mechanic_id, mechanice_detail, repair_status, id],
      (err, result, fields) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถลงรายละเอียดการดำเนินการซ่อมได้!!",
            message: err,
          });
        } else {
          res
            .status(200)
            .json({ status: "ลงรายละเอียดการดำเนินการซ่อมสำเร็จ!!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
};
