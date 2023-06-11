const glob = require('glob-all');

describe('Checking generated css js files', () => {
    const cssJSFiles = [
        './geekdist/index_*.js',
        './geekdist/index_*.css',
        './geekdist/search_*.js',
        './geekdist/search_*.css',
    ]
    it('should generate css js files', (done) => {
        const files = glob.sync(cssJSFiles);
        if (files.length === cssJSFiles.length) {
            done();
        } else {
            throw new Error('not enough css js files generated');
        }
    });
});