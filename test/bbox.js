var test = require('tape');
var geofilter = require('..');
var samples = require('./data/samples.js');

test('can parse a simple bounding box filter', function(t) {
  var filter;

  t.plan(2);
  filter = geofilter(samples.bbox);

  t.equal(filter.rules.length, 1, 'parsed one rule');
  t.equal(filter.rules[0].type, 'bbox', 'rule detected as bbox');
});

test('all bbox attributes are correctly parsed', function(t) {
  var rule;

  t.plan(6);
  rule = geofilter(samples.bbox).rules[0];

  t.ok(rule.min, 'have a min pos');
  t.equal(rule.min.lat, -28.1819);
  t.equal(rule.min.lon, 153.1453);
  t.ok(rule.max, 'have a max pos');
  t.equal(rule.max.lat, -27.9935);
  t.equal(rule.max.lon, 153.4162);
});