import {
    Api
} from "./Api.js";

const inputs = document.getElementsByClassName('input')
const login = document.getElementById('login')




login.addEventListener('submit', async (event) => {
    event.preventDefault()

    const usuarioInfos = {
        email: inputs[0].value,
        password: inputs[1].value
    }

    await Api.login(usuarioInfos)

    const id = await Api.login(usuarioInfos)



    if (id.status !== 'error') {
        window.location.href = '../../src/pages/blog.html'
        localStorage.setItem('token', id.token)
        localStorage.setItem('userId', id.userId)

    } else if (id.status === 'error' && id.message === 'Login failed, check email or password') {
        alert('O login falhou, confira o email ou a senha')
    }
})
