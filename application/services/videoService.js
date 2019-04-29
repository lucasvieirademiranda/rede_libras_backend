var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

exports.upload = (upload, done) => {

    fs.access(process.env.VIDEO_DIR, fs.constants.F_OK, (error) => {

        if (error)
        {
            fs.mkdir(process.env.VIDEO_DIR, (error) => {

                if (error)
                {
                    done({
                        code: 500,
                        message: "Não foi possível acessar o disco para preparar o diretório de persistência de vídeos!!"
                    }, null);

                    return;
                }

                var filename = uuid();
                var extension = path.extname(upload.name);
    
                var dir = path.join(process.env.VIDEO_DIR, filename + extension);

                upload.mv(dir, (error) => {

                    if (error)
                    {
                        done({
                            code: 500,
                            message: "Não foi possível acessar o disco para persistir o vídeo!!"
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

            var dir = path.join(process.env.VIDEO_DIR, filename + extension);

            upload.mv(dir, (error) => {

                if (error)
                {
                    done({
                        code: 500,
                        message: "Não foi possível acessar o disco para persistir o vídeo!!"
                    }, null);
                    return;
                }

                done(null, { path: dir });

            });
        }

    });

};

exports.delete = (path, done) => {

    fs.unlink(path, (error) => {

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