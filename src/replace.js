#!/usr/bin/env node
'use strict';
const ngReplace = require('./ng');
const reactReplace = require('./react');

const pkg = require(require('path').join(process.cwd(), './package.json'));

if (pkgContain(pkg, 'antd')) {
  reactReplace();
}

if (pkgContain(pkg, 'ng-zorro-antd')) {
  ngReplace();
}

function pkgContain(pkg, search) {
  return Object.keys(pkg.dependencies).indexOf(search) > -1 || Object.keys(pkg.devDependencies).indexOf(search) > -1;
}
