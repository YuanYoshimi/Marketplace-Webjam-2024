var express = require('express');
var session = require('express-session');
var routes = require("./routes.js");

var app = express();

var sess;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'sessionname',
        secret: 'zordon',
        resave: false,
        maxAge: 30 * 60 * 1000 // 30 minutes
    })
)

app.use(express.static('./pub_html'));

app.use(routes);

var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));