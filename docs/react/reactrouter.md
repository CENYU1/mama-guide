# React Router

## 路由的基本使用

1. 明确好界面中的导航区、展示区
2. 导航区的 a 标签改为 Link 标签
   `<Link to="/xxxxx">Demo</Link>`
3. 展示区写 Route 标签进行路径的匹配
   `<Route path='/xxxx' component={Demo} />`
4. `<App>` 的最外侧包裹一个 `<BrowserRouter>` 或 `<HashRouter>`

## 路由组件与一般组件的区别

* 写法不同：
  ```txt
  一般组件：<Demo/>
  路由组件：<Route path="/demo" component={Demo}/>
  ```
* 存放位置不同：
  ```txt
  一般组件：components
  路由组件：pages
  ```
* 接收到的 props 不同：
  ```txt
  一般组件：写组件标签时传递了什么，就能收到什么
  路由组件：接收到三个固定的属性
          history:
                go: ƒ go(n)
                goBack: ƒ goBack()
                goForward: ƒ goForward()
                push: ƒ push(path, state)
                replace: ƒ replace(path, state)
          location:
                pathname: "/about"
                search: ""
                state: undefined
          match:
                params: {}
                path: "/about"
                url: "/about"  
  ```

## NavLink与封装NavLink

* NavLink 可以实现路由链接的高亮，通过 activeClassName 指定样式名
* 标签体内容是一个特殊的标签属性，this.props.children 可以获取标签体内容