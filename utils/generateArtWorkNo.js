const Counter = require("../models/counter.model");

const generateArtWorkNo = async()=>{
    const counter = await Counter.findOneAndUpdate(
    { name: "artWorkNo" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
   // Example: A-0001, A-0023
  return `A-${counter.seq}`;
}

module.exports = generateArtWorkNo;