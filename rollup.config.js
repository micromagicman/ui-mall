import babel        from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import commonjs     from 'rollup-plugin-commonjs';
import del          from 'rollup-plugin-delete';
import image        from 'rollup-plugin-img';
import resolve      from 'rollup-plugin-node-resolve';
import external     from 'rollup-plugin-peer-deps-external';
import postcss      from 'rollup-plugin-postcss';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'esm'
        }
    ],
    plugins: [
        external(),
        resolve({
            mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            extensions
        }),
        image({
            output: 'dist/images',
            extensions: /\.(png|jpg|jpeg|gif|svg)$/,
            limit: 8192,
            exclude: 'node_modules/**'
        }),
        postcss({
            plugins: [autoprefixer()],
            minimize: true,
            modules: false,
            use: {
                sass: null,
                stylus: null,
                less: {
                    javascriptEnabled: true
                }
            },
            extract: true,
            config: {
                path: './postcss.config.js',
                ctx: null
            }
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            extensions
        }),
        commonjs(),
        del({
            targets: ['dist/*']
        })
    ],
    external: Object.keys(pkg.peerDependencies || {})
};