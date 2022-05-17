const ul = document.getElementById('publicações')



class Template {
    static templatePosts(post, id) {

        for (let i = 0; i < post.length; i++) {

            const li = document.createElement('li')
            const img = document.createElement('img')
            const div1 = document.createElement('div')
            const h3 = document.createElement('h3')
            const p = document.createElement('p')
            const div2 = document.createElement('div')
            const data = document.createElement('p')
            ul.appendChild(li)
            li.appendChild(img)
            li.appendChild(div1)
            div1.appendChild(h3)
            div1.appendChild(p)
            li.appendChild(div2)


            if (post[i].owner.id === id) {
                const edit = document.createElement('button')
                const delet = document.createElement('button')
                div2.appendChild(edit)
                div2.appendChild(delet)
                div2.appendChild(data)

                edit.className = "Editar"
                delet.className = "Apagar"
                data.className = "data"

                p.className = 'textoEditavel'


                edit.innerText = "Editar"
                delet.innerText = "Apagar"
                data.innerText = post[i].createdAt
            } else {
                div2.appendChild(data)
                data.className = "data"
                data.innerText = post[i].createdAt
                p.className = "texto"
            }



            img.className = "imagensUsuarios"
            div1.className = "infos"
            h3.className = "nomeUsuário"
            div2.className = "opçõesUsuário"

            img.src = post[i].owner.avatarUrl
            h3.innerText = post[i].owner.username
            p.innerText = post[i].post
        }


    }
}

export {
    Template
}