import axios from 'axios'
const url = "/items"

const getAll = () => axios.get(url)

export default {getAll}