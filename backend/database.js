//As of now, none of this is important anymore
var randomToken = require('random-token');

var db = {

    users: [
        { username: "test@test.at", password: "12345678"},
        { username: "linus@kernel.org", password: "12345678" },
        { username: "steve@apple.com", password: "12345678" },
        { username: "bill@microsoft.com", password:"12345678" }
    ],

    tokens: [],

    signup: function(username, password) {
        let user = this.users.find(u => u.username === username);
        if (user !== undefined) {
            const result = {
                token: null,
                username: null,
                success: false,
                msg: "Username already exists"
            }
            return result;
        }

        this.users.push({ username: username, password: password});
        console.log(this.users);

        const result = {
            token: randomToken(64),
            username: username, 
            success: true,
            msg: "Sign-Up successful"
        }

        
        return result;
    },

    login: function(username, password) {
        let user = this.users.find(u => u.username === username);
        if (user != undefined && user.password === password) {
            const result = {
                token: randomToken(64),
                username: user.username,
                msg: "Login successful"
            }

            this.tokens.push(result);
            return result;
        }

        return null;
    },

    /*
    deleteToken(authToken)  {
        this.tokens = this.tokens.filter(e => e.token != authToken);
    },

    isAuthenticated: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken) != undefined;
    },

    getAuthUser: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken);
    },

    getHighscores: function() {
        return this.highscores.sort(function(a,b) { return b.score - a.score });
    },

    addHighscore: function(username, score) {
        this.highscores.push({ username: username, score: score });
    }
    */
}


module.exports = db;
