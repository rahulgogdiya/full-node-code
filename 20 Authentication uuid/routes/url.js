const express = require("express")
const {handleGenerateNewIDURL,handlegetAnalitys} = require("../controllers/url")

const router = express.Router()

router.post('/',handleGenerateNewIDURL)
router.get('/analytics/:shortId',handlegetAnalitys)

module.exports = router