var express = require('express')

var records = express()

records.use(express.json());


var data = require('./employees.json')


// This will only display if the Id entered is not valid or can't be found
records.get('/Employees', (req, res) => {
    if (!data) {
        res.status(404).send('could not find information')
    }
    res.send(data)
})
// This is the Http Get method
records.get('/Employees/:id', (req, res) => {

    const findEmployee = data.Employees.find(function (employee) {

        return parseInt(req.params.id) === employee.id
    })

    if (!findEmployee) {
        res.status(404).send('could not find information')
    }
    res.send(findEmployee)
})
// // records.post('/Employees', (req, res) => {
// //     if (!data) {
// //         res.status(404).send('could not find information')
// //     }
// //     res.send(data)
// })

// THIS IS THE HARD EXERCISE 

// This is the Post http method use this to check on postman http://localhost:4000/Employees use this to create a new employee data
records.post('/Employees', (req, res) => {

    const createEmployee = {
        id: data.Employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department,

    };
    data.Employees.push(createEmployee);
    res.send(createEmployee);



})

// This is the http Put method use this on POSTMAN http://localhost:4000/Employees/1 to update the information of an  employee
records.put('/Employees/:id', (req, res) => {
    // const findEmployee = data.Employees.find(function (employee) {

    //     return parseInt(req.params.id) === employee.id

    // })
    const ind = data.Employees.findIndex((employee) => {
        return parseInt(req.params.id) === employee.id
    })

    if (ind < 0) {
        res.status(404).send('ID not found')
        return
    }
    data.Employees[ind].name = req.body.name;
    data.Employees[ind].salary = req.body.salary;
    data.Employees[ind].department = req.body.department;
    // data.Employees[ind].name = req.body.name;
    // data.Employees[ind].name = req.body.name;
    res.send(data.Employees[ind]);
})

// This the http Method "DELETE" http://localhost:4000/Employees/10 i used this to delete an employee's data.
records.delete('/Employees/:id', (req, res) => {
    const ind = data.Employees.findIndex((employee) => {
        return parseInt(req.params.id) === employee.id
    })

    if (ind < 0) {
        res.status(404).send('ID not found')
        return
    }
    const check = data.Employees.indexOf(ind);
    data.Employees.splice(check, 1);
    res.json(data.Employees)

})

records.listen(4000)
