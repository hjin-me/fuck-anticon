#!/usr/bin/env node
'use strict';
const replace = require('replace-in-file');

const options = {
  files: [
    'node_modules/ng-zorro-antd/src/release/**/*.js'
  ],
  from: /@font-face {[^{]*?anticon.*?}/ig,
  to: ''
};

module.exports = new Promise((resolve, reject) => {
  replace(options)
    .then(changedFiles => {
      console.log('Modified files:', changedFiles.join(', '));
      resolve()
    })
    .catch(error => {
      console.error('Error occurred:', error);
      reject()
    });
});
