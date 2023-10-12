const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const user = [
    { id: 1, name: 'Shakib', email: 'shakib@gmail.com' },
    { id: 2, name: 'Pmirkhan', email: 'dmirkhan@gmail.com' },
    { id: 3, name: 'Dalmankhan', email: 'salmankhan@gmail.com' },
    { id: 4, name: 'kbulkhan', email: 'fbulkhan@gmail.com' }
]

app.get('/', (req, res) => {
    res.send('User Management Server Running')
})

app.get('/user', (req, res) => {
    res.send(user)
})

app.listen(port, () => {
    console.log(`Server is running on PORT : ${port}`)
})