const app = require('./app') //import app
const http = require('http') //sets up server connection
const config = require('./utils/config') //access to environment variables

/**** CREATE AND CONNECT TO SERVER ****/
const server = http.createServer(app)
const PORT = config.PORT
server.listen(PORT, () => console.log(`Server running on port ${config.PORT}`))