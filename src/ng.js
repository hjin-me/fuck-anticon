'use strict';
const replace = require('replace-in-file');

const options = {
  files: [
    'node_modules/ng-zorro-antd/**/*.js',
  ],
  from: /@font-face {[^{}]*?anticon[^{}]*?}/ig,
  to: '',
};

module.exports = () => new Promise((resolve, reject) => {
  replace(options)
    .then(changedfiles => {
      console.log('modified files:', changedfiles.join(', '));
      resolve();
    })
    .catch(error => {
      console.error('error occurred:', error);
      reject();
    });
});
