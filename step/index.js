'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');


var StepGenerator = module.exports = function StepGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the step subgenerator with the argument ' + this.name + '.');

    config = config || require(path.join(process.cwd(), '/config.json'));
    this.id = this._.slugify(this.name);
    this.filename = this.id + '.html';
    this.impressConsole = options.impressConsole || config.impressConsole || false;
};

util.inherits(StepGenerator, yeoman.generators.NamedBase);

StepGenerator.prototype.files = function files() {
    var appPath = process.cwd();
    var fullfilename = path.join(appPath, '/steps/' + this.filename);
    this.template('step.html', fullfilename);
    var fullPath = path.join(appPath, '/steps/list.json');
    var list = require(fullPath);
    var X = 3000,
        Y = 0,
        Z = 0;

    if (list.length > 1) {
        var lastItem = list[list.length - 1],
            ntlItem = list[list.length - 2];
        X = 2 * lastItem.data.x - ntlItem.data.x;
        Y = 2 * lastItem.data.y - ntlItem.data.y;
        Z = 2 * lastItem.data.z - ntlItem.data.z;
    }

    list.push(
    {
        uri: this.filename,
        id: this.id,
        class: 'step',
        data: {
            x: X,
            y: Y,
            z: Z,
            scale: 1,
            "rotate-x": 0,
            "rotate-y": 0,
            "rotate-z": 90
        }
    });
    fs.writeFileSync(fullPath, JSON.stringify(list, null, 4));
};
