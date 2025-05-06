const express = require("express");
const app = express();
app.use(express.json());

app.post('/api/user', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Name is required' });
    }
    res.status(201).json({ message: `User ${name} created`});
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
})

module.exports =app;