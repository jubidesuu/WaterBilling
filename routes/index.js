const express = require("express");
const router = express.Router();
const waterBillsController = require("../controllers/waterBillsControllers");

// GET - View all water bills
router.get("/water-bills", waterBillsController.getAllWaterBills);

// // GET - Get one water bill by meter number
// router.get("/water-bills/:meter_number", waterBillsController.getWaterBillByMeter);

// POST - Create a new water bill
router.post("/water-bills", waterBillsController.createWaterBill);

// PUT - Update a water bill using its meter number
router.put("/water-bills/", waterBillsController.updateWaterBill);

// DELETE - Delete a water bill using its meter number
router.delete("/water-bills/:meter_number", waterBillsController.deleteWaterBill);

module.exports = router;
