const express = require("express");
const routes = express.Router()
const cors = require("cors")
const tasksInfo = require("./routes/tasksInfo")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(cors())

const PORT = 3000

routes.get('/', (req, res) => { 
    res.status(200).send("WELCOME TO OUR TASK MANAGER APPLICATION")
})

routes.use('/tasks', tasksInfo)

app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server is listening on PORT 3000")
    }
    else {
        console.log("Server is crashing due to some error")
    }
})
