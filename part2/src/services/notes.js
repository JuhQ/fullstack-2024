import axios from 'axios'

const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
    console.log("token asetetaan", newToken)
    token = `Bearer ${newToken}`
}


const getResponseData = (response) => response.data

const getAll = () =>
    axios
        .get(baseUrl)
        .then(getResponseData)

const create = async (note) => {
    const config = {
        headers: { Authorization: token }
    }

    return axios
        .post(baseUrl, note, config)
        .then(getResponseData)
}

const update = (id, note) =>
    axios.put(`${baseUrl}/${id}`, note)
        .then(getResponseData)

const deleteNote = (id) =>
    axios
        .delete(`${baseUrl}/${id}`)
        .then(getResponseData)

export default {
    getAll,
    create,
    update,
    delete: deleteNote,
    setToken
}