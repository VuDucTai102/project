const express = require("express");
const multer = require("multer");
const router = express.Router();
const imageSearchController = require("../controllers/imageSearchController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), imageSearchController.searchByImage);

module.exports = router;
