
/*
 * Grundy v0.0.1
 */

var childProcess  = require('child_process');
var _ = require('underscore');

module.exports = {

    process: null,

    defaultConfiguration: {

        params: ['default'],

        onError: function(data){
            console.log('GRUNT ERROR: ' + data);
        },

        onData: function(data){
            console.log('GRUNT: ' + data);
        },

        onClose: function(data){
            console.log('CLOSING GRUNT');
        }
    },

    mergeOptions: function(options){
        if(_.isString(options) || _.isArray(options)){
            this.defaultConfiguration.params.push(options);
        }else if(_.isObject(options)){
            for (var key in options) {
                this.defaultConfiguration.params[key] = options[key];
            };
        }
    },

    spawnGrunt: function(){
        this.process = childProcess.spawn('grunt', this.defaultConfiguration.params);
    },

    addListeners: function(){
        this.process.stderr.on('data', this.defaultConfiguration.onError);
        this.process.stdout.on('data', this.defaultConfiguration.onData);
        this.process.on('close', this.defaultConfiguration.onClose);
    },

    spawn: function(options){
        this.mergeOptions(options);
        this.spawnGrunt();
        this.addListeners();
    },

    kill: function(){
        this.process.kill('SIGHUP');
    },
};