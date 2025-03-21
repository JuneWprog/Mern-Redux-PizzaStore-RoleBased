# React + Vite

# React + Vite +tailWind + React Route + redux
## create react project with Vite
### `npm create vite@latest shopping-cart --template react` 
### `cd shopping-cart `
### `npm install @reduxjs/toolkit react-redux react-icons react-router-dom `
### `npm install`
### `npm install -D tailwindcss@3 postcss autoprefixer `
### `npx tailwindcss init -p`

## config tailwind.config.js   https://v3.tailwindcss.com/docs/guides/vite
`npm run dev`

# Redux 
Redux is a pattern and library for managing and updating global application state, where the UI triggers events called "actions" to describe what happened, and separate update logic called "reducers" updates the state in response. It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion. The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur.
![alt text](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
## Store

The centralized state for the entire application.
Created using configureStore().

## Reducer

A pure function that takes the current state and an action, then returns a new state.

Defined inside a slice when using Redux Toolkit.


## Slice (Redux Toolkit)
A wrapper around reducers and actions, making Redux easier to use.

Created using createSlice().

## Action
A plain JavaScript object that describes an event in the application.

Has a type property and sometimes a payload.

Created automatically when using createSlice().

## Dispatch
A function that sends actions to the reducer to update the store.

Used with useDispatch() in React components.

## Selector
A function that extracts data from the Redux store.

Used with useSelector() in React components.

1️⃣ 用户在 UI 组件中触发一个事件（比如点击按钮）。
2️⃣ 事件触发 Action（动作）并 Dispatch（分发）到 Redux Store（存储）。
3️⃣ Reducer（状态处理函数）接收 Action 并计算新的状态。
4️⃣ Store 存储新的状态。
5️⃣ React 组件通过 useSelector 监听状态变化，并重新渲染 UI。
 
Role-Based Routing
Role-based access control (RBAC)
ProtectedRoute Component

Role-Based Layouts

Role-Based Sidebar Navigation

API Role Validation

Logout and Redirect Management


Users are redirected to the correct portal based on their role.

Unauthorized users see an Access Denied message.

Admins and users have separate interfaces and sidebars.

Logout functionality works seamlessly.

The backend verifies roles for secure API access.