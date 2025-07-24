这是付费委托，不要随便用！

## 开发

至少使用 NodeJS v22.14.0 LTS 版本！

先装 [Rush](https://rushjs.io/)，然后：

```shell
git clone git@github.com:MisaLiu/lilac-2025.git
cd lilac-2025

# 安装所有依赖包
rush install
```

然后直接去对应项目的文件夹里跑 `rush-pnpm run dev` 就行了

### 给某个项目添加依赖包

```shell
cd packages/example
rush add -p package-you-want-to-add
```