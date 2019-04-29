var connection = global.connection;

exports.dropDownList = (id, done) => {

    var sql = 'SELECT * FROM STATES WHERE ID_REGION = ?';

    connection.query(sql, [id], function(error, results, fields) {
       
        if (error)
        {
            done({
                code: 500,
                message: "Ocorreu um erro ao acessar a base de dados!!"
            }, null);

            return;
        }

        if (results.length > 0)
        {
            var data = results.map((result) => {

                return {
                    value: result.ID,
                    label: result.NAME + " (" + result.ACRONYM + ")"
                };

            });

            done(null, data);
        }
        else
            done(null, []);

    });

};