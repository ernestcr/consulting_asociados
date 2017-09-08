module.exports = {
  mapArray: function (array, field) {
    return array.map(item => {
      return item[field];
    })
  }
};