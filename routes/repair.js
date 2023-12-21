const express = require("express");
const router = express.Router();
const {
  register,
  remove,
  update,
  getUser,
  getUserid,
} = require("../controllers/adminController");
const {
  repair,
  listRepairMechanice,
  DataRepairMechanice,
  repairMechaniceUpdate,
  listRepairMechaniceSuccess,
  listRepairMechanicePro,
  listRepairMechaniceAdd,
  listRepairMechaniceUnsuccess,
} = require("../controllers/mechanicController");
const {
  parcelStatus,
  DataRepairParcel,
  listRepairParcel,
  listRepairParcelSuccess,
  listRepairParcelPro,
  listRepairParcelAdd,
  listRepairParcelUnsuccess,
  listRepairApprove,
  GetDataRepairParcel,
} = require("../controllers/parcelController");
const {
  repairNotice,
  getallRepairs,
  delRepairNotice,
  updateRepairNotice,
  getRepairNoticeid,
  repairNoticeList,
} = require("../controllers/repair-noticeController");
const { auth } = require("../middleware/auth");

// ดูข้อมูลการแจ้งซ่อมทั้งหมด
router.get("/allrepairs", getallRepairs);

// จัดการผู้ใช้งาน
router.get("/users", getUser);
router.get("/user/:id", getUserid);
router.post("/register", register);
router.delete("/delete/:id", remove);
router.put("/update/:id", update);

// การแจ้งซ่อม
router.post("/repairnotice", repairNotice);
router.post("/repair-notice-list", auth, repairNoticeList);
router.get("/repairnotice/:id", getRepairNoticeid);
router.delete("/deleterepairnotice/:id", delRepairNotice);
router.put("/updaterepairnotice/:id", updateRepairNotice);

// ช่างเทคนิค | การดำเนินงานการซ่อม
router.put("/repair-mechanice-update/:id", repairMechaniceUpdate);
router.post("/repair-list", auth, listRepairMechanice);
router.get("/repair-notice-mechanice/:id", DataRepairMechanice);
router.post("/repair-list-backlog-success", auth, listRepairMechaniceSuccess);
router.post("/repair-list-backlog-pro", auth, listRepairMechanicePro);
router.post("/repair-list-backlog-add", auth, listRepairMechaniceAdd);
router.post(
  "/repair-list-backlog-unsuccess",
  auth,
  listRepairMechaniceUnsuccess
);

// พัสดุรายงานผลการดำเนินการ
router.post("/repair-list-parcel", auth, listRepairParcel);
router.post("/repair-list-approve", auth, listRepairApprove);
router.put("/parcel-status/:id", parcelStatus);
router.get("/repair-notice-parcel/:id", DataRepairParcel);
router.get("/repair-notice-parcel-get/:id", GetDataRepairParcel);
router.post("/repair-list-parcel-success", auth, listRepairParcelSuccess);
router.post("/repair-list-parcel-pro", auth, listRepairParcelPro);
router.post("/repair-list-parcel-add", auth, listRepairParcelAdd);
router.post("/repair-list-parcel-unsuccess", auth, listRepairParcelUnsuccess);

module.exports = router;
