const loadtest = require('loadtest');

loadtest.loadTest({
  url: `http://${process.env.NODE_ENV === 'docker' ? 'server' : 'localhost'}:3000`,
  maxRequests: 61,
  maxSeconds: 60,
  statusCallback(error, result, latency) {
    console.info('body =', result.body);
  }
}, (error, result) => {
  if (error) {
    console.error('Test error');
  } else {
    console.log('Test done!!!');
  }
});