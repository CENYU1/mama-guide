# React Router

## Class Component(类式组件)

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

## Functional Component(函数式组件)

### React Router 6 概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：

   * react-router：路由的核心库，提供了很多的：组件、钩子。

   * **react-router-dom：** 包含 react-router 所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等。

   * react-router-native：包括 react-router 所有内容，并添加一些专门用于 ReactNative 的 API，例如 `<NativeRouter>`等。

2. 与 React Router 5.x 版本相比，改变了什么？

   * 内置组件的变化：移除 `<Switch/>` ，新增 `<Routes/>` 等。

   * 语法的变化：`component={About}` 变为 `element={<About/>}` 等。

   * 新增多个hook：`useParams`、`useNavigate`、`useMatch` 等。
   
   * ......

### Component

#### `<BrowserRouter>`

1. 说明：`<BrowserRouter> `用于包裹整个应用。

2. 示例代码：

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   
   ReactDOM.render(
     <BrowserRouter>
       {/* 整体结构（通常为App组件） */}
     </BrowserRouter>,root
   );
   ```

#### `<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x 版本中`<HashRouter>`、`<BrowserRouter> ` 的用法与 5.x 相同。

#### `<Routes/> 与 <Route/>`

1. v6版本中移除了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4.  `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当URL发生变化时，`<Routes>`都会查看其所有子`<Route>`元素以找到最佳匹配并呈现组件 。

6.  `<Route>`也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码：

   ```jsx
   <Routes>
       /* path 属性用于定义路径，element 属性用于定义当前路径所对应的组件 */
       <Route path="/login" element={<Login />} />
   
   		 /* 用于定义嵌套路由，home是一级路由，对应的路径/home*/
       <Route path="home" element={<Home />}>
          /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
         <Route path="test1" element={<Test/>}></Route>
         <Route path="test2" element={<Test2/>}></Route>
   		</Route>
   	
   		//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
       <Route path="users">
          <Route path="xxx" element={<Demo />} />
       </Route>
   </Routes>
   ```

#### `<Link>`

1. 作用: 修改URL，且不发送网络请求（路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：

   ```jsx
   import { Link } from "react-router-dom";
   
   function Test() {
     return (
       <div>
       	<Link to="/路径">按钮</Link>
       </div>
     );
   }
   ```

#### `<NavLink>`

1. 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

2. 示例代码：

   ```jsx
   // 注意: NavLink默认类名是active，下面是指定自定义的class
   
   //自定义样式
   <NavLink
       to="login"
       className={({ isActive }) => {
           console.log('home', isActive)
           return isActive ? 'base one' : 'base'
       }}
   >login</NavLink>
   
   /*
   	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
   	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
   */
   <NavLink to="home" end>home</NavLink>
   ```

#### `<Navigate>`

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是push）。

3. 示例代码：

   ```jsx
   import React, { useState } from 'react'
   import { Navigate } from 'react-router-dom'

   export default function Home() {
   const [sum, setSum] = useState(1)

   return (
        <div>
          <h3>我是Home的内容</h3>
          {sum === 2 ? <Navigate to="/about" /> : <h4>sum = {sum}</h4>}
          <button onClick={() => setSum(2)}>sum to 2</button>
        </div>
    )
   }
   ```

#### `<Outlet>`

1. 当`<Route>`产生嵌套时，渲染其对应的后续子路由。

2. 示例代码：

   ```jsx
   // 根据路由表生成对应的路由规则
   const element = useRoutes([
     {
       path: '/about',
       element: <About/>
     },
     {
       path: '/home',
       element: <Home/>,
       children: [
         {
           path: 'news',
           element: <News/>
         },
         {
           path: 'message',
           element: <Message/>,
         }
       ]
     }
   ])
   
   // Home.jsx
   import React from 'react'
   import { NavLink, Outlet } from 'react-router-dom'
   
   export default function Home() {
   	return (
   		<div>
   			<h2>Home组件内容</h2>
   			<div>
   				<ul className="nav nav-tabs">
   					<li>
   						<NavLink className="list-group-item" to="news">News</NavLink>
   					</li>
   					<li>
   						<NavLink className="list-group-item" to="message">Message</NavLink>
   					</li>
   				</ul>
   				{/* 指定路由组件呈现的位置 */}
   				<Outlet />
   			</div>
   		</div>
   	)
   }
   ```

### Hooks

#### `useRoutes()`

1. 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

2. 示例代码：

   ```jsx
   // 路由表配置：src/routes/index.js
   import About from '../pages/About'
   import Home from '../pages/Home'
   import { Navigate } from 'react-router-dom'
   
   export default [
   	{
   		path:'/about',
   		element:<About/>
   	},
   	{
   		path:'/home',
   		element:<Home/>
   	},
   	{
   		path:'/',
   		element:<Navigate to="/about"/>
   	}
   ]
   
   // App.jsx
   import React from 'react'
   import { NavLink,useRoutes } from 'react-router-dom'
   import routes from './routes'
   
   export default function App() {
   	// 根据路由表生成对应的路由规则
   	const element = useRoutes(routes)
    
   	return (
   		<div>
              {/* 注册路由 */}
              {element}
   		</div>
   	)
   }
   ```

#### useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

   ```jsx
   import React from 'react'
   import { useNavigate } from 'react-router-dom'
   
   export default function Demo() {
     const navigate = useNavigate()

     const handle = () => {
       // 第一种使用方式：指定具体的路径
       navigate('/login', {
         replace: false,
         state: { a:1, b:2 }
       })

       // 第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
       navigate(-1)
     }
     
     return (
       <div>
         <button onClick={handle}>按钮</button>
       </div>
     )
   }
   ```

#### useParams()

1. 作用：当前匹配路由的`params`参数，类似于 5.x 中的 `match.params`。

2. 示例代码：

   ```jsx
   import React from 'react';
   import { Routes, Route, useParams } from 'react-router-dom';
   import User from './pages/User'
   
   function ProfilePage() {
     // 获取URL中携带过来的params参数
     let { id } = useParams();
   }
   
   function App() {
     return (
       <Routes>
         <Route path="users/:id" element={<User />}/>
       </Routes>
     );
   }
   ```

#### useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的 search 参数、更新 search 的函数。

3. 示例代码：

   ```jsx
   import React from 'react'
   import { useSearchParams } from 'react-router-dom'
   
   export default function Detail() {
   	const [search, setSearch] = useSearchParams()
   	const id = search.get('id')
   	const title = search.get('title')
   	const content = search.get('content')

   	return (
   		<ul>
   			<li>
   				<button onClick={() => setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
   			</li>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   ```

#### useLocation()

1. 作用：获取当前 location 信息，对标 5.x 中的路由组件的 `location` 属性。

2. 示例代码：

   ```jsx
   import React from 'react'
   import { useLocation } from 'react-router-dom'
   
   export default function Detail() {
   	const x = useLocation()
   	console.log('@', x)
   	/*
        x 就是location对象：
       {
         hash: "",
         key: "ah9nv6sz",
         pathname: "/login",
         search: "?name=zs&age=18",
         state: {a: 1, b: 2}
       }
   	*/
   	return (
   		<ul>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   ```

#### useMatch()

1. 作用：返回当前匹配信息，对标5.x中的路由组件的`match`属性。

2. 示例代码：

   ```jsx
   <Route path="/login/:page/:pageSize" element={<Login />}/>
   <NavLink to="/login/1/10">登录</NavLink>
   
   export default function Login() {
     const match = useMatch('/login/:x/:y')
     console.log(match) // 输出match对象
     // match对象内容如下：
     /*
     	{
         params: {x: '1', y: '10'}
         pathname: "/login/1/10"  
         pathnameBase: "/login/1/10"
         pattern: {
         	path: '/login/:x/:y', 
         	caseSensitive: false, 
         	end: false
         }
       }
     */
     return (
     	<div>
         <h1>Login</h1>
       </div>
     )
   }
   ```

#### useInRouterContext()

作用：如果组件是在 `<Router>` 的上下文中，则 `useInRouterContext` 钩子返回 true，否则返回 false。

如果我们是一个第三方组件的封装者，我们需要知道别人是否是在路由的环境下使用我们的组件，就可以使用这个 hook

#### useNavigationType()

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP` 是指在浏览器中直接打开了这个路由组件（刷新页面）。

#### useOutlet()

1. 作用：用来呈现当前组件中渲染的嵌套路由。
2. 示例代码：

   ```jsx
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由没有挂载,则 result 为 null
   // 如果嵌套路由已经挂载,则 result 为嵌套的路由对象
   ```

#### useResolvedPath()

作用：给定一个 URL值，解析其中的：path、search、hash值。

```jsx
console.log(useResolvedPath('/user?id=001&name=tom#qwe'))
// { "pathname": "/user", "search": "?id=001&name=tom", "hash": "#qwe" }
```
