const Counter = require("../models/counter.model");

const generateSalesOrderNo = async()=>{
    const counter = await Counter.findOneAndUpdate(
    { name: "salesOrderBooking" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
   // Example: OR-0001, OR-0023
  return `SOB-${counter.seq}`;
}

module.exports = generateSalesOrderNo;