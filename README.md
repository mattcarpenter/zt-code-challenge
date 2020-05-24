# Unsplash Coding Challenge

## Quickstart
1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Clone this repository
    ```bash
    git clone https://github.com/mattcarpenter/zt-code-challenge.git
    ```
3. Register an [Unsplash](https://unsplash.com/developers) account and obtain an access key 
4. Place the access key in a file called `.env` in the repository root
    ```bash
    cd zt-code-challenge
    echo UNSPLASH_ACCESS_KEY=<your access key> > .env
    ```
5. Build and run the application
    ```bash
    docker-compose build && docker-compose up
    ```
The image search application may be accessed at [http://localhost:4900](http://localhost:4900).