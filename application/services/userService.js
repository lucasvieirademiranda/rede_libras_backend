var userRepository = require('../repositories/userRepository');
var async = require('async');
var md5 = require('md5');

exports.login = (data, done) => {

    var data = {
        user: data.user,
        password: md5(data.password)
    }

    userRepository.login(data, function(error, data) {

        if (error)
        {
            done(error, null);

            return;
        }

        if (data == null)
        {
            done({
                code: 500,
                message: "O usuário ou senha estão incorretos"
            }, null);

            return;
        }
        
        done(null, data);
        
    });
    
};

exports.find = (id, done) => {

    userRepository.find(id, done);

};

exports.list = (done) => {

    userRepository.list(done);

};

exports.create = (user, done) => {

    async.waterfall([

        function(done) {

            userRepository.findByUser(user.user, done);

        },
        function(data, done)
        {
            if (data)
            {
                done({
                    code: 422,
                    message: "O usuário informado já existe na base de dados!!"
                }, null);

                return;
            }

            userRepository.findByMail(user.mail, done);
        },
        function(data, done)
        {
            if (data)
            {
                done({
                    code: 422,
                    message: "O e-mail informado já existe na base de dados!!"
                }, null);

                return;
            }

            user.password = md5(user.password);

            userRepository.insert(user, done);
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

exports.edit = (user, done) => {

    async.waterfall([
        function(done) {

            userRepository.findByUser(user.name, done);

        },
        function(data, done)
        {
            if (data && data.id !== user.id)
            {
                done({
                    code: 422,
                    message: "O usuário informado já existe na base de dados!!"
                }, null);

                return;
            }

            userRepository.findByMail(user.mail, done);
        },
        function(data, done)
        {
            if (data && data.id !== user.id)
            {
                done({
                    code: 422,
                    message: "O e-mail informado já existe na base de dados!!"
                }, null);

                return;
            }
            
            userRepository.update(user, done);
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

    userRepository.delete(id, done);

};