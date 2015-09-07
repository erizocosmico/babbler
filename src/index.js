const noop = () => undefined;

const recogniserPrototype = {
  /**
   * Starts the speech recognition
   * @method start
   */
  start() {
    this.r.start();
  },

  /**
   * Stops the speech recognition
   * @method stop
   */
  stop() {
    this.r.stop();
  },

  /**
   * Establishes an on start callback
   * @param {Function} fn callback
   */
  onStart(fn) {
    this.r.onstart = fn;
  },

  /**
   * Establishes an on result callback
   * @param {Function} fn callback
   */
  onResult(fn) {
    this.r.onresult = fn;
  },

  /**
   * Establishes an on end callback
   * @param {Function} fn callback
   */
  onEnd(fn) {
    this.r.onend = fn;
  },

  /**
   * Establishes an on error callback
   * @param {Function} fn callback
   */
  onError(fn) {
    this.r.onerror = fn;
  }
};

/**
 * Returns a recogniser object that contains all the methods in the
 * recogniserPrototype.
 * @param {Object} opts Options
 *  - {boolean} continuous Not end the process when the user stops talking
 *  - {boolean} interimResults Show interim results
 *  - {Function} onStart onstart callback
 *  - {Function} onEnd onend callback
 *  - {Function} onError onerror callback
 *  - {Function} onResult onresult callback
 * @return {recogniser}
 */
export function recogniser(opts = {}) {
  let {
    continuous,
    interimResults,
    onStart,
    onResult,
    onEnd,
    onError
  } = opts;

  if (!window.webkitSpeechRecognition) {
    return undefined;
  }

  const r = new webkitSpeechRecognition();
  r.continuous = continuous || false;
  r.interimResults = interimResults || false;
  r.onstart = onStart || noop;
  r.onend = onEnd || noop;
  r.onerror = onError || noop;
  r.onresult = onResult || noop;

  return Object.create(recogniserPrototype, {
    r: {
      value: r,
      enumerable: false
    }
  });
}

/**
 * Speaks the given text and returns a promise with the onend event.
 * @param {string} text Text to speak
 * @return {Promise} rejected if the browser has no support for speech
 * synthesis or a promise that will be resolved when the browser ends
 * speaking.
 */
export function speak(text) {
  if (!window.speechSynthesis) {
    return Promise.reject(false);
  }

  let msg = new SpeechSynthesisUtterance(text);

  return new Promise(resolve => {
    msg.onend = e => {
      resolve(e);
    };

    speechSynthesis.speak(msg);
  });
}
