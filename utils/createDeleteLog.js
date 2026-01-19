const DeleteLog = require("../models/deletelogs.model");


/**
 * Create a delete log entry.
 * @param {Object} options
 * @param {String} options.modulename - The module name (e.g., "SalesOrderBooking")
 * @param {String} [options.reason] - Optional reason for deletion
 * @param {mongoose.Types.ObjectId} options.deletedId - The deleted document's ID
 * @param {mongoose.Types.ObjectId} options.userId - The user who performed the delete
 */
const createDeleteLog = async ({ modulename, reason, deletedId, userId }) => {
  try {
    if (!modulename || !userId) {
      throw new Error("modulename and userId are required for delete log.");
    }

    const log = await DeleteLog.create({
      modulename,
      reason: reason || null,
      deletedId: deletedId || null,
      createdBy: userId,
      status : 1
    });

    return log;
  } catch (error) {
    console.error("Error creating delete log:", error.message);
    throw error;
  }
};

module.exports = createDeleteLog;
