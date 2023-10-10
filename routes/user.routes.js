
module.exports = app => {
    const user = require("../controller/user.controller.js");
  
  
    var router = require("express").Router();
    
    router.post("/create", user.createUser);
    router.put("/:id", user.updateUser);
    router.delete("/:id", user.deleteUser)
    router.get("/", user.getUsers);
    router.get("/:id", user.getUsers);

    
    app.use('/api/user', router);
  };
  