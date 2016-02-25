# Testing

Two aspects to testing:
* unit testing
* integration testing

## Unit Testing
This should be fast and part of an immediate edit-save-test-run cycle.
Consequently:
* avoid the actual DOM  and rely on React's virtual DOM;
* use mocks for state

**NOT YET IMPLEMENTED**

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
