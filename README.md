# queue-manager

A wrapper over [async](https://caolan.github.io/async/v3/docs.html) queue helpful in managing the queue length

### Usage example

```javascript
// inputArray of huge length (approx 1000 or more)
const lowWaterMark = 40; // whatever you want it to be
const highWaterMark = 100; // whatever you want it to be

function main(inputArray) {
  const queue = async.queue(worker, 20);
  async function worker(input, cb) {
    console.log("queue length -->", queue.length());
    if (queue.length() <= lowWaterMark) queueManager.resume();
    await doSomething(input);
    return cb();
  }
  const queueManager = new QueueManager(queue);
  for (const input of inputArray) {
    if (queue.length() >= highWaterMark) await queueManager.pause(); // pauses the loop till queue length has decreased below low watermark
    queue.push(input);
  }
}
```
