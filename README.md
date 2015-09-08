# babbler
Wrapper for the Google Chrome speech synthesis and web speech recognition APIs.

## Why?

Nicer API. Just that. You can very much use the vanilla speech synthesis and speech recognition APIs if you like, this just provides a nicer way to interact with them. The final decision is up to you.

## Use it

It was developed entirely with ES2015 but compiled to ES5 using babel. You will need to import it using something like browserify, webpack, etc.

Babbler exports two functions: **speak** and **recognizer**.

It does not import any es6-promise polyfill, that is up to you.

### speak

```js
import { speak } from 'babbler';

speak("Hey, it's me!").then(e => {
  console.log('Browser finished speaking!', e);
});
```

`speak` takes the string to speak and returns a promise that will be fulfilled when the browser ends speaking. The promise will be rejected if the browser does not support `speechSynthesis` API.

### recognizer

Instances a new speech recognizer.

```js
import { recognizer } from 'babbler';

let r = recognizer({
  onStart(e) {
    // foo
  },

  onEnd(e) {
    // foo
  },

  onResult(e) {
    // foo
  },

  onError(e) {
    // foo
  },

  continuous: false,
  interimResults: false
});

// Start speech recognition
r.start();

// Stop speech recognition
r.stop();

// redefine onStart callback
r.onStart(e => {
  // you can redefine the event handlers
});

// All parameters are optional in the recognizer constructor.
// In fact, you can initialize a default recognizer like this:
let r2 = recognizer();
```

## Tests

By now you must have realized the library has no tests. Why? Because everything would need to be mocked and test how a wrapper behaves with a mock does not make any sense. So don't expect any tests. It's just a wrapper, anyway.
