const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');
const replace = require('replace-in-file');
module.exports = () => {
  let cssPath = path.join(process.cwd(),
    './node_modules/antd/dist/antd.css',
  );

  const options = {
    files: [
      cssPath,
    ],
    from: /https:\/\/at\.alicdn\.com\/t\//g,
    to: './',
  };
  console.log('download antd\'s font file...');
  let cssContent = fs.readFileSync(cssPath, {
    encoding: 'utf8',
  });
  const distDir = path.join(process.cwd(), './node_modules/antd/dist');
  let urlRegex = /https:\/\/at\.alicdn\.com\/t\/font_[_a-zA-Z0-9]+\.(eot|woff|ttf|svg)\b/g;
  let fonts = new Set(cssContent.match(urlRegex));
  let downloadAll = [];
  for (let f of fonts) {
    downloadAll.push(new Promise((resolve, reject) => {
      download(f, path.join(distDir, path.parse(url.parse(f).path).base), err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    }));
  }

  return Promise.all(downloadAll).then(() => replace(options)).catch(err => {
    console.error(err);
    throw err;
  });

};


function download(url, dist, callback) {
  let file = fs.createWriteStream(dist);
  https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close();  // close() is async, call cb after close completes.
      callback();
    });
  }).on('error', function (err) { // Handle errors
    fs.unlink(dist); // Delete the file async. (But we don't check the result)
    if (callback) callback(err);
  });
}