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

    this.id = this._.slugify(this.name);
    this.filename = this.id + '.html';
};

util.inherits(StepGenerator, yeoman.generators.NamedBase);

StepGenerator.prototype.files = function files() {
    var appPath = process.cwd();
    var fullfilename = path.join(appPath, '/steps/' + this.filename);
    this.template('step.html', fullfilename);
    var fullPath = path.join(appPath, '/steps/list.json');
    var list = require(fullPath);
    list.push(
    {
        uri: this.filename,
        id: this.id,
        class: 'step',
        data: {
            x: 3000,
            y: 0,
            z: 0,
            scale: 1,
            "rotate-x": 0,
            "rotate-y": 0,
            "rotate-z": 90
        }
    });
    fs.writeFileSync(fullPath, JSON.stringify(list, null, 4));
};
