# Unsplash Coding Challenge

- [Quickstart](#quickstart)
- [Code Challenge Discussion Topics](#code-challenge-discussion-topics)
- [Developer Getting Started](#developer-getting-started)
  * [Running without Docker](#running-without-docker)
  * [Testing](#testing)
    + [Frontend](#frontend)
    + [Backend](#backend)

## Quickstart
1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Clone this repository and place your Unsplash access key in a file named `.env` at the repository root.
    ```bash
    $ git clone https://github.com/mattcarpenter/zt-code-challenge.git
    $ cd zt-code-challenge
    $ echo UNSPLASH_ACCESS_KEY=<your access key> > .env
    ```
3. Build and run the application
    ```bash
    $ docker-compose build && docker-compose up
    ```
The image search application will be available at [http://localhost:4900](http://localhost:4900).

See [Developer Getting Started](#developer-getting-started) for more information on running and testing the front-end and back-end components of this application.

## Code Challenge Discussion Topics

Please see [CODE_CHALLENGE_DISCUSSION.md](/CODE_CHALLENGE_DISCUSSION.md) for todos and responses to the rational questions.

## Developer Getting Started

The following instructions assume you are running in a Unix environment. have Node.JS installed, and placed your Unsplash Access Key in a file called `.env` in the root of repository.

### Running without Docker

1. Start the backend express server
    ```bash
    $ cd backend
    $ npm install
    $ npm start
   ```
2. Start the frontend dev server
    ```bash
    $ cd ../frontend/
    $ npm install
    $ npm start
    ```

Backend [http://localhost:4900/api/search?query=kittens](http://localhost:4900/api/search?query=kittens)

Frontend: [http://localhost:3000/](http://localhost:3000)

Note: The dev server is configured to proxy requests to the backend e.g: [http://localhost:3000/api/search?query=kittens](http://localhost:3000/api/search?query=kittens)

### Testing

Test sources are colocated with the components and other sources under test.

#### Frontend

```bash
$ cd frontend/
$ npm test
```

#### Backend

```bash
$ cd backend/
$ npm test
```
