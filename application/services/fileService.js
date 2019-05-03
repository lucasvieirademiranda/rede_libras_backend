var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

exports.upload = (upload, folder, done) => {

    fs.access(folder, fs.constants.F_OK, (error) => {

        if (error)
        {
            fs.mkdir(folder, (error) => {

                if (error)
                {
                    done({
                        code: 500,
                        message: "Não foi possível acessar o disco para preparar o diretório de persistência de arquivos!!"
                    }, null);

                    return;
                }

                var filename = uuid();
                var extension = path.extname(upload.name);
    
                var dir = path.join(folder, filename + extension);

                upload.mv(dir, (error) => {

                    if (error)
                    {
                        done({
                            code: 500,
                            message: "Não foi possível acessar o disco para persistir o arquivo!!"
                        }, null);

                        return;
                    }

                    done(null, { path: path });

                });

            });
        }
        else
        {
            var filename = uuid();
            var extension = path.extname(upload.name);

            var dir = path.join(folder, filename + extension);

            upload.mv(dir, (error) => {

                if (error)
                {
                    done({
                        code: 500,
                        message: "Não foi possível acessar o disco para persistir o arquivo!!"
                    }, null);
                    return;
                }

                done(null, { path: dir });

            });
        }

    });

};

exports.delete = (folder, done) => {

    fs.unlink(folder, (error) => {

        if (error)
        {
            done({
                code: 500,
                message: "Não foi possível acessar o disco para remover o arquivo de vídeo!!"
            }, null);

            return;
        }

        done(null, {
            code: 200,
            message: "O arquivo foi removido com sucesso!"
        });
        
    });

};