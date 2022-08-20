// elements required for DOM 
const signform = document.querySelector('#signup')
const logform = document.querySelector('#login')
const username = document.querySelector('#name')
const semail = document.querySelector('#email') // signup form email
const spass = document.querySelector('#password') // signup form password
const lemail = document.querySelector('#email') // login form email
const lpass = document.querySelector('#password') // login form password

// make a new user
signform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = username.value
    const email = semail.value
    const password = spass.value
    try {
        await axios.post('/api/v1/blogs', {name, email, password})
    } catch (error) {
        
    }
})

// auth user
logform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = lemail.value
    const password = lpass.value
    try {
        const token = await axios.post('/api/v1/blogs/login', {email, password})
        if (token==="email or password wrong"){
            alert(token)
        }
        module.exports = {token}
        window.location.replace('/dashboard')
    } catch (error) {
        
    }
})


// handle signup and login form
function handlesign(){
    signform.style.display = 'block'
    logform.style.display = 'none'
}
function handlelog(){
    signform.style.display = 'none'
    logform.style.display = 'block'
}