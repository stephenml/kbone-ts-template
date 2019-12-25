module.exports = {
  origin: 'https://test.miniprogram.com',
  entry: '/',
  router: { 'app': ['/'] },
  redirect: {
    notFound: 'app',
    accessDenied: 'app'
  },
  generate: {
    app: 'noconfig',
    appWxss: 'default',
    autoBuildNpm: 'yarn'
  },
  app: {
    navigationStyle: 'custom'
  },
  appExtraConfig: {
    sitemapLocation: 'sitemap.json'
  },
  global: {
    share: true,
    windowScroll: false,
    backgroundColor: '#F7F7F7',
    rem: true
  },
  pages: {},
  optimization: {
    domSubTreeLevel: 10,

    elementMultiplexing: true,
    textMultiplexing: true,
    commentMultiplexing: true,
    domExtendMultiplexing: true,

    styleValueReduce: 5000,
    attrValueReduce: 5000
  },
  projectConfig: {
    appid: 'wxc862cf3c3ef5c3ae',
    projectname: 'binnie'
  },
  packageConfig: {
    name: 'binnie'
  },
  // vue-cli 相关配置
  vue: {
    entryFileName: 'main.mp.ts',
    cdnPath: '/',
    cdnLimit: 10240
  }
}
