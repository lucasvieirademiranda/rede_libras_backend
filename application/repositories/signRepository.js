var connection = global.connection;

exports.find = (id, done) => {

    var sql = 'SELECT * FROM SIGNS WHERE ID = ? LIMIT 1';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        var sign = {
            id: results[0].ID,
            sign: results[0].SIGN,
            example: results[0].EXAMPLE,
            isGeneral: results[0].IS_GENERAL,
            like: results[0].LIKE,
            dislike: results[0].DISLIKE,
            region: '',
            states: [],
            categories: [],
            file_name: results[0].FILE_NAME,
            video_path: results[0].VIDEO_PATH,
            idRegion: results[0].ID_REGION
        };

        var queries = [
            'SELECT ID, NAME FROM REGIONS WHERE ID = ' + sign.idRegion + ' LIMIT 1',
            'SELECT S.ID, S.NAME, S.ACRONYM FROM STATES S INNER JOIN SIGNS_STATES SS ON S.ID = SS.ID_STATE WHERE SS.ID_SIGN = ' + sign.id,
            'SELECT C.ID, C.NAME FROM CATEGORIES C INNER JOIN SIGNS_CATEGORIES SC ON C.ID = SC.ID_CATEGORY WHERE SC.ID_SIGN = ' + sign.id
        ];

        connection.query(queries.join(';'), function(error, results, fields) {

            if (error)
            {
                done({
                    code: 500,
                    message: "Ocorreu um erro ao acessar a base de dados!!"
                }, null);

                return;
            }

            if (results[0].length > 0)
            {
                var region = results[0].map((region) => {
                    return {
                        value: region.ID,
                        label: region.NAME
                    }
                });

                sign.region = region;
            }

            if (results[1].length > 0)
            {
                var states = results[1].map((state) => {
                    return {
                        value: state.ID,
                        label: state.NAME + " (" + state.ACRONYM + ")"
                    }
                });

                sign.states = states;
            }

            var categories = results[2].map((category) => {
                return {
                    value: category.ID,
                    label: category.NAME
                }
            });

            sign.categories = categories;

            done(null, sign);

        });

    });

};

exports.list = (done) => {

    var sql = 'SELECT * FROM SIGNS';

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
                    sign: result.SIGN,
                    example: result.EXAMPLE,
                    isGeneral: result.IS_GENERAL,
                    file_name: result.FILE_NAME,
                    video_path: result.VIDEO_PATH,
                    idRegion: result.ID_REGION
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.insert = (sign, done) => {

    var sql = 'INSERT INTO SIGNS (SIGN, EXAMPLE, IS_GENERAL, FILE_NAME, VIDEO_PATH, ID_REGION) VALUES (?, ?, ?, ?, ?, ?)';

    var data = [
        sign.sign,
        sign.example,
        sign.isGeneral,
        sign.file_name,
        sign.video_path,
        sign.idRegion
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
            sign: sign.sign,
            example: sign.example,
            isGeneral: sign.isGeneral,
            file_name: sign.file_name,
            video_path: sign.video_path,
            idRegion: sign.idRegion
        };

        done(null, data);

    });

};

exports.update = (sign, done) => {

    var sql = 'UPDATE SIGNS SET SIGN = ?, EXAMPLE = ?, IS_GENERAL = ?, FILE_NAME = ?, VIDEO_PATH = ?, ID_REGION = ? WHERE ID = ?';

    var data = [
        sign.sign,
        sign.example,
        sign.isGeneral,
        sign.file_name,
        sign.video_path,
        sign.idRegion,
        sign.id
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
            id: sign.id,
            sign: sign.sign,
            example: sign.example,
            isGeneral: sign.isGeneral,
            file_name: sign.file_name,
            video_path: sign.video_path,
            idRegion: sign.idRegion
        };

        done(null, data);

    });

};

