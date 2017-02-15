// set up ======================================================================
var express = require('express');
var router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  next();
});

// users routes ================================================================

module.exports = router;
