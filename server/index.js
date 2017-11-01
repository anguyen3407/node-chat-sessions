const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `${__dirname}/controllers/messages_controller` );
const expressSession= require ('session');
const createInitialSession = require( `${__dirname}/middlewares/session.js`)
const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );

app.use( session({
    secret: '1tS a S3cReT',
    resave: false,
    saveUnitialized: false,
    cookie: { maxAge: 1000 }
}))

app.use(function(req,res,next) {
    createInitialSession(req, res, next) 
});

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );