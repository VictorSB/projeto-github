const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do Perfil" />
                            <div class="data"
                                <h1>${user.name ?? 'Não possue nome cadastrado 😢'}</h1>
                                <p>${user.bio ?? 'Não possue bio cadastrada 😢'}</p>
                                <p> 👤 Seguidores: ${user.followers ?? 'Nada de seguidores 😥'}
                                <p> 👥 Seguidores: ${user.following ?? 'Não segue ninguém 😥'}
                            </div>
                        </div>`
        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}    "target="_blank">${repo.name}
            <div class="info-repos">
                <div class="info-item">👨‍💻 ${repo.forks}
                </div>
                <div class="info-item">⭐ ${repo.stargazers_count}
                </div>
                <div class="info-item">👀 ${repo.watchers}
                </div>
                <div class="info-item">💻 ${repo.language ?? 'linguagem não definida'}
                </div>
            </div>
        </a></li>`);

        let validTypesOfEvents = user.events.filter((item) => {
            return item.type === 'PushEvent' || item.type === 'CreateEvent'
        })

        let eventItens = ''
        validTypesOfEvents.forEach((e) => {
            let repositoryName = e.repo.name

            if(e.payload.commits){
                let commits = e.payload.commits[0].message
                eventItens += `<li>
                                    <p> <span>${ repositoryName }</span> - ${ commits } </p><br>
                               </li>`
            }else{
                eventItens += `<li>
                                    <p> <span>${ repositoryName }</span></p><br>
                               </li>`
            }
        })

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${ repositoriesItens }</ul>
                                           </div>`
        }


        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2> Eventos nos Repositórios </h2>
                                                <ul class="events"> ${ eventItens }</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }