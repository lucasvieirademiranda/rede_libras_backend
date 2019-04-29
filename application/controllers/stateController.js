var express = require('express');

var stateService = require('../services/stateService');

var router = express.Router();

router.get('/dropDownList/:idRegion', function(request, response) {

    var idRegion = request.params.idRegion;

    stateService.dropDownList(idRegion, function(error, data) {

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