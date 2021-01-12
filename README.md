## 本地测试镜像
```shell
yarn build:prod

docker build -t test .

docker run -p 8008:80 -d test

localhost:8008 打开验证
```
## tips
- ` base`目录下面的文件只能在`fbi-vue2`基础模版里面更新
- 更新之后，执行 `npm run copy` 可以拷贝更新之后的文件到对应的项目中
- <span style='color:red'>项目目录和基础模板需要放在同级目录下</span>