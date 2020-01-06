<h1 align="center">easy create</h1>

<div align="center">

    一个定制化下载前端开发环境的脚手架

</div>

## 🔨 用法

|  参数| 说明 | 类型  | 默认值 |
| --- | --- | --- | --- |
| "templateName" | 模板名字,必填  | typescript\javascript\antAdmin | null |
| "TargetDirectoryName" | 建立项目的名称，默认当前目录  | String  | 当前目录 |
| --git | 是否初始化git目录 | String  | 当前目录 |
| --install | 是否自动下载node依赖包 | Boolean | - |

### 范例

```
// 根据指令交互问答式选择生成 
easy-create
// 一键生成
easy-create javascript projectName --install --git

```


## ✨ 特性

- 提供多样化末班
- 支持git自动初始化
- 支持自动安装依赖模块
- 支持使用 TypeScript 构建。
- 添加模板后台下载


## 🖥 支持环境

- Node全局安装环境

## 📦 安装

```bash
npx easy-create
npm install easy-create -g
```

```bash
yarn add easy-create
```







