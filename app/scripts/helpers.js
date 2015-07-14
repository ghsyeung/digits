export function vecDot(u, v) {
  return _.reduce(_.zip(u, v), function(a, x) {
    return a + x[0] * x[1];
  }, 0);
}

export function vecAdd(u, v) {
  return _.map(_.zip(u, v), function(arr) {
    return arr[0] + arr[1];
  });
}

export function sigmoid(z) {
  return 1.0/(1.0 + math.exp(-z));
}
