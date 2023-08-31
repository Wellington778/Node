const app= require('./server')

const port = 8080

app.listen(port, (req,res) => {
    console.log(`Listening on ${port} port...`)
})