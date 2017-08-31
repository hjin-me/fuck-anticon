const fs = require('fs');
const path = require('path');
const cpFile = require('cp-file');
describe("remove font-face", () => {
  const toBeReplaceFile = path.join(__dirname, '../node_modules/ng-zorro-antd/src/release/root/nz-root-style.component.js');
  const tmpFile = path.join(__dirname, '../node_modules/ng-zorro-antd/src/release/root/nz-root-style.component.js.tmp');
  beforeEach(done => {
    cpFile(toBeReplaceFile, tmpFile).then(() => {
      done()
    });
  });
  afterEach(done => {
    cpFile(tmpFile, toBeReplaceFile).then(() => {
      done()
    });
  });
  it('should contain anticon font face', () => {
    const content = fs.readFileSync(path.join(__dirname, '../node_modules/ng-zorro-antd/src/release/root/nz-root-style.component.js'));
    expect(content.indexOf('\'anticon\'')).toBeGreaterThan(-1);
  });

  it('should remove anticon font face', done => {
    const replace = require('../src/replace');
    replace.then(() => {
      const content = fs.readFileSync(path.join(__dirname, '../node_modules/ng-zorro-antd/src/release/root/nz-root-style.component.js'));
      expect(content.indexOf('\'anticon\'')).toBe(-1);
      done();
    }, done.fail)
  })

});
