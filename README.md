# AutoFi Coding Challenge
A ReactJS project based on [create-react-app](https://github.com/facebook/create-react-app) and [Material UI](https://material-ui.com/) that fetches from the posts and comments APIs and allows a user to comment on posts.

## Installation

```js
yarn install
```

## How to run the app

```js
yarn start
```

Run `yarn start` and navigate to http://localhost:3000 to see the app running

## Testing

```js
yarn test
```

Run `yarn test` to execute the unit tests and check the results in your terminal

## Features

- Lazy loading for showing more posts when page scroll reaches bottom
- Skeleton screen is shown while waiting for api response
- State persistance on page reload
- React Context Api - User credentials are managed via context provider and stored in localStorage
- Material UI - For UI components, icons and styled components
- Testing library based on Jest

## Dependencies

- axios
- prop-types
- react-redux
- redux
- redux-persist
- redux-thunk
- @material-ui/core
- @material-ui/icons
- @material-ui/lab

