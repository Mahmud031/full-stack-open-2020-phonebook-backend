const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Insert password")
    process.exit(1)
}

const password = process.argv[2]

console.log(password)

const url = `mongodb+srv://fullstack2020:${password}@full-stack-2020-phonebook-backend-azn80.mongodb.net/Persons?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema ( {
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// get person info

if (process.argv.length > 3) {

    // add new person

    const personName = process.argv[3]
    const personNum= process.argv[4]

    const newPerson = new Person ({
        name : personName,
        number: personNum,
    })
    
    newPerson.save().then ( response => {
        console.log(`added ${personName} ${personNum} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    console.log("phonebook:")
    Person.find({}).then(persons => {
        persons.forEach( person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

