const user = document.querySelector('.user')
const form = document.querySelector('.edit')
const title = document.querySelector('#title')
const content = document.querySelector('#content')
const deleteblog = document.querySelector('.delete')
const token = require('./logsig')

const id = token.user_id
const userData = async () => {
    try {
        const {userdata, userblogs} = await axios.get(`/api/v1/blogs/${id}`)
        const allblogs = userblogs.map((item) => {
            const {userid: user, title: title, content: content, date, comments} = item
            return `<div class="blog>
                <div class="head">
                <h1>${title}</h1>
                <h3>${user}</h3>
                <h5>${date}</h5>
                <button type="button" onclick="${editblog(item)}"><a href="./edit.html">Edit Blog</a></button>
                </div>
                <div class="body">
                <p>${content}</p>
                ${comments}
                </div>
            </div>`
        }).join('')
        user.innerHTML = `
        <div class="name">
            <h1>${userdata.name}</h1>
            <button class="delete" type="button" onclick="${deleteUser(userdata._id)}">Delete User</button>
        </div>
        <div class="userblogs">
            ${allblogs}
        </div>
        `
    } catch (error) {
        user.innerHTML="no such user"
    }
}
userData()

// delete user
const deleteUser = async (id) => {
    try {
        await axios.delete(`/api/v1/blogs/${id}`)
    } catch (error) {
        
    }
}

//edit blog
const editblog = async (data) => {
    title.value = data.title
    content.value = data.content


form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const etitle = title.value
    const econtent = content.value
    try {
        await axios.patch(`/api/v1/blogs/${data._id}`, {title: etitle, content: econtent})
    } catch (error) {
        
    }
})
deleteblog.addEventListener('click', async(e) => {
    try {
        await axios.delete(`/api/v1/blogs/${data._id}`)
    } catch (error) {
        
    }
})

}