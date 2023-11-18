const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require('./expressError');

// Middleware to parse JSON body
app.use(express.json());

app.post('/', function(req, res, next) {

    if (!req.body.developers || !Array.isArray(req.body.developers)) {
        return next(new ExpressError("sigh", 400));
    }

    Promise.all(req.body.developers.map(d => 
        axios.get(`https://api.github.com/users/${d}`).then(response => response.data)
    ))
    .then(results => {
        let out = results.map(r => ({ name: r.name, bio: r.bio }));
        res.send(JSON.stringify(out));
    })
    .catch(err => {
        next(err);
    });
});

app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
});
