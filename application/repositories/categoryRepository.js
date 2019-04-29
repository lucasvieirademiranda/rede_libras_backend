var connection = global.connection;

exports.find = (id, done) => {

    var sql = 'SELECT * FROM CATEGORIES WHERE ID = ? LIMIT 1';

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
                description: results[0].DESCRIPTION
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};

exports.list = (done) => {

    var sql = 'SELECT * FROM CATEGORIES';

    connection.query(sql, function(error, results, fields) {

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
                    description: result.DESCRIPTION
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.insert = (category, done) => {

    var sql = 'INSERT INTO CATEGORIES (NAME, DESCRIPTION) VALUES (?, ?)';

    var data = [
        category.name,
        category.description
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
            name: category.name,
            description: category.description
        };

        done(null, data);

    });

};

exports.update = (category, done) => {

    var sql = 'UPDATE CATEGORIES SET NAME = ?, DESCRIPTION = ? WHERE ID = ?';

    var data = [
        category.name,
        category.description,
        category.id
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
            id: category.id,
            name: category.name,
            description: category.description
        };

        done(null, data);

    });

};

exports.delete = (id, done) => {

    var sql = 'SELECT * FROM CATEGORIES WHERE ID = ? LIMIT 1';

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

        var sql = 'DELETE FROM CATEGORIES WHERE ID = ?';

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
                description: results1[0].DESCRIPTION,
            }
    
            done(null, data);
    
        });

    });

};

exports.dropDownList = (done) => {

    var sql = 'SELECT * FROM CATEGORIES';

    connection.query(sql, function(error, results, fields) {

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
                    value: result.ID,
                    label: result.NAME
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.findByName = (name, done) => {

    var sql = 'SELECT * FROM CATEGORIES WHERE UPPER(NAME) = UPPER(?)';

    connection.query(sql, [name], function(error, results, fields) {

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
                description: results[0].DESCRIPTION,
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};