// An webworker script, used by evaluateService.js only
import 'ses';
import registerPromiseWorker from 'promise-worker/register'

lockdown()


registerPromiseWorker(({code, content}) => {
  const compartment = new Compartment({
    globals: {
      content: harden(content),
      Date: harden(Date),
      Math: harden(Math)
    },
    __options__: true,
  });
  return compartment.evaluate(code)
});