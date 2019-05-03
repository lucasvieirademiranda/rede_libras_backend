var express = require('express');
var router = express.Router();

router.use('/create', function(request, response, next) {

    request.checkBody('sign', 'Você deve informar o sinal!').notEmpty();
    request.checkBody('sign', 'O sinal deve possuir no máximo 250 caracteres!').isLength({ min: 0, max: 250 });

    request.checkBody('example', 'Você deve informar um exemplo de utilização do sinal!').notEmpty();
    request.checkBody('example', 'O exemplo de utilização deve possuir no máximo 4000 caracteres!').isLength({ min: 0, max: 4000 });

    request.checkBody('isGeneral', 'Você deve informar se o sinal é nacional ou regional!').notEmpty();

    if (request.body.isGeneral == "0")
    {
        request.checkBody('region', 'Você deve informar uma região!').notEmpty();

        request.checkBody('states', 'Você deve informar uma ou mais regiões!').notEmpty();
    }

    request.checkBody('categories', 'Você deve informar uma ou mais categorias!').notEmpty();

    request.checkBody("hand", "Você deve informar uma configuração de mão!").notEmpty();

    var errors = !request.validationErrors() ? [] : request.validationErrors();

    if (!request.files)
    {
        errors.push({
            location: 'body',
            msg: 'Você deve informar um arquivo!',
            param: 'file',
            value: '',
        });
    }

    if (errors.length > 0)
    {
        response.status(400)
                .send(errors);

        return;
    }

    next();

});

router.use('/edit', function(request, response, next) {

    request.checkBody('sign', 'Você deve informar o sinal!').notEmpty();
    request.checkBody('sign', 'O sinal deve possuir no máximo 250 caracteres!').isLength({ min: 0, max: 250 });

    request.checkBody('example', 'Você deve informar um exemplo de utilização do sinal!').notEmpty();
    request.checkBody('example', 'O exemplo de utilização deve possuir no máximo 4000 caracteres!').isLength({ min: 0, max: 4000 });

    request.checkBody('isGeneral', 'Você deve informar se o sinal é nacional ou regional!').notEmpty();

    if (request.body.isGeneral == "0")
    {
        request.checkBody('region', 'Você deve informar uma região!').notEmpty();

        request.checkBody('states', 'Você deve informar uma ou mais regiões!').notEmpty();
    }

    request.checkBody('categories', 'Você deve informar uma ou mais categorias!').notEmpty();

    request.checkBody("hand", "Você deve informar uma configuração de mão!").notEmpty();

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