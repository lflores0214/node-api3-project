// code away!
const server = require('./server')
const port = process.env.PORT || 4100

server.listen(port, () => {
    console.log(`\n * server running on http://localhost:${port} * \n`)
})