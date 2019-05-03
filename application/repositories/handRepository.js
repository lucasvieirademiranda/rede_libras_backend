var pool = global.pool;

exports.find = (id, done) => {

    var sql = 'SELECT * FROM HANDS WHERE ID = ? LIMIT 1';

    pool.query(sql, [id], function(error, results, fields) {

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
                image_name: results[0].IMAGE_NAME,
                image_path: results[0].IMAGE_PATH
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};

exports.list = (done) => {

    var sql = 'SELECT * FROM HANDS';

    pool.query(sql, function(error, results, fields) {

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
                    description: result.DESCRIPTION,
                    image_name: result.IMAGE_NAME,
                    image_path: result.IMAGE_PATH
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.insert = (hand, done) => {

    var sql = 'INSERT INTO HANDS (NAME, DESCRIPTION, IMAGE_NAME, IMAGE_PATH) VALUES (?, ?, ?, ?)';

    var data = [
        hand.name,
        hand.description,
        hand.image_name,
        hand.image_path
    ];

    pool.query(sql, data, function(error, results, fields) {

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
            name: hand.name,
            description: hand.description,
            image_name: hand.image_name,
            image_path: hand.image_path
        };

        done(null, data);

    });

};

exports.update = (hand, done) => {

    var sql = 'UPDATE HANDS SET NAME = ?, DESCRIPTION = ?, IMAGE_NAME = ?, IMAGE_PATH = ? WHERE ID = ?';

    var data = [
        hand.name,
        hand.description,
        hand.image_name,
        hand.image_path,
        hand.id
    ];

    pool.query(sql, data, function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        var data = {
            id: hand.id,
            name: hand.name,
            description: hand.description,
            image_name: hand.image_name,
            image_path: hand.image_path
        };

        done(null, data);

    });

};

exports.delete = (id, done) => {

    pool.getConnection(function(error, connection) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        var sql = 'SELECT * FROM HANDS WHERE ID = ? LIMIT 1';

        connection.query(sql, [id], function(error, results1, fields) {

            if (error)
            {
                done({
                    code: 500,
                    message: "Não foi possível acessar a base de dados!!"
                }, null);
    
                return;
            }
    
            var sql = 'DELETE FROM HANDS WHERE ID = ?';
    
            connection.query(sql, [id], function(error, results2, fields) {
    
                connection.release();

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
                    file_name: results1[0].IMAGE_NAME,
                    file_path: results1[0].IMAGE_PATH,
                }
        
                done(null, data);
        
            });
    
        });

    });
};

exports.dropDownList = (name, done) => {

    var sql = 'SELECT * FROM HANDS';

    if (name)
        sql += ' WHERE UPPER(NAME) LIKE UPPER(?)';

    pool.query(sql, [name + '%'], function(error, results, fields) {

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

    var sql = 'SELECT * FROM HANDS WHERE UPPER(NAME) = UPPER(?)';

    pool.query(sql, [name], function(error, results, fields) {

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
                image_name: results[0].IMAGE_NAME,
                image_path: results[0].IMAGE_PATH
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};