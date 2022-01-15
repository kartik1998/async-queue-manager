const EventEmitter = require('events');

function QueueManager(queue) {
  this._emitter = new EventEmitter();
  const self = this;
  queue.drain(() => {
    self._emitter.emit("toggle");
  });
}

QueueManager.prototype.pause = function () {
  const self = this;
  return new Promise((resolve) => {
    self._emitter.on("toggle", () => resolve(true));
  });
};

QueueManager.prototype.resume = function () {
  this._emitter.emit("toggle");
};
