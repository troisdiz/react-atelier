import hook from 'css-modules-require-hook'
import sass from 'node-sass'
import path from 'path'

hook({
    extensions: ['.scss'],
    preprocessCss: function (css, filepath) {
        var result =  sass.renderSync({
            data: css,
            includePaths: [ path.resolve(filepath, '..') ]
        });

        return result.css;
    },
    generateScopedName: '[local]'
});