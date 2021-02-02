export function classnames(...args) {
  try {
    if (!args.length) throw new ReferenceError(args);
    const _class = Array.prototype.slice.call(args);

    if (!_class.every((item) => !!item && typeof item === 'string')) {
      throw new RangeError(_class);
    }

    return _class.filter((e) => !!e).join(' ');
  } catch (e) {
    return e instanceof RangeError || e instanceof ReferenceError;
  }
}
