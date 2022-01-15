# async-queue-manager ![](https://img.shields.io/badge/npm-async--queue-green) ![](https://img.shields.io/badge/async-queue--manager-blue)

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

#### When should you use it?

Let's say that you have to load a huge csv file from disk or maybe s3 into memory, convert it into json chunks and do some procesing over it. If you're using (for example) a micro instance (which may already have some heavy processes running) then you only have limited amount of memory and after loading the entire csv file into memory you don't want your queue to use too much memory too. This is where queue manager helps you in pausing and waiting for your queue to clear up a bit before you start loading it again.

### License

<b>[MIT](https://github.com/kartik1998/async-queue-manager/blob/master/LICENSE) </b>
