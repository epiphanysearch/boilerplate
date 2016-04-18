"format amd";

define(['app/main'], function () {

});

// Wanting to use ES6?
// If you're wanting to use ES6 the entire module should use CommonJS syntax.
// JSPM will compile this all down to ES5 with Babel, however, if you're
// needing to support IE8, just use ES5, we still haven't fixed all the issues.

/*
import 'app/main';
import TestES5 from 'app/es5';
import TestES6 from 'app/es6';

// 1. Main will continue to run, nothing changes here.
// 2. ES5: using traditional require syntax we export a single object.
new TestES5('es5').alert();
// 3. ES6: we're only exporting a default here so its still as simple.
new TestES6('es6').alert();
// TODO: make this a generator option.
*/
