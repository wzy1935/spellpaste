import PromiseWorker from "promise-worker";

const worker = new Worker(new URL('./sandboxWorker.js', import.meta.url), {
  type: 'module',
});
const promiseWorker = new PromiseWorker(worker)

async function safeEval(code, content) {
  return promiseWorker.postMessage({ code, content })
}

async function unsafeEval(code, content) {
  return await (async () => eval(code))();
}

export default {
  safeEval,
  unsafeEval
}