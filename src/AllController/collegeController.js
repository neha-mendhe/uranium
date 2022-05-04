const CollegeModel=require('../models/collegeModel')


const isValid=function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}

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
                const college = await CollegeModel.create(data)
                res.status(201).send({status:true, data:college, msg:'College created succefully'})
  
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}


module.exports.createCollege=createCollege