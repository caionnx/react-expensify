# Expensify
[![Coverage Status](https://coveralls.io/repos/github/caionnx/react-expensify/badge.svg?branch=master)](https://coveralls.io/github/caionnx/react-expensify?branch=master)
[![Build Status](https://travis-ci.org/caionnx/react-expensify.svg?branch=master)](https://travis-ci.org/caionnx/react-expensify)

A project to learn and develop React SPA. [https://react-expensify-nn.herokuapp.com](https://react-expensify-nn.herokuapp.com)

Made with Andrew Mead's [The Complete React Web Developer Course (with Redux)](https://www.udemy.com/react-2nd-edition/). You can see his live demo [here](http://react-course-2-expensify.herokuapp.com/dashboard). Major features in this project:
- Add category to your expense.
- Significantly bundle size improvement.
- Login with Email account.
- Login anonymously to see a demo.

### Todo
- Improve organization of files and folders structure
- Apply Lighthouse tips on perfomance
- Change requisition to render fast dashboard page

### Scripts

Create bundle as production environment:
```
yarn run build-prod
```
For local development. Accesible from `localhost:8080`:
```
yarn run dev-server
```

### Running the tests

ESLint
```
yarn run js-lint
```
Jest
```
yarn test
yarn test --watch
yarn test --coverage
```
### Built With

* React
* Firebase
* Heroku

### License
This project is licensed under the MIT License
