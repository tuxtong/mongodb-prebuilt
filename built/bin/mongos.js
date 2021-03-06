#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_bins_1 = require("../mongo-bins");
var COMMAND = "mongos";
var mongoBin = new mongo_bins_1.MongoBins(COMMAND, process.argv.slice(2), { stdio: 'inherit' });
mongoBin.run().then(function () {
    //console.log(`${COMMAND} is now running`);
}, function (e) {
    console.error("unable to launch " + COMMAND, e);
});
//# sourceMappingURL=/tmp/mongodb-prebuilt/bin/mongos.js.map