import axios from 'axios'

interface GetClassesParams {
    subject: string,
    week_day: string,
    time: string
}

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

interface User {
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}

export interface Classe extends User {
    id: number,
    user_id: number,
}

interface CreateConnectionBody {
    user_id: number
}

export interface GetClassesCallback {
    (response: Array<Classe>): void
}

interface PostClassesBody extends User {
    schedule: Array<ScheduleItem>
}

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export function getTotalConnections(callback: (count: number) => void) {
    api.get('/connections/count').then(response => {
        console.log({ response })
        const result = Number(response.data.count) || 0;
        console.log({ result })
        callback(result)
    }).catch(error => {
        alert(`Erro na chamada de busca de total de conexões: ${error}`)
    });
}

export function getClasses(params: GetClassesParams, callback: GetClassesCallback) {
    api.get('/classes', { params: { ...params } }).then(response => {
        const result = response.data as Array<Classe>
        callback(result)
    }).catch(error => {
        alert(`Erro na chamada de busca de classes: ${error}`)
    })
}

export function postClasses(body: PostClassesBody, onSuccess: () => void) {
    api.post('/classes', body).then(response => {
        if (response.status < 400) {
            alert('Classe criada com sucesso')
            onSuccess()
        } else {
            alert('Erro ao criar classe')
        }
    }).catch(error => {
        alert(`Erro na chamada de criação de classe: ${error}`)
    });
}

export function createConnection(body: CreateConnectionBody) {
    api.post('/connections', body).then(response => {
        if (response.status < 400) {
            alert('Conexão criada com sucesso')
        } else {
            alert('Erro ao criar conexão')
        }
    }).catch(error => {
        alert(`Erro na chamada de criação de conexão: ${error}`)
    })
}