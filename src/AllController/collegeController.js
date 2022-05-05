const collegeModel=require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid=function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}

//------------------PUT API CREATECOLLEGE--------------------------------------------------

const createCollege = async function(req,res){
    try {
        const requestBody=req.body
        if(!isValidRequestBody(requestBody)){
            res.status(400).send({status:false, message:'Invalid request parameters. Please provide College details'})
            return
        }

                //Extract Params
                const {name, fullName, logoLink}  = requestBody; //object destructuring

                //Validation starts
                if(!isValid(name)){
                    res.status(400).send({status:false, message:`College name is required`})
                    return
                }
        
                if(!isValid(fullName)){
                    res.status(400).send({status:false, message: `College fullName is required`})
                    return
                }
        
                if(!isValid(logoLink)){
                    res.status(400).send({status:false, message: `Logolink is required`})
                    return
                }
                //validation ends
                let data= req.body
                const college = await collegeModel.create(data)
                res.status(201).send({status:true, data:college, msg:'College created succefully'})
  
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}

//-------------------------GET API COLLEGE DETAILS---------------------------------------

const  getCollegeDetails= async function (req, res) {
    try {
        const collegeName = req.query.name
        if (!collegeName) return res.status(400).send({ status: false, message: 'College name is required to access data' })
      
        const newCollege = await collegeModel.findOne({ name: collegeName }, { name: 1, fullName: 1, logoLink: 1 });
            if (!newCollege) return res.status(404).send({ status: false, message: `College does not exit` });

        const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false }, { name: 1, email: 1, mobile: 1 });
        if(!interns) return res.status(404).send({ status: false, message: `Interns does not exit`});   
        res.status(200).send({ data: { name: newCollege.name, fullName: newCollege.fullName, logoLink: newCollege.logoLink, interns: interns}})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails
