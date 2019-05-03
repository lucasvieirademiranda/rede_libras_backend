var express = require('express');

var handService = require('../services/handService');
var fileService = require('../services/fileService');

var router = express.Router();

router.get('/find/:id', function(request, response) {

    var id = parseInt(request.params.id, 10);

    handService.find(id, function(error, data) {

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

router.get('/dropDownList/:name?', function(request, response) {

    var name = request.params.name;

    handService.dropDownList(name, function(error, data) {

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

    handService.list(function(error, data) {

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

    var file = request.files.file;

    var hand = {
        name: request.body.name,
        description: request.body.description
    };

    fileService.upload(file, process.env.HAND_DIR, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        hand.image_name = file.name;
        hand.image_path = data.path;

        handService.create(hand, function(error, data) {

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

router.patch('/edit', function(request, response) {

    var file = request.files ? request.files.file : null;

    var hand = {
        id: parseInt(request.body.id, 10),
        name: request.body.name,
        description: request.body.description,
        image_name: request.body.image_name,
        image_path: request.body.image_path
    };

    if (file)
    {
        fileService.delete(hand.image_path, function(error, data) {

            if (error)
            {
                response.status(error.code)
                        .send(error);
    
                return;
            }

            fileService.upload(file, process.env.HAND_DIR, function(error, data) {

                if (error)
                {
                    response.status(error.code)
                            .send(error);
        
                    return;
                }
        
                hand.image_name = file.name;
                hand.image_path = data.path;
        
                handService.edit(hand, function(error, data) {
        
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
    }
    else
    {
        handService.edit(hand, function(error, data) {
        
            if (error)
            {
                response.status(error.code)
                        .send(error);
    
                return;
            }
    
            response.status(200)
                    .send(data);
    
        });
    }

});

router.delete('/remove/:id', function(request, response) {

    var id = parseInt(request.params.id, 10);

    handService.find(id, function(error, data) {
        
        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        fileService.delete(data.image_path, function(error, data) {

            if (error)
            {
                response.status(error.code)
                        .send(error);
    
                return;
            }

            handService.remove(id, function(error, data) {

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

});

router.get('/download/:id', function(request, response) {

    var id = parseInt(request.params.id, 10);

    handService.find(id, function(error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .download(data.image_path, data.image_name);

    });

});

module.exports = router;