exports.delete = (id, done) => {

    var sql = 'SELECT * FROM SIGNS WHERE ID = ? LIMIT 1';

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

        var sql = 'DELETE FROM SIGNS WHERE ID = ?';

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
                sign: results1[0].SIGN,
                comments: results1[0].COMMENTS,
                file_name: results1[0].FILE_NAME,
                video_path: results1[0].VIDEO_PATH
            }
    
            done(null, data);
    
        });

    });

};

exports.searchBySign = (sign, done) => {

    var sql = 'SELECT * FROM SIGNS WHERE UPPER(SIGN) LIKE UPPER(?)'

    connection.query(sql, [sign + "%"], function(error, results, fields) {

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
                    sign: result.SIGN,
                    example: result.EXAMPLE,
                    like: result.LIKE,
                    dislike: result.DISLIKE
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.searchByCategory = (category, done) => {

    var sql = `
        SELECT S.ID, S.SIGN, S.EXAMPLE FROM SIGNS S 
        INNER JOIN SIGNS_CATEGORIES SC ON S.ID = SC.ID_SIGN
        INNER JOIN CATEGORIES C ON SC.ID_CATEGORY = C.ID
        WHERE UPPER(C.NAME) LIKE UPPER(?) 
        GROUP BY S.ID
    `;

    connection.query(sql, [category + "%"], function(error, results, fields) {

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
                    sign: result.SIGN,
                    example: result.EXAMPLE,
                    like: result.LIKE,
                    dislike: result.DISLIKE
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.searchByImage = (done) => {

    var sql = `
        SELECT S.ID, S.SIGN, S.EXAMPLE FROM SIGNS S 
        INNER JOIN SIGNS_CATEGORIES SC ON S.ID = SC.ID_SIGN
        INNER JOIN CATEGORIES C ON SC.ID_CATEGORY = C.ID
        WHERE C.ID = 1
        GROUP BY S.ID
    `;

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
                    sign: result.SIGN,
                    example: result.EXAMPLE,
                    like: result.LIKE,
                    dislike: result.DISLIKE
                };

            });
    
            done(null, data);
        }
        else
            done(null, []);

    });

};

exports.findByName = (name, done) => {

    var sql = 'SELECT * FROM SIGNS WHERE UPPER(SIGN) = UPPER(?)';

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
                sign: results[0].SIGN,
                comments: results[0].COMMENTS,
                file_name: results[0].FILE_NAME,
                video_path: results[0].VIDEO_PATH
            };
    
            done(null, data);
        }
        else
            done(null, null);

    });

};

exports.addLike = (id, done) => {

    var sql = 'UPDATE SIGNS SET `LIKE` = (`LIKE` + 1) WHERE ID = ?';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        sql = 'SELECT `LIKE` FROM SIGNS WHERE ID = ? LIMIT 1';

        connection.query(sql, [id], function(error, results, fields) {

            if (error)
            {
                done({
                    code: 500,
                    message: "Não foi possível acessar a base de dados!!"
                }, null);
    
                return;
            }
    
            done(null, { like: results[0].LIKE });
    
        });

    });

};

exports.getLikes = (id, done) => {

    var sql = 'SELECT `LIKE` FROM SIGNS WHERE ID = ? LIMIT 1';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        done(null, { like: results[0].LIKE });

    });

};

exports.addDislike = (id, done) => {

    var sql = 'UPDATE SIGNS SET DISLIKE = (DISLIKE + 1) WHERE ID = ?';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        sql = 'SELECT `DISLIKE` FROM SIGNS WHERE ID = ? LIMIT 1';

        connection.query(sql, [id], function(error, results, fields) {
    
            if (error)
            {
                done({
                    code: 500,
                    message: "Não foi possível acessar a base de dados!!"
                }, null);
    
                return;
            }
    
            done(null, { dislike: results[0].DISLIKE });
    
        });

    });

};

exports.getDislikes = (id, done) => {

    var sql = 'SELECT `DISLIKE` FROM SIGNS WHERE ID = ? LIMIT 1';

    connection.query(sql, [id], function(error, results, fields) {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar a base de dados!!"
            }, null);

            return;
        }

        done(null, { dislike: results[0].DISLIKE });

    });

};