import {
    Api
} from "./Api.js";
import {
    Template
} from "./template.js";

const imagemUser = document.getElementById('imagemdePerfil')
const nomeUser = document.getElementById('nomeUsuario')
const bntPost = document.getElementById('bntPost')
const post = document.getElementById('post')
const edit = document.getElementsByClassName('Editar')
const delet = document.getElementsByClassName('Apagar')
const nextPag = document.getElementById('nextPag')
const numPages = document.getElementById('numPag')
const ul = document.getElementById('publicações')
const main = document.getElementById('mainBlog')
const btnLogout = document.getElementById('btnLogout')
const postEdit = document.getElementsByClassName('postEdit')
const textoEditavel = document.getElementsByClassName('textoEditavel')

const tokenUser = localStorage.getItem('token')
const idUser = localStorage.getItem('userId')

let cont = 0
let pagNum = 1

Api.token = tokenUser

const userInfos = await Api.user(idUser)

const postsUser = []
nomeUser.innerText = userInfos.username
imagemUser.src = userInfos.avatarUrl

const pagesAndPosts = await Api.posts(pagNum)
numPages.innerText = `Página${pagNum}`

Template.templatePosts(pagesAndPosts.data, userInfos.id)

nextPag.addEventListener('click', async () => {
    ul.innerHTML = ''
    pagNum += 1
    const pagesAndPosts1 = await Api.posts(pagNum)
    numPages.innerText = `Página${pagNum}`

    Template.templatePosts(pagesAndPosts1.data, userInfos.id)
    for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener('click', () => {


            if (cont === 0) {
                cont += 1

                edit[i]
                textoEditavel[i].innerHTML = `<textarea class="postEdit">${textoEditavel[i].innerText}</textarea>`

                edit[i].innerText = 'Confirmar edição'

            } else if (cont === 1 && edit[i].innerText === 'Confirmar edição' & postEdit[0].value === '') {
                alert('Digite algo para editar o post')
            } else if (cont === 1 && edit[i].innerText === 'Confirmar edição') {
                let editado = postEdit[0].value
                edit[i].innerText = 'Editar'


                Api.editPost({
                    newContent: `${postEdit[0].value}`
                }, postsUser[i].id)
                textoEditavel[i].innerHTML = ''
                textoEditavel[i].innerText = editado
                cont = 0

            }
        })
    }
    for (let i = 0; i < delet.length; i++) {
        delet[i].addEventListener('click', () => {

            Api.deletPost(postsUser[i].id)
            alert('Post deletado !')
            location.reload()

        })
    }
    if (pagNum === 2) {

        const button = document.createElement('button')
        main.appendChild(button)
        button.id = 'previousPag'
        button.innerText = ' <= Página Anterior'

        button.addEventListener('click', async () => {
            if (pagNum >= 2) {
                ul.innerHTML = ''
                pagNum -= 1
                const pagesAndPosts2 = await Api.posts(pagNum)
                numPages.innerText = `Página${pagNum}`

                Template.templatePosts(pagesAndPosts2.data, userInfos.id)
                for (let i = 0; i < edit.length; i++) {
                    edit[i].addEventListener('click', () => {
                        if (cont === 0) {
                            cont += 1

                            edit[i]
                            textoEditavel[i].innerHTML = `<textarea class="postEdit">${textoEditavel[i].innerText}</textarea>`

                            edit[i].innerText = 'Confirmar edição'


                        } else if (cont === 1 && edit[i].innerText === 'Confirmar edição' & postEdit[0].value === '') {
                            alert('Digite algo para editar o post')
                        } else if (cont === 1 && edit[i].innerText === 'Confirmar edição') {
                            let editado = postEdit[0].value
                            edit[i].innerText = 'Editar'


                            Api.editPost({
                                newContent: `${postEdit[0].value}`
                            }, postsUser[i].id)
                            textoEditavel[i].innerHTML = ''
                            textoEditavel[i].innerText = editado
                            cont = 0
                        }

                    })
                }
                for (let i = 0; i < delet.length; i++) {
                    delet[i].addEventListener('click', () => {

                        Api.deletPost(postsUser[i].id)
                        alert('Post deletado !')
                        location.reload()

                    })
                }
            }
            if (pagNum === 1) {
                main.removeChild(button)
            }

        })

    }

})

for (let i = 0; i < pagesAndPosts.data.length; i++) {

    if (pagesAndPosts.data[i].owner.id === idUser) {
        postsUser.push(pagesAndPosts.data[i])
    }

}

pagesAndPosts.data
bntPost.addEventListener('click', () => {

    if (post.value !== '') {

        Api.createPost({
            content: post.value
        })
        alert('Post feito com sucesso!')
        location.reload()
    } else if (post.value === '') {
        alert('Escreva algo para publicar!')
    }

})

for (let i = 0; i < edit.length; i++) {

    edit[i].addEventListener('click', () => {

        if (cont === 0) {
            cont += 1

            edit[i]
            textoEditavel[i].innerHTML = `<textarea class="postEdit">${textoEditavel[i].innerText}</textarea>`

            edit[i].innerText = 'Confirmar edição'


        } else if (cont === 1 && edit[i].innerText === 'Confirmar edição' & postEdit[0].value === '') {
            alert('Digite algo para editar o post')
        } else if (cont === 1 && edit[i].innerText === 'Confirmar edição') {
            let editado = postEdit[0].value
            edit[i].innerText = 'Editar'


            Api.editPost({
                newContent: `${postEdit[0].value}`
            }, postsUser[i].id)
            textoEditavel[i].innerHTML = ''
            textoEditavel[i].innerText = editado
            cont = 0

        }

    })
}
for (let i = 0; i < delet.length; i++) {
    delet[i].addEventListener('click', () => {

        Api.deletPost(postsUser[i].id)
        alert('Post deletado !')
        location.reload()

    })
}

btnLogout.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = '../../index.html'
})
