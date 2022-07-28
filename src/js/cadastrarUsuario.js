import {
    Api
} from "./Api.js";

const cadastro = document.getElementById('cadastro')
const inputs = document.getElementsByClassName('input')


cadastro.addEventListener('submit', async (event) => {
    event.preventDefault()

    const novoUsuario = {
        username: inputs[0].value,
        email: inputs[1].value,
        avatarUrl: inputs[2].value,
        password: inputs[3].value,
    }

    const response = await Api.createUser(novoUsuario)

    if (response.status !== 'error') {
        alert('Cadastro realizado com sucesso!')

        window.location.href = '/index.html'
    } else if (response.status === 'error' && response.message === 'avatarUrl must be a image url') {
        alert('A foto de perfil deve ser uma url!')
    } else if (response.status === 'error' && response.message === 'duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"') {
        alert('Este email já foi cadastrado, tente outro!')
    }

})
