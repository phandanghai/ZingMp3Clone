const MusicRoute = require('./MusicRouter');
const AccountRoute = require('./AccountRoute');
const PlayListRoute = require('./PlayListRoute');
function route(app) {
    app.use('/music', MusicRoute);
    app.use('/account', AccountRoute);
    app.use('/playList', PlayListRoute);
}

module.exports = route;
