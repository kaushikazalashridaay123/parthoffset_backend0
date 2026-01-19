const Permission = require("../models/permission.model");
const User = require("../models/user.model");

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized", status: false });
      }

      const user = await User.findById(req.user._id).populate({
        path: "roles",
        populate: { path: "permissions" },
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", status: false });
      }

      // Get role permissions
      let rolePermissions = new Set();
      user.roles.forEach((role) => {
        role.permissions.forEach((permission) =>
          rolePermissions.add(permission)
        );
      });

      // Extra and revoked permissions
      const extraPermissions = new Set(user.extraPermissions.map((p) => p));
      const revokedPermissions = new Set(user.revokedPermissions.map((p) => p));

      // Final permissions
      let finalPermissions = new Set([...rolePermissions, ...extraPermissions]);
      revokedPermissions.forEach((permission) =>
        finalPermissions.delete(permission)
      );

      // Check if user has the required permission
      
      //removed popup for special company details read
      if (requiredPermission !== "companyDetails_read") {
        if (!finalPermissions.has(requiredPermission)) {
          return res.status(403).json({
            message: "Forbidden: You do not have permission",
            status: false,
          });
        }
      }
      return next(); // User has permission, proceed
    } catch (error) {
      console.log("Permission Check Error:", error);
      res.status(500).json({ message: "Internal Server Error", status: false });
    }
  };
};

module.exports = checkPermission;
