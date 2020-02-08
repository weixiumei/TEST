// node app.js

let uniq = require('uniq')

let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')
module1.far()
console.log(uniq(module1.arr))
module2()
module3.foo()
module3.bar()