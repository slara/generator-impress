'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ImpressGenerator = module.exports = function ImpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ImpressGenerator, yeoman.generators.Base);

ImpressGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(this.yeoman);

  var prompts = [{
    name: 'presentationTitle',
    message: 'What are you going to talk about?'
  },
  {
    name: 'packageVersion',
    message: 'What version should we put in the package.json file?',
    default: '0.0.1'
  }];

  this.prompt(prompts, function (props) {
    this.presentationTitle = props.presentationTitle;
    this.packageVersion = props.packageVersion;
    cb();
  }.bind(this));
};

ImpressGenerator.prototype.app = function app() {
  this.mkdir('steps');

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('index.html', 'index.html');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.copy('main.css', 'css/main.css');
  this.copy('main.js', 'js/main.js');
  this.template('start.html', 'steps/start.html');
  this.copy('list.json', 'steps/list.json');
};

ImpressGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

ImpressGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
