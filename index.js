const Koa = require('koa');
const Redis = require('ioredis');
const ratelimit = require('koa-ratelimit');
const app = new Koa();

app.use(ratelimit({
  max: 60,
  db: new Redis(6379, process.env.NODE_ENV === 'docker' ? 'demo-redis' : 'localhost'),
  duration: 60000, // 1 min
  id: (ctx) => ctx.ip,
  errorMessage: 'Error',
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  disableHeader: false,
}));

app.use(async (ctx) => {
  const total = ctx.response.header['rate-limit-total'];
  const remaining = ctx.response.header['rate-limit-remaining'];
  ctx.body = total - remaining;
});

app.listen(3000, () => console.info('listening on port 3000'));

module.exports = app;