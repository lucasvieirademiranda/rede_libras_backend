var categoryRepository = require('../repositories/categoryRepository');
var async = require('async');

exports.find = (id, done) => {

    categoryRepository.find(id, done);

};

exports.list = (done) => {

    categoryRepository.list(done);

};

exports.create = (data, done) => {

    async.waterfall([

        function(done) {

            categoryRepository.findByName(data.name, done);

        },
        function(category, done)
        {
            if (category)
            {
                done({
                    code: 422,
                    message: "A categoria informada já existe na base de dados!!"
                }, null);

                return;
            }

            categoryRepository.insert(data, done);
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

            categoryRepository.find(data.id, done);

        },
        function(category, done)
        {
            if (category && category.id != data.id)
            {
                done({
                    code: 422,
                    message: "O sinal informado já existe na base de dados!!"
                }, null);

                return;
            }

            categoryRepository.update(data, done);
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

    categoryRepository.delete(id, done);

};

exports.dropDownList = (done) => {

    categoryRepository.dropDownList(done);

};