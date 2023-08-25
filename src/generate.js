const at = require('./at');
const be = require('./be');
const de = require('./de');
const frEs = require('./fr-es');
const lu = require('./lu');
const nl = require('./nl');
const ch = require('./ch');
const cz = require('./cz');

(async () => {
  await Promise.all([at(), be(), de(), frEs(), lu(), nl(), ch(), cz()]);
})();
