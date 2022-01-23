const EventEmitter = require("events");

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
    self._emitter.once("toggle", () => resolve(true));
  });
};

QueueManager.prototype.resume = function () {
  const ack = this._emitter.emit("toggle");
  if (!ack) {
    console.log(
      `resume event wasn't consumed, queue will resume after it's drained`
    );
  }
};
