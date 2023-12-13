# Git Hooks

husky 是一个 Git Hooks 工具，能够在项目中配置 hooks 脚本

当我们执行 git 操作时，自动触发配置的脚本

## 使用步骤

1. 安装 husky `yarn add husky --dev`
2. 在 `package.json` 中添加 prepare 命令
   ```json
   // package.json
   "scripts": {
       // 新增这一行
       "prepare": "husky install", 
       ...
   },
   ```
   设置 prepare 命令的目的是：在其他用户执行 yarn install 后会自动执行 husky install
   
3. 配置完成后，在项目中执行 `yarn prepare` (也就是执行了 husky install)<br>
   执行完成后，会在项目根目录生成一个 `.husky` 文件夹
4. (示例)添加 pre-commit 钩子
   ```bash
   // 在项目根目录执行
   yarn husky add .husky/pre-commit "echo \"[Husky] pre-commit\"";
   ```
   执行这一步后，在 .husky 目录下会创建一个 pre-commit 文件
5. 配置完成🎉

## 整体流程

1. 当我们进行一次 git commit
2. 触发 husky 配置的 pre-commit 钩子
3. 执行 `echo \"[Husky] pre-commit\"`
4. 控制台输出 [Husky] pre-commit
