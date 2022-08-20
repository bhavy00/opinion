// elements required for DOM 
const trendblog = document.querySelector('.trendblog')
const dashboard = document.querySelector('.id')
const signlog = document.querySelector('.signlog')
const user = document.querySelector('.user')

// getting trending blogs 
const showTrendBlog = async () => {
    try {
        const {data: {blogs}} = await axios.get('/api/v1/blogs')
        const allblogs = blogs.map((item) => {
            const {blogid: _id, userid: user, title: title, content: content} = item
            const comments = await axios.get(`/api/v1/blogs/${blogid}`)
            const allcomments = comments.map((item) => {
                
            })
            return `<div class="blog">
                <h1>${title}</h1>
                <h3> ${user} </h3>
                <p> ${content} </p>
            </div>`
        }).join('')
        trendblog.innerHTML=allblogs
    } catch (error) {
        trendblog.innerHTML = "<h5>No blog available</h5>"
    }
}

showTrendBlog()
