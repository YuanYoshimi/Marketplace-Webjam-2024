var path = require('path');
var model = require('./queries.js');

function get_index(request, response) {
    response.sendFile(path.resolve("./index.html"));
}

function get_login(request, response) {
    response.sendFile(path.resolve("./login.html"));
}
function get_signup(request, response) {
    response.sendFile(path.resolve("./signup.html"));
}

function post_login(request, response) {
    var { username, password } = request.body;

    console.log("[CTRL]", username, password);

    model.getUser(username, password, (result) => {
        console.log("[CTRL]", "Result: ", result.rows);

        if (result.rows.length > 0) {
            response.send(true);
        } else {
            response.send(false);
        }
    });
}
function post_signup(request, response) {
    var { username, password, password2,email} = request.body;
    console.log(request.query)
    if(password!=password2){
        response.send("2")
    }
    else{

    
    model.createUser(username, password, email, (result) => {
       console.log(result);
       if (result==false) {
        response.send("1");
    } else{
        response.send("0");
    }


    });
    }
}

module.exports = {
    post_login,
    get_login,
    get_index,
    get_signup,
    post_signup
}