const server = require('./api/server')

const PORT = process.env.PORT || 5600;


server.get('/', (req, res) =>{
    res.status(200).json({api : "up"})
})


server.listen(PORT , () =>{
    console.log(`Listening on port ${PORT}`)
})