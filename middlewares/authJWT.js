const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const User = require("../models/user.model");

const authJWT = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.headers["authorization"]?.split(" ")[1] ||
      req.query.token;

    if (!token)
      return res.status(401).json({ message: "Unauthorized1", status: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized2", status: false });

    const user = await User.findById({
      _id: new Types.ObjectId(decoded.id),
    });

    // if (!user || user.tokenVersion !== decoded.tokenVersion)
    //   return res.status(401).json({ message: "Unauthorized3", status: false });

    req.user = user._id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", status: false });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token", status: false });
    } else {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: false });
    }
  }
};

module.exports = authJWT;
