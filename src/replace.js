#!/usr/bin/env node
"use strict";
const path = require("path");
const semver = require("semver");
const ngReplace = require("./ng_gte_0_7");
const ngOldReplace = require("./ng_lte_0_6");
const reactReplace = require("./react");

const pkg = require(path.join(process.cwd(), "./package.json"));

if (pkgContain(pkg, "antd")) {
  reactReplace();
}

if (pkgContain(pkg, "ng-zorro-antd", "<0.7.0")) {
  ngOldReplace();
}

if (pkgContain(pkg, "ng-zorro-antd", ">=0.7.0")) {
  ngReplace();
}

function pkgContain(pkg, search, ver) {
  const inPkg =
    Object.keys(pkg.dependencies).indexOf(search) > -1 ||
    Object.keys(pkg.devDependencies).indexOf(search) > -1;
  if (!inPkg) {
    return false;
  }
  if (!ver) {
    return inPkg;
  }

  const targetPkg = path.join(
    process.cwd(),
    "node_modules",
    search,
    "package.json"
  );
  return semver.satisfies(require(targetPkg).version, ver);
}
