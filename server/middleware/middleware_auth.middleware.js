
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const username = req.session.username;
    if (!username) {
        res.status(401).send('Unauthorized: No session available');
    } else {
        console.log('middleware' + username);
        req.username = username;
        next();
    }
}
