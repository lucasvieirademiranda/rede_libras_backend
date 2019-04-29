var express = require('express');
var router = express.Router();

var userService = require('../services/userService');

router.get('/find/:id', function(request, response) {

    var id = parseInt(request.params.id, 10);

    userService.find(id, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

router.get('/list', function(request, response) {

    userService.list(function(error, data) {

        if(error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }
        
        response.status(200)
                .send(data);

    });

});

router.post('/create', function(request, response) {

    var data = {
        name: request.body.name,
        user: request.body.user,
        password: request.body.password,
        mail: request.body.mail
    };

    userService.create(data, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

router.patch('/edit', function(request, response) {

    var data = {
        id: request.body.id,
        name: request.body.name,
        user: request.body.user,
        mail: request.body.mail
    };

    userService.edit(data, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

router.delete('/remove/:id', function(request, response) {

    var id = parseInt(request.params.id, 10);

    userService.remove(id, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

module.exports = router;