var signRepository = require('../repositories/signRepository');
var signCategoryRepository = require('../repositories/signCategoryRepository');
var signStateRepository = require('../repositories/signStateRepository');

var async = require('async');

exports.searchBySign = (sign, done) => {

    signRepository.searchBySign(sign, done);

};

exports.searchByCategory = (category, done) => {

    signRepository.searchByCategory(category, done);

};

exports.searchByImage = (done) => {

    signRepository.searchByImage(done);

};

exports.find = (id, done) => {

    signRepository.find(id, done);

};

exports.list = (done) => {

    signRepository.list(done);

};

exports.create = (data, done) => {

    async.waterfall([

        function(done) {

            signRepository.findByName(data.sign, done);

        },
        function(sign, done)
        {
            if (sign)
            {
                done({
                    code: 422,
                    message: "O sinal informado já existe na base de dados!!"
                }, null);

                return;
            }

            signRepository.insert(data, done);
        },
        function (sign, done)
        {

            if (data.states.length == 0)
            {
                done(null, sign);
                return;
            }

            signStateRepository.insertAll({
                idSign: sign.id,
                states: data.states
            }, () => done(null, sign));

        },
        function (sign, done)
        {

            signCategoryRepository.insertAll({ 
                idSign: sign.id,
                categories: data.categories
            }, () => { done(null, sign); });

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

            signRepository.findByName(data.sign, done);

        },
        function(sign, done)
        {
            if (sign && sign.id != data.id)
            {
                done({
                    code: 422,
                    message: "O sinal informado já existe na base de dados!!"
                }, null);

                return;
            }

            signRepository.update(data, done);
        },
        function (sign, done)
        {
            signStateRepository.deleteAll(sign.id, () => { done(null, sign); });
        },
        function (sign, done)
        {
            if (data.states.length == 0)
            {
                done(null, sign);
                return;
            }

            signStateRepository.insertAll({
                idSign: sign.id,
                states: data.states
            }, () => { done(null, sign); });
        },
        function(sign, done)
        {
            signCategoryRepository.deleteAll(sign.id, () => { done(null, sign); });
        },
        function(sign, done)
        {
            signCategoryRepository.insertAll({
                idSign: sign.id,
                categories: data.categories
            }, () => { done(null, sign); });
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

    async.waterfall([
        function(done)
        {
            signStateRepository.deleteAll(id, done);
        },
        function (data, done)
        {
            signCategoryRepository.deleteAll(id, done);
        },
        function (data, done)
        {
            signRepository.delete(id, done);
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

exports.addLike = (id, done) => {

    signRepository.addLike(id, done);

};

exports.addDislike = (id, done) => {

    signRepository.addDislike(id, done);

};

exports.getLikes = (id, done) => {

    signRepository.getLikes(id, done);

};

exports.getDislikes = (id, done) => {

    signRepository.getDislikes(id, done);

};