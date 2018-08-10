process.env.UV_THREADPOOL_SIZE = 1;
// const cluster = require('cluster');
// const os = require('os');

// // is the file being executed in master mode?
// // if (cluster.isMaster) {
// //   // Cause index.js to be executed *again* but in child mode
// //   let counter = 0;
// //   while (counter < os.cpus().length) {
// //     cluster.fork();
// //     counter++;
// //   }
// // } 

const express = require('express');
const crypto = require('crypto');
const Worker = require('webworker-threads').Worker;
const app = express();

app.get('/', (req, res) => {
  // crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  //   res.send('Hello!');
  // })
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;
      while (counter < 1 * 1e9) {
        counter++;
      }
      postMessage(counter);
    }

  });

  worker.onmessage = function(message) {
    console.log(message.data)
    res.send('' + message.data)
  }

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('Fast!');
})

app.listen(3000);
