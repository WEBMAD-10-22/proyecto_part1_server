const validateToken = require("../middleware/validateToken.middleware");
const UserModel = require("../models/User.model");

const router = require("express").Router();

router.get("/user/me", validateToken, (req, res, next) => {
  UserModel.findById(req.user._id).then((user) => {
    res.json(user)
  })
});

module.exports = router;
