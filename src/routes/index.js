const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => res.json({message: "Hello World"}));

router.use("/contacts", require("./contacts"));

module.exports = router;