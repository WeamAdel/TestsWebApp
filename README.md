# Tests Web App (Evaluation Test Project)

## Contents

- [Tests Web App (Evaluation Test Project)](#tests-web-app-evaluation-test-project)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Demo](#demo)
  - [Installation Instructions](#installation-instructions)
  - [Run The App](#run-the-app)
  - [Files Structure and Organization](#files-structure-and-organization)
  - [Naming Convention](#naming-convention)
  - [Database and Storage](#database-and-storage)
  - [Access and Authorization](#access-and-authorization)

---
---

## Overview

**Tests Web App** is a website for teachers to create online tests, so that they can evaluate their students.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Demo

Here is a **[demo](https://tender-aryabhata-cb3afa.netlify.app/)** hosted on _netlify_.

---

## Installation Instructions

`npm i`

Installs all the dependencies needed for the app to run.

---

## Run The App

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

## Files Structure and Organization

- **src**
  Where you can find all the source code needed for the porject

  - **components/:** Contains all the components needed for the project. usually as a hierarchy of _/components/pageName/childComponents_, unless the component is a shared one like **buttons** and **inputs** it will be in the _/components/shared/_ or if the component is a layout component such as **navbar** then it's located in _/components/layout/_.

    - _/components/AppWrapper.js_: This component wraps my component's tree and once mounted it reads the _localStorage_ to see whether the user is signed in or not and if he/she is signed in, it fetches his/her account data such as _username_, _admin authority_, etc. and update the _auth_ module's store so that these data is accessible to all the components.

  - **configs/:** Where my project app configuration such as _firebase_ config object and _axios_ configs.

  - **forms/:**:

    - _inputProps.js:_ Where you can find _input field's_ properties such as `label`, `placeholder`, `id`, `name`, etc.
    - _/validation:_ Where you can find validation schemas for all of my form inputs.

    - **redux/:**: Contains my redux store, with _ConfigureStore.js_ as the main configuration file for the whole store.
      Each module for the project (now I only have _auth_) will follow this file structure:
      - _ActionCreators:_ Where you can find my actions.
      - _ActionTypes:_ Contains the necessary action types for the reducers to decide which action to dispatch.
      - _Reducer:_ Where you can find what this module's initial store tree should look like, and you cand find what action is taken after dispatching an action of a certain type.
      - _Utility:_ Contains Utility functions needed to update the reducers's state.
    - **App.js**: Contains _routes_, _errors boundary_ and my _redux store provider_ for the whole app.

    - **index.js**: Contains global packages used thoughout the app such as _jquery_ and _bootstrap_. It also initializes the react app.

- **public**
  Where you can find all my assets which contain:
  - **styles/:** for _css_ and _sass_ files.
  - **images/:** for images

---

## Naming Convention

- **functions**
  - _API_: API functions (function that executes an action over firebase) contains the acronym _API_ in its name.
  - _POST_: Post requests start with _do_, e.g. `doAPIAddTest`.
  - _GET_: Get requests start with _get_, e.g. `getAPITests`.

---

## Database and Storage

This project uses the authentication and the realtime database provided by [firebase](https://firebase.google.com/).

---

## Access and Authorization

As mentioned in the project requirements there are two types of users:

- **Admins**: Those are the teachers who are allowed to create testes and are given the admins's authority manually by me, so if you want to test the admin's dashboard please access admins' accounts using any of the following _email,password_ pairs
  1. admin:
     - _email:_ admin@gmail.com
     - _password:_ 123456
  1. admin2:
     - _email:_ admin2@gmail.com
     - _password:_ 123456
- **normal users**: Normal user is anyone who signs up on the site. They are not given the admin's authority by default so, this user can only access and submit answers to all of the testes on the website and can not create tests.

---

Thank you so much 😊. If you have any inquiries please contact me on **weamadel.dev@gmail.com**
