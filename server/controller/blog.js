// models
const {
    Blog,
    User,
    Comment,
} = require('../model/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// USER APIs 
const makeUser = async (req, res) => {
    try {
        const {name, email, password: plainTextPassword } = req.body
        const password = bcrypt.hash(plainTextPassword)
        const user = await User.create({name, email, password})
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({error})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password: plainTextPassword} = req.body
        const user = await User.findOne({email: email})
        if (!user){
            return res.status(500).json({msg: "email or password wrong"})
        } 
        if (bcrypt.compare(plainTextPassword, user.password)){
            const token = jwt.sign({
                username: user.name,
                user_id: user._id
            }, JWT_SECRET)
            return res.status(200).json({msg: token})
        }
        return res.status(500).json({msg: "email or password wrong"})
    } catch (error) {
        return res.status(500).json({msg: "something broke"})
    }
}

const getUserData = async (req, res) => {
    try {
        const {userid} = req.params
        const user = await User.findOne({_id: userid})
        const blogs = await Blog.find({user: userid})
        
        if (!user){
            return res.status(404).json({msg: `No user with id ${userid}`})
        }
        res.status(200).json({userdata: user, userblogs: blogs})
    } catch (error) {
        res.status(500).json({error})
    }
}
const deleteUser = async (req, res) => {
    try {
        const {userid} = req.params
        const user = await User.findOneAndDelete({_id: userid})
        if (!user){
            return res.status(404).json({msg: `No user with id ${userid}`})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

// BLOGS APIs
const makeBlog = async (req, res) => {
    try {
        const {userid} = req.params
        const blog = await Blog.create({user: userid, title: req.body.title, content: req.body.content})
        res.status(201).json(blog)
    } catch (error) {
        res.status(500).json({error})
    }
}

const getTrendBlogs = async (req, res) => {
    res.status(200).json({mas: "sd"})
}
const editBlog = async (req, res) => {
    try {
        const {blogid} = req.body
        const blog = await Blog.findOneAndUpdate({_id: blogid}, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json(blog)
    } catch (error) {
        res.status(500).json({error})
    }
}
const deleteBlog = async (req, res) => {
    try {
        const {blogid} = req.body
        const blog = await Blog.findOneAndDelete({_id: blogid})
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({error})
    }
}

// COMMENT APIs
const getComments = async (req, res) => {
    try {
        const {blogid} = req.params
        const comments = await Comment.find({blog: blogid})
        return comments
    } catch (error) {
        
    }
}
const makeComment = async (req, res) => {
    try {
        const {blogid} = req.params
        const {userid} = req.params
        const username = await User.findOne({_id: userid}).name
        const comment = await Comment.create({blog: blogid, content: req.body, name:username, user: userid})
        res.status(201).json({msg: comment})
    } catch (error) {
        
    }
}
const deleteComment = async (req, res) => {
    try {
        await Comment.findOneAndDelete({_id: req.params.commentid})
    } catch (error) {
        
    }
}

module.exports = {
    makeUser,
    getUserData,
    makeBlog,
    makeComment,
    getTrendBlogs,
    editBlog,
    getComments,
    loginUser,
    deleteUser,
    deleteBlog,
    deleteComment
}