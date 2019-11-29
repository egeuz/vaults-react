import axios from 'axios'
const url = "/items"

const getAll = () => axios.get(url)
const get = (id) => axios.get(`${url}/${id}`)

export default {getAll, get}