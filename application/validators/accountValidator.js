var express = require('express');
var router = express.Router();

router.use('/login', function(request, response, next) {

    request.checkBody('user', 'Você deve informar um usuário!').notEmpty();
    request.checkBody('user', 'O usuário deve possuir no máximo 250 caracteres!').isLength({ min: 0, max: 250 });

    request.checkBody('password', 'Você deve informar uma senha!').notEmpty();
    request.checkBody('password', 'A senha deve possuir no máximo 250 caracteres!').isLength({ min: 0, max: 250 });
    
    var errors = request.validationErrors();

    if (errors)
    {
        response.status(422)
                .send(errors);

        return;
    }

    next();

});

module.exports = router;