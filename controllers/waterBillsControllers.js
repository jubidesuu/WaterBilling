const connection = require("../config/db");

// GET - Get all water bills
exports.getAllWaterBills = (req, res) => {
  connection.query("SELECT * FROM water_bills", (err, rows) => {
     if (err) throw err;
        res.json(rows);
  });
};

// GET - Get one water bill by meter number
// exports.getWaterBillByMeter = (req, res) => {
//   const meter_number = req.params.meter_number;

//   connection.query(
//     "SELECT * FROM water_bills WHERE meter_number = ?",
//     [meter_number],
//     (err, rows) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Database query failed" });
//       }
//       if (rows.length > 0) {
//         res.json(rows[0]);
//       } else {
//         res.status(404).json({ message: "Water bill not found" });
//       }
//     }
//   );
// };

// POST - Create a new water bill
exports.createWaterBill = (req, res) => {
  const { meter_number, consumer_name, cubic_meters_used, total_amount, status } = req.body;

  connection.query(
    `INSERT INTO water_bills
      (meter_number, consumer_name, cubic_meters_used, total_amount, status)
      VALUES (?, ?, ?, ?, ?)`,
    [meter_number, consumer_name, cubic_meters_used, total_amount, status],
    (err) => {
      if (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Meter number already exists" });
        }
        return res.status(500).json({ message: "Error creating water bill" });
      }
      res.status(201).json({
        message: "Water bill created successfully",
        meter_number,
      });
    }
  );
};

// PUT - Update a water bill
exports.updateWaterBill = (req, res) => {
  //const meter_number = req.params.meter_number;
  const { consumer_name, cubic_meters_used, total_amount, status,meter_number } = req.body;

  connection.query(
    `UPDATE water_bills SET consumer_name = ?, cubic_meters_used = ?,
      total_amount = ?, status = ? WHERE meter_number = ?`,
    [consumer_name, cubic_meters_used, total_amount, status, meter_number],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating water bill" });
      }
      if (result.affectedRows > 0) {
        res.json({ message: "Water bill updated successfully" });
      } else {
        res.status(404).json({ message: "Water bill not found" });
      }
    }
  );
};

// DELETE - Delete a water bill
exports.deleteWaterBill = (req, res) => {
  const meter_number = req.params.meter_number;

  connection.query(
    "DELETE FROM water_bills WHERE meter_number = ?",
    [meter_number],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting water bill" });
      }
      if (result.affectedRows > 0) {
        res.json({ message: "Water bill deleted successfully" });
      } else {
        res.status(404).json({ message: "Water bill not found" });
      }
    }
  );
};
