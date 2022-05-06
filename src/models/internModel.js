const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//------------Intern Schema---------------------------

const internSchema= new mongoose.Schema({
    name:{
        type:String,
        required:'Intern name is required',
        trim:true
    },
    email:{
        type:String,
        required:'Email is required',
        trim:true,
        unique:true,
        validate:{
            validator: function(email){
                return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
            },message:'Please fill a valid email address', isAsync:false
        }
    },
    mobile:{
       
        type:Number,
        required:'Mobile no is required',
        unique:true,
        alidate: {
            validator:
                function (m) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(m) },
            message: "Please Enter 10 digit Mobile Number",
        },
    },
    collegeId:{
        type:ObjectId,
        ref:'College',
        required:'CollegeId is required'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

})

module.exports =mongoose.model('Intern',internSchema)