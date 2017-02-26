"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require('debug');
var path_1 = require("path");
var child_process_1 = require("child_process");
var MongoSupervise = (function () {
    function MongoSupervise(childPid) {
        this.childPid = childPid;
        this.execPath = path_1.resolve(__dirname, 'bin');
        this.parentPid = process.pid;
        this.command = "mongo-supervise.js";
        this.platform = process.platform;
        this.debug = Debug("mongodb-prebuilt-MongoSupervice");
    }
    MongoSupervise.prototype.getSuperviseCommand = function () {
        var killerCommand = path_1.resolve(this.execPath, this.command);
        this.debug("getSuperviseCommand(): " + killerCommand);
        return killerCommand;
    };
    MongoSupervise.prototype.run = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isWindows() === true) {
                _this.runOnWindows();
            }
            else {
                _this.runOnLinux();
            }
            _this.monitorChild.on('close', function (code) {
                console.log('close of monitor child', code);
                //this.debug('Failed to start child process.', err);
            });
            _this.monitorChild.stderr.on('close', function (message) {
                console.log('close of monitor child', message);
                //this.debug('Failed to start child process.', err);
            });
            _this.monitorChild.stdout.on('close', function (message) {
                console.log('close of monitor child', message);
                //this.debug('Failed to start child process.', err);
            });
            resolve(true);
        });
    };
    MongoSupervise.prototype.isWindows = function () {
        var isWindows = this.platform === "win32";
        this.debug("isWindows(): " + isWindows);
        return isWindows;
    };
    MongoSupervise.prototype.runOnWindows = function () {
        this.debug("runOnWindows()");
        var command = this.getSuperviseCommand();
        this.monitorChild = child_process_1.spawn("cmd.exe", [command, this.parentPid.toString(), this.childPid.toString()], { stdio: 'inherit', detached: false });
    };
    MongoSupervise.prototype.runOnLinux = function () {
        this.debug("runOnLinux()");
        var command = this.getSuperviseCommand();
        this.monitorChild = child_process_1.spawn(command, [this.parentPid.toString(), this.childPid.toString()], { stdio: 'inherit', detached: false });
    };
    return MongoSupervise;
}());
exports.MongoSupervise = MongoSupervise;
//# sourceMappingURL=/Users/winfinit/workspace/rj/mongodb-prebuilt/mongodb-supervise.js.map