使用 [Ionic](http://ionicframework.com/docs/) 创建的跨平台应用。

## 功能

- 记录上下班签到时间
- 查看最近30天上下班签到记录

### 安装依赖

1. 安装[node](http://nodejs.cn/), [npm](https://docs.npmjs.com/getting-started/installing-node);
2. 安装[ionic](https://ionicframework.com/getting-started/),[cordova](https://cordova.apache.org/#getstarted)。执行命令 `npm install -g cordova ionic`;
3. 安装项目依赖包,在项目目录中执行`npm install`;

### 运行

- web端运行，执行`ionic serve`
- iOS端运行
  - 增加iOS平台`ionic cordova add platform ios`
  - build `ionic cordova build ios`
  - 使用xcode打开项目目录下的`platforms/ios/MyApp.xcodeproj`，并打包。
- Android端运行
  - 增加Android平台`ionic cordova add platform android`
  - build `ionic cordova build android`
  - 已经打好的包存放的位置在`platforms/android/build/outputs/apk/`下，可以自己手动倒出。

  
