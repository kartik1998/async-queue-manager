const EventEmitter = require("events");

function QueueManager(queue) {
  this._emitter = new EventEmitter();
  const self = this;
  this.state = "running";
  queue.drain(() => {
    self._emitter.emit("toggle");
  });
}

QueueManager.prototype.pause = function () {
  const self = this;
  this.state = "paused";
  return new Promise((resolve) => {
    self._emitter.once("toggle", () => resolve(true));
  });
};

QueueManager.prototype.resume = function () {
  if (this.state === "running") return;
  const ack = this._emitter.emit("toggle");
  if (!ack) {
    console.log(
      `resume event wasn't consumed, queue will resume after it's drained`
    );
  } else {
    this.state = "running";
  }
};
