const Counter = require("../models/counter.model");

const generateOrderNo = async()=>{
    const counter = await Counter.findOneAndUpdate(
    { name: "orderReceived" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
   // Example: OR-0001, OR-0023
  return `OR-${counter.seq}`;
}

module.exports = generateOrderNo;