# Storyblok

## Home assignment

This repo contains tests for the Storyblok home assignment to exercise Assets and Replace functionality

## Installation
You need to have Node.js installed before using Cypress.
For rest of the installations move to project folder in command prompt and type `npm install` which will install all dependencies needed to successfully execute tests

## Test structure

Page Object model is used to increase readability and make code easier to manage

## Running tests
To run tests in interactive mode use:
`npm run cypress:open`

To run tests in headless mode use:
`npm run cypress:run`

### Environment variables
The following Environment Vars should be set before running the tests

- `USER_EMAIL`
- `USER_PASSWORD`
- `API_TOKEN`
- `SPACE_ID`

Create a `cypress.env.json` in the root of the project and add the corresponding information