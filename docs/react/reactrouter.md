# React Router

## Class Component

### 路由的基本使用

1. 明确好界面中的导航区、展示区
2. 导航区的 a 标签改为 Link 标签
   `<Link to="/xxxxx">Demo</Link>`
3. 展示区写 Route 标签进行路径的匹配
   `<Route path='/xxxx' component={Demo} />`
4. `<App>` 的最外侧包裹一个 `<BrowserRouter>` 或 `<HashRouter>`

### 路由组件与一般组件的区别

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

### NavLink与封装NavLink

* NavLink 可以实现路由链接的高亮，通过 activeClassName 指定样式名
* 标签体内容是一个特殊的标签属性，this.props.children 可以获取标签体内容

### Switch的使用

* 通常情况下，path 和 component 是一一对应的关系（如果出现了一个 path，对应多个组件，则两个组件都会展示，所以在注册路由的地方，即使匹配到一个正确的 path 依然会继续向下匹配）
* Switch 可以提高路由匹配效率(单一匹配)

### 解决多级路径刷新页面样式丢失的问题

* public/index.html 中，引入样式时不写 `./` 写 `/` （常用）
* public/index.html 中，引入样式时不写 `./` 写 `%PUBLIC_URL%` （常用）
* 使用 HashRouter

### 路由的严格匹配与模糊匹配

* 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
* 开启严格匹配：`<Route exact={true} path="/about" component={About}/>`
* 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

### Redirect的使用

* 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由
* 具体编码：
  ```jsx
  <Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
  </Switch>
  ```

### 嵌套路由

* 注册子路由时要写上父路由的 path 值
* 路由的匹配是按照注册路由的顺序进行的

### 向路由组件传递参数

* params参数
  ```txt
  路由链接(携带参数)：<Link to='/demo/test/tom/18'>详情</Link>
  注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
  接收参数：this.props.match.params
  ```
* search参数
  ```txt
  路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'>详情</Link>
  注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
  接收参数：this.props.location.search
  备注：获取到的 search 是 urlencoded 编码字符串，需要借助 querystring 解析
  ```
* state参数
  ```txt
  路由链接(携带参数)：<Link to={{pathname: '/demo/test', state: {name:'tom',age:18}}}>详情</Link>
  注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
  接收参数：this.props.location.state
  备注：刷新也可以保留住参数
  ```

### push与replace

默认是 push 模式，通过 Link 的 replace 属性置为 true 实现 replace 模式

`<Link replace={true} to='/home/message/detail'>关于</Link>`

### 编程式路由导航

借助 this.props.history 对象上的 API 操作路由跳转、前进、后退
* this.props.history.push()
* this.props.history.replace()
* this.props.history.goBack()
* this.props.history.goForward()
* this.props.history.go()

### withRouter

* withRouter 可以加工一般组件，让一般组件具备路由组件所特有的API
* withRouter 的参数是一个组件，返回值是一个新组件

### BrowserRouter与HashRouter的区别

* 底层原理不一样<br />
  BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 及以下版本<br />
  HashRouter 使用的是 URL 的哈希值(哈希值类似于锚点，不会向服务器发请求，但可以形成历史记录)

* path 表现形式不一样<br />
  BrowserRouter 的路径中没有 #，例如：localhost:3000/demo/test<br />
  HashRouter 的路径包含 #，例如：localhost:3000/#/demo/test

* 刷新后对路由 state 参数的影响<br />
  BrowserRouter 没有任何影响，因为 state 保存在 history 对象中<br />
  HashRouter 刷新后会导致路由 state 参数的丢失！！！

* 备注：HashRouter 可以用于解决一些路径错误相关的问题(css文件路径错误导致的样式丢失问题)

* 前端路由的原理就是用户点击路由链接，引起路径的变化，然后被路由器监测到

## Functional Component
