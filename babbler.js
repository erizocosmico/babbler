"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recogniser = recogniser;
exports.speak = speak;
var noop = function noop() {
  return undefined;
};

var recogniserPrototype = {
  /**
   * Starts the speech recognition
   * @method start
   */
  start: function start() {
    this.r.start();
  },

  /**
   * Stops the speech recognition
   * @method stop
   */
  stop: function stop() {
    this.r.stop();
  },

  /**
   * Establishes an on start callback
   * @param {Function} fn callback
   */
  onStart: function onStart(fn) {
    this.r.onstart = fn;
  },

  /**
   * Establishes an on result callback
   * @param {Function} fn callback
   */
  onResult: function onResult(fn) {
    this.r.onresult = fn;
  },

  /**
   * Establishes an on end callback
   * @param {Function} fn callback
   */
  onEnd: function onEnd(fn) {
    this.r.onend = fn;
  },

  /**
   * Establishes an on error callback
   * @param {Function} fn callback
   */
  onError: function onError(fn) {
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

function recogniser() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var continuous = opts.continuous;
  var interimResults = opts.interimResults;
  var onStart = opts.onStart;
  var onResult = opts.onResult;
  var onEnd = opts.onEnd;
  var onError = opts.onError;

  if (!window.webkitSpeechRecognition) {
    return undefined;
  }

  var r = new webkitSpeechRecognition();
  r.continuous = continuous || false;
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

function speak(text) {
  if (!window.speechSynthesis) {
    return Promise.reject(false);
  }

  var msg = new SpeechSynthesisUtterance(text);

  return new Promise(function (resolve) {
    msg.onend = function (e) {
      resolve(e);
    };

    speechSynthesis.speak(msg);
  });
}
