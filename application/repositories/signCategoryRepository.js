var connection = global.connection;

exports.insertAll = (data, done) => {

    var inserts = data.categories.map((idCategory) => {
        return 'INSERT INTO SIGNS_CATEGORIES (ID_SIGN, ID_CATEGORY) VALUES (' + data.idSign + ',' + idCategory + ')';
    });

    var sql = inserts.join(";");

    connection.query(sql, function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        done(null, null);

    });

};

exports.deleteAll = (id, done) => {

    var sql = "DELETE FROM SIGNS_CATEGORIES WHERE ID_SIGN = ?";

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            })

            return;
        }

        done(null, null);
        
    });

};