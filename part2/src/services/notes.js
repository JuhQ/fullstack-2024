import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

const getResponseData = (response) => response.data

const getAll = () =>
    axios
        .get(baseUrl)
        .then(getResponseData)

const create = (note) =>
    axios
        .post(baseUrl, note)
        .then(getResponseData)

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
    delete: deleteNote
}