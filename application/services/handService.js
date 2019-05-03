var handRepository = require('../repositories/handRepository');
var async = require('async');

exports.find = (id, done) => {

    handRepository.find(id, done);

};

exports.list = (done) => {

    handRepository.list(done);

};

exports.create = (data, done) => {

    async.waterfall([

        function(done) {

            handRepository.findByName(data.name, done);

        },
        function(hand, done)
        {
            if (hand)
            {
                done({
                    code: 422,
                    message: "A configuração de mão informada já existe na base de dados!!"
                }, null);

                return;
            }

            handRepository.insert(data, done);
        }

    ], function(error, result) {

        if (error)
        {
            done(error, null);
            return;
        }

        done(null, result);

    });

};

exports.edit = (data, done) => {

    async.waterfall([

        function(done) {

            handRepository.find(data.id, done);

        },
        function(hand, done)
        {
            if (hand && hand.id != data.id)
            {
                done({
                    code: 422,
                    message: "O sinal informado já existe na base de dados!!"
                }, null);

                return;
            }

            handRepository.update(data, done);
        }

    ], function(error, result) {

        if (error)
        {
            done(error, null);
            return;
        }

        done(null, result);

    });

};

exports.remove = (id, done) => {

    handRepository.delete(id, done);

};

exports.dropDownList = (name, done) => {

    handRepository.dropDownList(name, done);

};