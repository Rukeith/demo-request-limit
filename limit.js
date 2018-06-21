module.exports = (opts = {}) => {

  return async (ctx, next) => {
    const ip = ctx.ip;
    let data = await opts.db.get(ip);

    if (!data) {
      const now = new Date().getTime();
      ctx.set({
        'Rate-Limit-Remaining': 1,
        'Rate-Limit-Reset': now + opts.duration,
        'Rate-Limit-Total': opts.max
      });
      await opts.db.set(ip, 1);
      await opts.db.pexpire([ip, opts.duration]);
      return await next();
    }

    if (++data > opts.max) {
      ctx.status = 429;
      ctx.body = opts.errorMessage;
    } else {
      await opts.db.set(ip, data);
      await opts.db.pexpire([ip, opts.duration]);
      ctx.set({
        'Rate-Limit-Remaining': data,
        'Rate-Limit-Reset': ctx.headers['rate-limit-reset'],
        'Rate-Limit-Total': opts.max
      });
      return await next();
    }
  };
};