const { PI } = Math
console.log(exports === module.exports)
exports.area = (r) => PI*r*r
exports.circumference = (r) => PI*r*2
