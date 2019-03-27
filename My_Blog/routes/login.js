let express = require('express');
let router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.type('html');
    res.render('login');
});
router.get('/register',function(req,res,next){
    // res.type('html');
    res.render('logon');
})



module.exports = router;
