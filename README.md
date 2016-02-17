# Impossible Fish

An exploration of modern full-stack web technologies.

You can see this running at [www.impossiblefish.com](http://www.impossiblefish.com).

## Running Locally
Clone the repository and run via npm:
```bash
npm install
npm run dev
```

Then point your browser at `localhost:8080`

## Technologies Investigated
Each and everyone of these bullet points is worthy of a 60 minute presentation!

### Client
* [React](http://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
 * [react bindings](https://github.com/reactjs/react-redux)

### Server
* [Node](https://nodejs.org)
 * web serving via [express](http://expressjs.com/)
 * security via [helmet](https://www.npmjs.com/package/helmet)
 * different versions via [nvm](https://github.com/creationix/nvm)

### Build
* [Npm](https://www.npmjs.com/)
 * as a build tool
* [Webpack](https://webpack.github.io/)
 * in-line styles
 * [post-css](http://postcss.org/) tooling:
 [autoprefixer](https://github.com/postcss/autoprefixer)
 * embedded fonts
 * transpiling via [Babel](https://babeljs.io/)
* Deployment
 * optimisation
 * cloud via [OpenShift](https://www.openshift.com/)

### Language
* es6
 * polyfills
 * transpilers
* CSS3
 * transitions vs animations
 * interactivity via 'hacks'

## Licence

The MIT Licence (MIT)

Copyright (c) 2016 Incremental Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
