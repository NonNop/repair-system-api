// นำการเชื่อมต่อฐานข้อมูลมาใช้
const dbConnection = require("../config/connection");

// แสดงรายการการแจ้งซ่อม
exports.listRepairParcel = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.area FROM repair_notice WHERE ISNULL(parcel_status) AND repair_notice.repair_status != 'รอดำเนินการ'",
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

// แสดงข้อมูลการแจ้งซ่อม
exports.DataRepairParcel = async (req, res) => {
  const id = await req.params.id;
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, normalUser.name AS normalUser_name, normalUser.user_position, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanic_date, mechanicUser.name AS mechanicUser_name, mechanicUser.user_position AS mechanicUser_position, repair_notice.mechanice_detail, repair_notice.repair_status, repair_notice.parcel_date, parcelUser.id AS parcelUser_id, parcelUser.name AS parcelUser_name, parcelUser.user_position AS parcelUser_position, repair_notice.parcel_status FROM repair_notice LEFT JOIN users AS normalUser ON repair_notice.user_id = normalUser.id LEFT JOIN users AS mechanicUser ON repair_notice.mechanic_user_id = mechanicUser.id LEFT JOIN users AS parcelUser ON repair_notice.parcel_user_id = parcelUser.id WHERE repair_notice.id = ?",
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

// แสดงข้อมูลการแจ้งซ่อม 2
exports.GetDataRepairParcel = async (req, res) => {
  const id = await req.params.id;
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, repair_notice.mechanice_detail, repair_notice.repair_status, parcelUser.id AS parcelUser_id, repair_notice.parcel_status FROM repair_notice LEFT JOIN users AS parcelUser ON repair_notice.parcel_user_id = parcelUser.id WHERE repair_notice.id = ?",
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

// แสดงข้อมูลงาน : เพื่อโปรดทราบ
exports.listRepairParcelSuccess = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.malfunction, repair_notice.area, repair_notice.repair_status, repair_notice.parcel_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.parcel_status LIKE 'เพื่อโปรดทราบ'",
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

// แสดงข้อมูลงาน : เห็นควรแจ้งผู้มีอาชีพฯ
exports.listRepairParcelPro = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.malfunction, repair_notice.area, repair_notice.repair_status, repair_notice.parcel_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.parcel_status LIKE 'เห็นควรแจ้งผู้มีอาชีพฯ'",
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
// แสดงข้อมูลงาน : เห็นควรจัดหาอุปกรณ์เพิ่มเติม
exports.listRepairParcelAdd = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.malfunction, repair_notice.area, repair_notice.repair_status, repair_notice.parcel_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.parcel_status LIKE 'เห็นควรจัดหาอุปกรณ์เพิ่มเติม'",
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
// แสดงข้อมูลงาน : เห็นควรจัดหาทดแทน
exports.listRepairParcelUnsuccess = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, repair_notice.building, repair_notice.repair_list, repair_notice.malfunction, repair_notice.area, repair_notice.repair_status, repair_notice.parcel_status FROM repair_notice LEFT JOIN users ON repair_notice.user_id = users.id WHERE repair_notice.parcel_status LIKE 'เห็นควรจัดหาทดแทน'",
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

// อัพเดตสถานะ || รับทราบใบแจ้งซ่อม
exports.parcelStatus = async (req, res) => {
  const { parcel_date, parcel_id, parcel_status } = await req.body;
  const id = await req.params.id;
  try {
    dbConnection.execute(
      "UPDATE repair_notice SET parcel_user_id = ?, parcel_status = ?, parcel_date = ?  WHERE id = ?",
      [parcel_id, parcel_status, parcel_date, id],
      (err, result, fields) => {
        if (err) {
          res.status(400).json({
            status: "ไม่สามารถรายงานผลการดำเนินการได้!!",
            message: err,
          });
        } else {
          res.status(200).json({
            status: "รายงานผลการดำเนินการสำเร็จ!!",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

// แสดงข้อมูลการแจ้งผ่านการตัดสินใจจากพัสดุแล้ว
exports.listRepairApprove = async (req, res) => {
  try {
    dbConnection.execute(
      "SELECT repair_notice.id, repair_notice.repair_order_date, normalUser.name AS normalUser_name, normalUser.user_position As normalUser_position, repair_notice.building, repair_notice.repair_list, repair_notice.quantity, repair_notice.unit, repair_notice.malfunction, repair_notice.area, mechanic_date, mechanicUser.name AS mechanicUser_name, mechanicUser.user_position AS mechanicUser_position, repair_notice.mechanice_detail, repair_notice.repair_status, repair_notice.parcel_date, parcelUser.id AS parcelUser_id, parcelUser.name AS parcelUser_name, parcelUser.user_position AS parcelUser_position, repair_notice.parcel_status FROM repair_notice LEFT JOIN users AS normalUser ON repair_notice.user_id = normalUser.id LEFT JOIN users AS mechanicUser ON repair_notice.mechanic_user_id = mechanicUser.id LEFT JOIN users AS parcelUser ON repair_notice.parcel_user_id = parcelUser.id WHERE repair_notice.parcel_status IN ('เพื่อโปรดทราบ', 'เห็นควรแจ้งผู้มีอาชีพฯ', 'เห็นควรจัดหาอุปกรณ์เพิ่มเติม', 'เห็นควรจัดหาทดแทน');",
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
