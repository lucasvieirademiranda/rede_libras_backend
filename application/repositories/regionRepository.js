var connection = global.connection;

exports.dropDownList = (done) => {

    var sql = 'SELECT * FROM REGIONS';

    connection.query(sql, function(error, results, fields) {
       
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
                    label: result.NAME
                };

            });

            done(null, data);
        }
        else
            done(null, []);

    });

};