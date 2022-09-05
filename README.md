# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) but the app has been ejected so build scripts etc. are all in the repo now.

## Environment variables

The app uses the `dotenv` package to provide access to environment variables.
Copy the example files into the correct place:

```
cp .env.example .env

cp .env.webcomponent.example .env.webcomponent
```

Variables for the web application need to go into the `.env` file.
Variables for the web component can be placed in `.env.webcomponent`.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Web Component

The repo includes the Editor Web Component which shares components with the editor application but has a separate build process.

### Embedding

The web component can be included in a page by using the `<editor-wc>` HTML element.  It takes the following attributes

* `code`: A preset blob of code to show in the editor pane.
* `sense_hat_always_enabled`: Show the Astro Pi Sense HAT emulator on page load

### `yarn start:wc`

Runs the web component in development mode.  Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

**NB** You need to have the main `yarn start` process running too.

It is possible to add query strings to control how the web component is configured.  Any HTML attribute can be set on the query string, including `class`, `style` etc.

For example, to load the page with the Sense Hat always showing, add [`?sense_hat_always_enabled` to the URL](http://localhost:3001?sense_hat_always_enabled)

## Deployment

Deployment is managed through Giithub actions.  The UI is deployed to staging and production environments via an S3 bucket.  This requires the following environment variables to be set

* `AWS_ACCESS_KEY_ID`
* `AWS_REGION`
* `AWS_S3_BUCKET`
* `AWS_SECRET_ACCESS_KEY`

Other variables that pertain to the app, rather than its deployment are set with defaults in the [build-and-deploy workflow](./.github/workflows/build-and-deploy.yml).  These are also in `.env.example`.

### Review apps

Currently the build is deployed to both S3 and Heroku.  The PR should get updated with the Heroku URL, and the web component demo is at `/web-component.html` on the Heroku review app domain.

