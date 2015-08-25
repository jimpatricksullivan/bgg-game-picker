var karmaBase = '/base/public/';

var tests = [];
for (var file in window.__karma__.files) {
    if (file.indexOf(karmaBase + 'spec/') === 0 && file.indexOf('.spec') >= 0) {
        tests.push(file);
    }
}

require.baseUrl = karmaBase + 'src/';
require.deps = tests;
require.callback = window.__karma__.start;
requirejs.config(require);