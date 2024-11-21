var pool = require('./db.js');

function getUser(username, password, email, callback) {
    var query = "SELECT * FROM customer WHERE username = $1 AND password = $2; AND email = $3";
    var values = [username, password,email];
    pool.query(query, values, (error, result) => {
        if (error) {
            callback(error.message);
        } else {
            callback(result);
        }
    } );
}

function createUser(username, password, email, callback) {
    var query = "INSERT INTO customer(username,password,email) VALUES($1,$2,$3) RETURNING *;";
    var values = [username, password, email];
    pool.query(query, values, (error, result) => {
        if (error) {
            callback(error.message);
        } else {
            callback(true);
        }
    } );
}



module.exports = {
    getUser,
    createUser
};