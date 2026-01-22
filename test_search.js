const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const Client = require("./models/client.model");
const Product = require("./models/product.model");
const Category = require("./models/category.model");
const OrderReceived = require("./models/orderReceived.model");

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const q = "Mobile";
    const regex = { $regex: q, $options: "i" };

    const [clientIds, productIds, categoryIds] = await Promise.all([
      Client.find({ 
        $or: [
          { clientName: regex },
          { mailingName: regex },
          { concernPersonName: regex }
        ]
      }).distinct("_id"),
      Product.find({ productName: regex }).distinct("_id"),
      Category.find({ name: regex }).distinct("_id")
    ]);

    console.log(`Matched IDs - Clients: ${clientIds.length}, Products: ${productIds.length}, Categories: ${categoryIds.length}`);

    const orConditions = [
      { orderNo: regex },
      { poNo: regex },
      {
        $expr: {
          $regexMatch: {
            input: { $dateToString: { format: "%d %b, %Y", date: { $ifNull: ["$date", new Date(0)] } } },
            regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            options: "i"
          }
        }
      }
    ];

    if (clientIds.length > 0) orConditions.push({ client: { $in: clientIds } });
    if (productIds.length > 0) orConditions.push({ product: { $in: productIds } });
    if (categoryIds.length > 0) orConditions.push({ category: { $in: categoryIds } });

    const filter = { $or: orConditions };
    console.log("Filter:", JSON.stringify(filter, null, 2));

    const results = await OrderReceived.find(filter).limit(5);
    console.log("Results found:", results.length);

    process.exit(0);
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
}

test();
