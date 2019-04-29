var express = require('express');

var categoryService = require('../services/categoryService');

var router = express.Router();

router.get('/find/:id', function(request, response) {

    var id = parseInt(request.params.id, 10);

    categoryService.find(id, function(error, data) {

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

router.get('/dropDownList', function(request, response) {

    categoryService.dropDownList(function(error, data) {

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

    categoryService.list(function(error, data) {

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

    var category = {
        name: request.body.name,
        description: request.body.description
    };

    categoryService.create(category, function(error, data) {

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

    var category = {
        id: parseInt(request.body.id, 10),
        name: request.body.name,
        description: request.body.description
    };

    categoryService.edit(category, function(error, data) {
        
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

    categoryService.find(id, function(error, data) {
        
        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        categoryService.remove(id, function(error, data) {

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

});

module.exports = router;