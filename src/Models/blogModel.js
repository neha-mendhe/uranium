const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required:'Blog title is required',
        trim:true
    },
    body: {
        type: String,
        required:'Blog body is required',
        trim:true
    },
    authorId: {
        type: ObjectId,
        ref: 'Author',
        required: 'Blog Author is required'
    },
    tags: [{type:String,trim:true}],
    category: {
        type: String,
        trim:true,
        required: 'Blog category is required',
    },
    subcategory: [{type:String,trim:true}],
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        default: null
    },
    deletedAt:
    {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type:  Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('BlogsDB', BlogsSchema)
