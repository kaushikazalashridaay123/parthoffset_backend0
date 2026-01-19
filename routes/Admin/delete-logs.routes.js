const generateCrudRoutes = require("mongoose-crud-generator");

const checkPermission = require("../../middlewares/checkPermission");
const DeleteLog = require("../../models/deletelogs.model");

const DeleteRouter = generateCrudRoutes({
  model: DeleteLog,
  modelName: "Delete log",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("deletelogs_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {    
      checkPermission("deletelogs_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("deletelogs_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("deletelogs_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("deletelogs_delete")(req, res, next);
    },
  },

//   postHooksOptions : {
//     getAll : async (req , res , response) => {
//         try {
//             console.log(response);
            

//         }catch(err){
//             console.log(err);
            
//         }
//     }
//   }
});

module.exports = DeleteRouter;
