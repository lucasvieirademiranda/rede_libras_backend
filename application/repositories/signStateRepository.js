var pool = global.pool;

exports.insertAll = (data, done) => {

    var inserts = data.states.map((idState) => {
        return 'INSERT INTO SIGNS_STATES (ID_SIGN, ID_STATE) VALUES (' + data.idSign + ',' + idState + ')';
    });

    var sql = inserts.join(";");

    pool.query(sql, function(error, results, fields) {

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

    var sql = "DELETE FROM SIGNS_STATES WHERE ID_SIGN = ?";

    pool.query(sql, [id], function(error, results, fields) {

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