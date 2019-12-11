import { test1 } from './test1.js';
import { test2 } from './test2.js';
import { test3 } from './test3.js';
import { test4 } from './test4.js';
import { test5 } from './test5.js';
import { test6 } from './test6.js';
import { test7 } from './test7.js';


mocha.setup('bdd');

const assert = chai.assert;
const expect = chai.expect;

test1(assert, expect);
test2(assert, expect);
test3(assert, expect);
test4(assert, expect);
test5(assert, expect);
test6(assert, expect);
test7(assert, expect);

mocha.run();

