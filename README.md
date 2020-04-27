## kbone-ts-template

### 使用的工具和库

>[@vue/cli   v4.1.1](https://cli.vuejs.org/)
[vue-cli-plugin-kbone   0.4.14](https://www.npmjs.com/package/vue-cli-plugin-kbone)
[kbone-ui   0.5.8](https://www.npmjs.com/package/kbone-ui)

### 创建项目

> 关于 `vue-cli 3.x` 的使用这里不做介绍，请移步至[Vue CLI官方文档查看](https://cli.vuejs.org/)

使用 `vue-cli 3.x` 可视化页面根据自己的需求创建一个 `ts` 空项目即可

因为我们是用 `ts` 开发微信小程序，所以需要安装微信小程序对应的 `types` 

`miniprogram-api-typings`， 安装好后需要在 `tsconfig.json` 配置文件中的 `types` 节点添加对应的配置，最好是再加一个忽略校验 `*.d.ts` 的配置项，因为引入的 `types` 在编译时也会校验

```
{
  "compilerOptions": {
    ...
    "skipLibCheck": true,
    "types": [
      ...
      "miniprogram-api-typings"
    ],
    ...
  },
  ...
}
```

### 集成kbone

`kbone` 提供了 `vue-cli 3.x` 的插件，可以一键集成到 `vue-cli 3.x` 创建的项目中。

在刚刚创建好的空项目中选择 `插件` -> `添加插件` 搜索 `vue-cli-plugin-kbone` 点击安装即可

安装完成后会弹出配置页面

`AppId`  填写自己的小程序 `AppId`
`项目名` 填写自己的项目名
`Kbone 入口文件名称` 填写为 `main.mp.ts`
`是否需要输出 app.js、project.config.json 等非页面相关文件` 选择 `不输出 project.config.json`
`选择 app.wxss 输出配置` 选择 `输出默认标签样式`
`选择是否自动构建依赖包` 根据自己使用的工具选择 `npm` 或 `yarn`
`是否需要使用 rem` 建议开启
其他的配置项默认即可，然后点击完成

插件会自动生成 `kbone` 的入口文件、配置文件、以及三条命令脚本

#### 入口文件

入口文件就是我们刚才输入的 `main.mp.ts` ，位置在 `src` 目录下，根据自己创建项目时所安装的库进行修改

例如我在创建时使用了 `router` 和 `vuex` 这些需要在入口文件引入的，所以也需要在 `main.mp.ts`  中引入

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 需要将创建根组件实例的逻辑封装成方法
export default function createApp () {
  // 在小程序中如果要注入到 id 为 app 的 dom 节点上，需要主动创建
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
```

#### 配置文件

配置文件为 `miniprogram.config.js` ， 位置在项目根目录，其中的内容自行按需修改，对应的配置项可参考 `kbone` [官方文档](https://wechat-miniprogram.github.io/kbone/docs/)

#### 命令脚本

插件会在 `package.json` 中生成的三条命令脚本，分别是 `build:mp` 、 `dev:mp` 和 `mp`

因为我们后面需要再集成 `云开发` 所以命令需要做一点点修改，将打包目录修改为 `dist/mp/miniprogram`

`build:mp` 改为
```
"build:mp": "cross-env MP_ENV=miniprogram vue-cli-service build --mode production --dest ./dist/mp/miniprogram/common"
```

`mp` 改为
```
"mp": "cross-env MP_ENV=miniprogram vue-cli-service build --mode development --dest ./dist/mp/miniprogram/common --watch"
```

### 集成kbone-ui

万众期待的 `kbone-ui` 终于发布了一部分出来，[官方文档](https://wechat-miniprogram.github.io/kbone/docs/ui/intro/)

可以继续使用 `vue-cli 3.x` 的可视化页面安装，也可以使用命令行安装

安装完成后在 `web` 端的入口文件 `main.ts` 和 `kbone` 入口文件 `main.mp.ts` 中引入 `kbobe-ui`

#### main.ts

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'

Vue.use(KboneUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

#### main.mp.ts

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'

Vue.use(KboneUI)

Vue.config.productionTip = false

// 需要将创建根组件实例的逻辑封装成方法
export default function createApp () {
  // 在小程序中如果要注入到 id 为 app 的 dom 节点上，需要主动创建
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
```

### 集成云开发

完成上面步骤项目大致是可以跑起来了，但是 `kbone` 是不支持 `scoped` 样式的，所以在项目中用到 `scoped` 样式的地方需要自己再改一下，这里就不细说了

还有最重要的一点就是我们在集成 `kbone` 时选择的是 `不输出 project.config.json` 也就意味着打包的时候不会生成 `project.config.json` 文件，原因也是因为 `云开发` 中需要在 `project.config.json` 中配置 `miniprogramRoot` 和 `cloudfunctionRoot` ，所以我们需要手动建一个 `project.config.json` 文件在项目根目录，如果不会建，那就在开发者工具中新建一个 `云开发` 项目，从里面拷一个吧

`project.config.json` 文件创建完后，需要再在项目根目录创建一个 `cloudfunctions` 文件夹，用于存放 `云开发` 的代码，关于 `云开发` 的代码都放在这个文件夹下面就可以了，[云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

上面的步骤完成后，还有最后一个关键步骤，配置 `webpack` 在打包项目时将 `云开发` 相关的代码也打包进去

在项目根目录创建一个 `vue.config.js` 文件，添加以下代码

```
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    if (process.env.MP_ENV === 'miniprogram') {
      config.plugins.push(new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './cloudfunctions'),
          to: path.resolve(__dirname, './dist/mp/cloudfunctions'),
          toType: 'dir'
        },
        {
          from: path.resolve(__dirname, './project.config.json'),
          to: path.resolve(__dirname, './dist/mp/project.config.json'),
          toType: 'file'
        }
      ]))
    }
  }
}
```

其配置的意思就是如果当前运行的环境变量是 `miniprogram` 那么就将 `cloudfunctions` 文件夹和 `project.config.json` 文件拷贝到小程序的打包目录，到这里就全部集成完了，可以开心的去码代码了

### 如果用着不错，『打赏』一下哟

<table>
  <tr>
    <td align="center" width="300px">WeChat</td>
    <td align="center" width="300px">AliPay</td>
  </tr>
  <tr>
    <td align="center" width="300px">
      <img src="https://static.h5open.com/github/wechat.jpg" alt="WeChat"/>
    </td>
    <td align="center" width="300px">
      <img src="https://static.h5open.com/github/alipay.jpg" alt="WeChat"/>
    </td>
  </tr>
</table>
