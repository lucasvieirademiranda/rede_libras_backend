var express = require('express');
var router = express.Router();

router.use('/create', function(request, response, next) {

    request.checkBody('name', 'Você deve informar um nome!').notEmpty();
    
    request.checkBody('mail', 'Você deve informar um e-mail!').notEmpty();
    request.checkBody('mail', 'Você deve informar um e-mail válido!').isEmail();

    request.checkBody('user', 'Você deve informar um usuário!').notEmpty();

    request.checkBody('password', 'Você deve informar uma senha!').notEmpty();

    request.checkBody('confirmation', 'Você deve informar a confirmação da senha!').notEmpty();
    request.checkBody('confirmation', 'A confirmação da senha está incorreta!').equals(request.body.password);

    var errors = request.validationErrors();

    if (errors)
    {
        response.status(400)
                .send(errors);

        return;
    }

    next();

});

router.use('/edit', function(request, response, next) {

    request.checkBody('name', 'Você deve informar um nome!').notEmpty();
    
    request.checkBody('mail', 'Você deve informar um e-mail!').notEmpty();
    request.checkBody('mail', 'Você deve informar um e-mail válido!').isEmail();

    request.checkBody('user', 'Você deve informar um usuário!').notEmpty();

    var errors = request.validationErrors();

    if (errors)
    {
        response.status(400)
                .send(errors);

        return;
    }

    next();

});

module.exports = router;