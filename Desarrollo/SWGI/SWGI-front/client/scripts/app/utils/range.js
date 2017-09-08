

module.exports = {
  from: 0,
  to: 0,
  step: 1,
  getRange: function () {
    var input = [];
    for (var i = this.from; i <= this.to; i += this.step) input.push(i);
    return input;
  },
  from(value) {
    this.from = value
    return this;
  },
  to(value) {
    this.to = value
    return this;
  },
  withStep(value) {
    this.step = value
    return this;
  }
};