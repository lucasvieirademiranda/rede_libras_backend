var connection = global.connection;

exports.login = (data, done) => {

    var sql = 'SELECT * FROM USERS WHERE USER = ? AND PASSWORD = ? LIMIT 1'

    connection.query(sql, [data.user, data.password], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null)

            return;
        }

        if (results.length > 0)
        {
            var data = {
                id: results[0].ID,
                name: results[0].NAME,
                user: results[0].USER,
                password: results[0].PASSWORD,
                mail: results[0].MAIL
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

}

exports.find = (id, done) => {

    var sql = 'SELECT * FROM USERS WHERE ID = ? LIMIT 1';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        if (results.length > 0)
        {
            var data = {
                id: results[0].ID,
                name: results[0].NAME,
                user: results[0].USER,
                password: results[0].PASSWORD,
                mail: results[0].MAIL
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};

exports.list = (done) => {

    var sql = 'SELECT * FROM USERS';

    connection.query(sql, [], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        if (results.length > 0)
        {

            var data = results.map((result) => {

                return {
                    id: result.ID,
                    name: result.NAME,
                    user: result.USER,
                    password: result.PASSWORD,
                    mail: result.MAIL
                };
    
            });
    
            done(null, data);

        }
        else
            done(null, []);

    });

};

exports.insert = (user, done) => {

    var sql = 'INSERT INTO USERS (NAME, USER, PASSWORD, MAIL) VALUES (?, ?, ?, ?)';

    var data = [
        user.name,
        user.user,
        user.password,
        user.mail
    ];

    connection.query(sql, data, function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            });

            return;
        }

        var data = { 
            id: results.insertId,
            name: user.name,
            user: user.user,
            password: user.password,
            mail: user.mail
        };

        done(null, data);

    });

};

exports.update = (user, done) => {

    var sql = 'UPDATE USERS SET NAME = ?, USER = ?, MAIL = ? WHERE ID = ?';

    var data = [
        user.name,
        user.user,
        user.password,
        user.mail,
        user.id
    ];

    connection.query(sql, data, function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        var data = { 
            id: user.id,
            name: user.name,
            user: user.user,
            password: user.password,
            mail: user.mail
        };

        done(null, data);

    });

};

exports.delete = (id, done) => {

    var sql = 'SELECT * FROM USERS WHERE ID = ? LIMIT 1';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        var results1 = results;

        var sql = 'DELETE FROM USERS WHERE ID = ?';

        connection.query(sql, [id], function(error, results, fields) {
    
            if (error)
            {
                done({
                    code: 500,
                    message: "Não foi possível acessar a base de dados!!"
                }, null);
    
                return;
            }
    
            var data = { 
                id: results1[0].ID,
                name: results1[0].NAME,
                user: results1[0].USER,
                password: results1[0].PASSWORD,
                mail: results1[0].MAIL
            };

            done(null, data);
    
        });


    });

};

exports.findByUser = (user, done) => {

    var sql = 'SELECT * FROM USERS WHERE UPPER(USER) = UPPER(?)';

    connection.query(sql, [user], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        if (results.length > 0)
        {
            var data = {
                id: results[0].ID,
                name: results[0].NAME,
                user: results[0].USER,
                password: results[0].PASSWORD,
                mail: results[0].MAIL
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};

exports.findByMail = (mail, done) => {

    var sql = 'SELECT * FROM USERS WHERE UPPER(MAIL) = UPPER(?)';

    connection.query(sql, [mail], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        if (results.length > 0)
        {
            var data = {
                id: results[0].ID,
                name: results[0].NAME,
                user: results[0].USER,
                password: results[0].PASSWORD,
                mail: results[0].MAIL
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};