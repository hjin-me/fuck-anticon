# fuck-anticon
for Ng Zorro font-icon Local Deployment.

## Feature

1. No more request ali server;
2. Use Webpack for bundle fonts.

## Install

1.

```
npm install --save-dev @hjin/fuck-anticon
# or
yarn add --dev @hjin/fuck-anticon
```

2. Add PostInstall to your package.json
```
"scripts": {
  "postinstall": "fuck-anticon"
},
```

3. Add fonts to your global style. 

```
@font-face {
  font-family: 'anticon';
  src: url('../node_modules/ng-zorro-antd/src/assets/fonts/iconfont.eot'); /* IE9*/
  src:
  /* IE6-IE8 */
  url('../node_modules/ng-zorro-antd/src/assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  /* chrome、firefox */
  url('../node_modules/ng-zorro-antd/src/assets/fonts/iconfont.woff') format('woff'),
  /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('../node_modules/ng-zorro-antd/src/assets/fonts/iconfont.ttf') format('truetype'),
  /* iOS 4.1- */
  url('../node_modules/ng-zorro-antd/src/assets/fonts/iconfont.svg#iconfont') format('svg');
}
```

自己动手丰衣足食 NG-ZORRO/ng-zorro-antd#158