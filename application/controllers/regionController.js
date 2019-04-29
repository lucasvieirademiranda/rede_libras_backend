var express = require('express');

var regionService = require('../services/regionService');

var router = express.Router();

router.get('/dropDownList', function(request, response) {

    regionService.dropDownList(function(error, data) {

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