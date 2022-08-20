const router = require('express').Router()

const {
    makeUser,
    getUserData,
    makeBlog,
    makeComment,
    getTrendBlogs,
    editBlog,
   getComments,
    loginUser,
    deleteBlog,
    deleteComment,
    deleteUser
} = require('../controller/blog')

router.route('/').get(getTrendBlogs).post(makeUser)
router.route('/login').post(loginUser)
router.route('/:userid').post(makeBlog).delete(deleteUser).get(getUserData)
router.route('/:userid/:blogid').delete(deleteBlog).patch(editBlog).post(makeComment)
router.route('/:blogid').get(getComments)
router.route('/:commentid').delete(deleteComment)

module.exports = router