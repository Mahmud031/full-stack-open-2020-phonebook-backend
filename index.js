const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

// for ex3.8 new morgan token
morgan.token('Post-message', (req,res) => {
    console.log(req.body)
    return (JSON.stringify(req.body))
})

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :Post-message'))

let persons = [
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Martin Fowler",
        number: "39-44-5324524",
        id: 3
    }, 
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 4
    }
]

// front page
app.get('/', (req,res) => {
    res.send("<h1>Hello from phonebook</h1>")
})

// get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// info page
app.get('/info', (req,res) => {
    const length = persons.length
    const date = new Date()
    res.send(`<p>Phonebook has info for ${length} persons</p>
                <p>${date}</p>`)
})

// get a person by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person)
        res.json(person)
    else
        res.status(404).end()
})

// delete by id
app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

// generate id
const generateID = () => {
    return(Math.floor(Math.random()*1000000))
}

// add person in the phonebook
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.name) {
        res.status(400).json({
            error: 'Undefined name' 
        })
    }
    else if (!body.number) {
        res.status(400).json({
            "error": 'Undefined number' 
        })
    }
    // find duplicate name
    const person = persons.find(person => person.name === body.name)
    
    if(person) {
        res.status(400).json({
            error: 'Person already added' 
        })
    }
    else {
        const newPerson = {
            name: body.name,
            number: body.number,
            id: generateID()
        }
        persons = persons.concat(newPerson)
        res.json(persons)
    }
})

const PORT = proxess.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Starting phonebook from port ${PORT}`)
})