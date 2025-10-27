import PromiseWorker from "promise-worker";

const worker = new Worker(new URL('./sandboxWorker.js', import.meta.url), {
  type: 'module',
});
const promiseWorker = new PromiseWorker(worker)

async function evaluate(code, content) {
  return promiseWorker.postMessage({code, content})
}

export default {
  evaluate
}