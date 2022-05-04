const express = require('express');
const router = express.Router();
const{createIntern} = require('../AllController/internController');

 const {createCollege,collegeDetails} = require('../AllController/collegeController');

//*!---APIs To Perform CURD Operation--------

router.post('/functionup/colleges',createCollege)

router.post('/functionup/interns',createIntern)


// router.get('/functionup/collegeDetails', collegeDetails);

module.exports=router