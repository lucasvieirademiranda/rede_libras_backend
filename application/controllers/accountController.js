var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

var userService = require('../services/userService');

router.post('/login', function(request, response) {

    var data = {
        user: request.body.user,
        password: request.body.password
    };

    userService.login(data, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        var token = jwt.sign(
            { id: data.id }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION });

        response.status(200)
                .send({
                    token: token
                });

    });

});

router.get('/logout', function(request, response) {

    response.status(200)
            .send({
                token: null
            });

});


module.exports = router;