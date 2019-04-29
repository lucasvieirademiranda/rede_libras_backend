var cluster = require("cluster");
var os = require("os");

// if(cluster.isMaster)
// {
//     var numberOfWorkers = os.cpus().length;

//     for(var i = 0; i < numberOfWorkers; i++)
//         cluster.fork();

//     cluster.on("online", function(worker) {
//         console.log('A worker with pid:' + worker.process.pid + ' has been started');
//     });

//     cluster.on("exit", function(worker, code, signal) {
//         console.log('A worker with pid: ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker...');
//         cluster.fork();
//     });

// }
// else
// {
    var mysql = require('mysql');
    var cors = require('cors');
    //var helmet = require('helmet');
    var bodyParser = require('body-parser');
    var fileUpload = require('express-fileupload');
    var expressValidator = require('express-validator');
    var http = require("http");
    var express = require("express");
    
    var authorization = require('./application/middlewares/authorization');
    var loader = require('./application/loader');

    // read configurations from .env and make it acessible by process.env
    require('dotenv-safe').config();
    
    var pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: true,
        insecureAuth : true
    });

    pool.getConnection(function(error, connection) {
        
        if (error) throw error;

        global.connection = connection;

        var application = express();

        application.use(cors());

        //application.use(helmet());
       
        application.use(bodyParser.json());
       
        application.use(bodyParser.urlencoded({ extended: true }));
       
        application.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 } //bytes
        }));
       
        application.use(authorization());
       
        application.use(expressValidator([]));
    
        loader.start(application);
    
        http.createServer(application)
            .listen(process.env.APP_PORT, process.env.APP_IP);

        console.log("Server is running!");
    });
//}