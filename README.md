# React Event Scheduler App

![](https://github.com/AhmedAlatawi/react-event-scheduler/actions/workflows/main.yml/badge.svg)
[![codecov](https://codecov.io/gh/AhmedAlatawi/react-event-scheduler/graph/badge.svg?token=EG9GTUBOUE)](https://codecov.io/gh/AhmedAlatawi/react-event-scheduler)
[![License: MIT](https://img.shields.io/github/license/AhmedAlatawi/react-event-scheduler)](https://github.com/AhmedAlatawi/react-event-scheduler/blob/master/LICENSE)

This project was bootstrapped with [Vite](https://vite.dev/).

![](./images/react-event-pic.gif)

Event Scheduler is a React app that allows users to create events. An event can be anything, such as a sport event, team meeting, party announcement, personal advertisement, etc. An event consists of title, start and end date/time, and description. Events can also be shared on FB or Twitter.
All events are public by default (visible to everyone). They can also be private (only visible to you) by checking the private checkbox.

> If you're looking for a frontend or backend starter project, check these out:
>
> - **[Frontend starter project](https://github.com/ahmedalatawi/react-graphql-starter)** built with React, GraphQL (Apollo client) and Typescript.
> - **[Backend starter project](https://github.com/ahmedalatawi/nodejs-graphql-fake-api)** built with NodeJS, GraphQL (Apollo server), TypeScript, MongoDB and Prisma.

### [Demo](https://react-event-scheduler.vercel.app/) :movie_camera:

## Tech Stack

### Frontend

- React (react hooks)
- Typescript
- Bootstrap/react-bootstrap
- Styled components
- Apollo client
- JS cookie

### Backend

- NodeJS with Express
- Typescript
- Apollo server express
- JSON web token
- MongoDB with mongoose

#

Note that `graphql` schemas are generated on the frontend using [GraphQL Code Generator](https://www.graphql-code-generator.com/docs/getting-started). This means that if you make any changes to the schema (server/graphql/schema/index.ts), make sure that the `.graphql` files in the frontend are also updated accordingly.

Next, run `yarn codegen` to re-generate the queries and mutations (before you do this, make sure the server is up and running by either running `yarn start` or `yarn start:server`)

## Run app locally

> Make sure MongoDB is up and running

Create a `.env` file in the project's root directory, and copy & paste what's in `.env.example`, then run `yarn`:

### `yarn start`

Runs the backend and frontend apps simultaneously in the development mode.

> Or if you prefer running the apps separately by running `yarn start:web` and `yarn start:server` in separate terminals.

The app will automatically start at [http://localhost:3000](http://localhost:3000) in the browser.

You will also see any Lint or Typescript errors in the console.

## Current functionality

- User signup and login
- Create, update and delete events
- Search & pagination
- Make events as private (only visible to creators)
- Session expiry warning (displayed when being idle for 3 minutes after logging in)
- Share events with family & friends on Facebook and X

### Coming soon

- User profile
- Admin tab & profile

## Run unit tests

coming soon...

## Run E2E tests

coming soon...

### Author :books:

[Ahmed Alatawi](https://github.com/AhmedAlatawi)
