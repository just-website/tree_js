import scss from 'rollup-plugin-scss';
export default {
    input: './src/index.js',
    output: {
        file: './www/bundle.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        scss({
            output: './www/bundle.css'
        })
    ]
}