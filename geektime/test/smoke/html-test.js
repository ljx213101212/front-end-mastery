const glob = require('glob-all');

describe('Checking generated html files', () => {
    it('should generate html files', (done) => {
        const files = glob.sync([
            './geekdist/index.html',
            './geekdist/search.html'
        ]);
        if (files.length === 2) {
            done();
        } else {
            throw new Error('not enough html files generated');
        }
    });
});