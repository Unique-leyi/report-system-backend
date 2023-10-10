
module.exports = app => {
    const auth = require("../controller/auth.controller.js");
  
  
    var router = require("express").Router();
    
    router.post("/register", auth.register);
    router.post("/login", auth.login);
    
    app.use('/api/auth', router);
  };
  