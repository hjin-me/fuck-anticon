const fs = require("fs");
const path = require("path");
const cpFile = require("cp-file");
const find = require("find");
describe("remove ng-zorro font-face", () => {
  let toBeReplaceFile = [];
  let tmpFile = [];
  beforeEach(done => {
    new Promise((resolve, reject) => {
      find
        .file(
          /.js$/,
          path.join(__dirname, "../node_modules/ng-zorro-antd"),
          files => {
            const result = [];
            for (let f of files) {
              const content = fs.readFileSync(f);
              if (
                content.indexOf("@font-face") > -1 &&
                content.indexOf("anticon") > -1
              ) {
                result.push(f);
              }
            }
            resolve(result);
          }
        )
        .error(function(err) {
          reject(err);
        });
    })
      .then(result => {
        toBeReplaceFile = Array.from(result);
        tmpFile = toBeReplaceFile.map(s => s + ".tmp");

        return Promise.all(
          toBeReplaceFile.map((s, index) => {
            return cpFile(s, tmpFile[index]);
          })
        );
      })
      .then(() => {
        done();
      })
      .catch(err => done.fail(err));
  });

  afterEach(done => {
    Promise.all(
      toBeReplaceFile.map((s, index) => {
        return cpFile(tmpFile[index], s);
      })
    )
      .then(done)
      .catch(done.fail);
  });

  it("should contain anticon font face", () => {
    toBeReplaceFile.map(s => {
      const content = fs.readFileSync(s);
      expect(content.indexOf("'anticon'")).toBeGreaterThan(-1);
    });
  });

  it("should remove anticon font face", done => {
    const replace = require("../src/ng");
    replace
      .then(() => {
        return Promise.all(
          toBeReplaceFile.map(s => {
            const content = fs.readFileSync(s);
            expect(content.indexOf("/at.alicdn.com/")).toBe(-1, s);
            return Promise.resolve();
          })
        );
      })
      .then(done)
      .catch(done.fail);
  });
});

describe("remove antd font-face", () => {
  it("should remove anticon remote url", done => {
    done();
  });
});
