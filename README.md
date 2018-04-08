# Static Website Boilerplate
This boilterplate is based on [`html5boilerplate`](https://html5boilerplate.com/). You need to have [Docker](https://www.docker.com/) installed and that is it! you are ready to go.
![Alt Text](https://media.giphy.com/media/Rbt3HJ6pSpyco/giphy.gif)
## Features
    
- [Gulp](https://gulpjs.com/)
- [Docker](https://www.docker.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Mustahe](https://mustache.github.io/) as templeting engine
- [Font Awesome](https://fontawesome.com/)
- [Sass](https://sass-lang.com/)
- Live reload using [Browsersync](https://browsersync.io/)
- Default print styles, performance optimized.
- [Apache Server Configs](https://github.com/h5bp/server-configs-apache) that, among other, improve the web site's performance and security
- [Normalize.css](https://necolas.github.com/normalize.css/)
- A custom build of [Modernizr](https://modernizr.com/) for feature
    detection

## Getting Started

Clone the repo

```sh
git clone https://github.com/BasselAlshK/static-website.git
```
Build Docker image & run docker container to install the dependencies
```sh
cd static-website
docker run -it --rm -v $(pwd):/usr/node-app bassel/web-app npm install
```
To run this project in development mode; make `run-dev` file executable, then run:
```sh
./run-dev
Then open http://localhost:3000/ to see your app.
```

To run this project in production mode, make `run-prod` file executable, then run:
```sh
./run-prod
```
this will create a folder `public` which contains minfied and optimized files ready to be deployed. 
# User Guide
to be continued
## License
[MIT](LICENSE)
