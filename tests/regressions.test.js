var swig = require('../lib/swig'),
  expect = require('expect.js'),
  fs = require('fs');

describe('Regressions', function () {
  it('gh-285: preserves forward-slashes in text', function () {
    expect(swig.render('foo\\ blah \\ and stuff'))
      .to.equal('foo\\ blah \\ and stuff');
  });

  it('gh-303: sets work in loops', function () {
    var opts = { locals: { b: [1] }};
    expect(swig.render('{% set foo = "old" %}{% for a in b %}{% if a %}{% set foo = "new" %}{% endif %}{% endfor %}{{ foo }}', opts))
      .to.equal('new');
  });

  it('gh-322: logic words are not partially matched', function () {
    expect(swig.render('{{ org }}', { locals: { org: 'foo' }})).to.equal('foo');
    expect(swig.render('{{ andif }}', { locals: { andif: 'foo' }})).to.equal('foo');
  });

  // The following tests should *not* run in the browser
  if (!fs || !fs.readFileSync) {
    return;
  }

  it('gh-287: Options object overwrite exposure', function () {
    var opts = {};
    swig.compileFile(__dirname + '/cases/extends_1.test.html', opts);
    expect(Object.keys(opts)).to.eql([]);
  });
});
