const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comments: {
        type: Number,
        default: 0,
    }
})
const Blog = mongoose.model('Blog', BlogSchema)

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema)

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: String,
    },
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
    Blog,
    User,
    Comment,
}