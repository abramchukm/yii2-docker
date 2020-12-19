const express = require('express');
const app = express();
const {port, host} = require('./configuration');
const {connectDB} = require('./helpers/db');
const User = require('./models/user');

app.get('/test', async function (req,res) {
    User.create({name: "Test_1", age: "30", email:Math.floor(Math.random() * Math.floor(200)) + "test30@test.com", password:"123456789"});
    const users = await User.find();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(200).send(users);
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({_id: id});
        if (!user)
        {
            return res.status(404).send();
        }
        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).send();
    }
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`API service is working on port ${port}!`);
        console.log(`Host is ${host}`);
    });
}

connectDB()
    .on('error', console.error.bind(console, 'connection error:'))
    .on('disconnect', connectDB)
    .once('open', startServer);
