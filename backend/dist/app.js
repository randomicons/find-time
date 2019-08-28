"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var userRoutes = require('./routes/user.routes');
var app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: false }));
app.use('/users', userRoutes);
var port = 1234;
app.listen(port, function () {
    console.log('server is up and running on port number: ' + port);
});
//# sourceMappingURL=app.js.map