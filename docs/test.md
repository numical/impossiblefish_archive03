# Testing

Two aspects to testing:
* unit testing
* integration testing

## Unit Testing
**NOT YET IMPLEMENTED**

This should be fast and part of an immediate edit-save-test-run cycle.

Unit testing GUI's has always been problematic. [React](http://reactjs.com) offers features that make this a whole lot simpler, especially when combined with a [Flux](https://github.com/facebook/flux)-lite architecture featuring [Redux](https://github.com/reactjs/redux):
* React's architecture results in a tree of components with an uni-directional flow of data;
* the leaf nodes are the only components to modify the GUI and do so in a pure functional manner;
* the 'GUI' here is actually React's virtual DOM, hence no heavy, slow actual DOM implementation is
needed;
* the application state is held as immutable objects replaced by explicit actions hence all state changes (carrie out by the reducers) are also pure functions;
* consequenty the only part of the architecture with side-effects and state-realted logic are the intermediate container components
Of course, having no real DOM means that unit tests cannot cover all use cases of thee application -
especially those triggered by changes in the hosting DOM environment (window resizes etc.).
Furthermore they cannot cover the eccentricities of different browser implementations.  Hence we
also need:

## Integration Testing
This ensures core user stories for the application and is run before a build and deploy.

Client code must be tested against different browsers.

We use:
* [Karma](https://karma-runner.github.io)
* [Mocha](http://mochajs.org/)
* [Chai](http://chaijs.com/)

**Note**: we are developing on a Linux box so can currently test against Chrome, Firefox and
[PhantomJS](http://phantomjs.org/). PhantomJS should give us coverage for
[WebKit](https://webkit.org/)-based browsers but we cannot directly test against Safari.  Any
feedback from Safari users most warmly accepted!
