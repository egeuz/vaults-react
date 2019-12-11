import axios from 'axios'
const url = "/items"

const getAll = () => axios.get(url)
const put = (id, data) => axios.put(`${id}`, data)
const get = (id) => axios.get(`${url}/${id}`)

export default {getAll, put, get}