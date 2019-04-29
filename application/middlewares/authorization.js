var jwt = require('jsonwebtoken');

module.exports = function () {

    function authorization(request, response, next)
    {
        var urls = [
            '/account/login',
            '/sign/searchBySign',
            '/sign/searchByCategory',
            '/sign/download',
            '/sign/addLike',
            '/sign/getLikes',
            '/sign/addDislike',
            '/sign/getDislikes'
        ];

        for (var i = 0; i < urls.length; i++)
        {
            if (request.url.startsWith(urls[i]))
            {
                next();
                return;
            }
        }

        var token = request.headers['x-access-token'];

        if (!token)
        {
            response.status(401)
                    .send({
                        message: 'O token de autenticação não foi fornecido!!'
                    })

            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, {
            maxAge: process.env.JWT_EXPIRATION,
        }, function(error, decoded) {

            if (error)
            {
                response.status(500)
                        .send({
                            message: 'O token fornecido não é válido!!'
                        })

                return;
            }

            request.userId = decoded.id;

            next();
        });
    }

    return authorization;

}