const path = require("path");
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import packageJSON from "./package.json";
// import images from 'rollup-plugin-image-files';
import image from 'rollup-plugin-img';
import alias from 'rollup-plugin-alias';

const input = "./src/index.js";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs",
      sourcemap: true
    },
    plugins: [
      alias({
        entries: {
          "react-router-dom": path.resolve(__dirname, 'node_modules/react-router-dom/cjs/react-router-dom.js'),  // trying to solve route must be within router
        }
      }),
      image({
        output: `lib/imgs`, // default the root
        extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
        limit: 1234568192,  // default 8192(8k)
        exclude: ['node_modules/**']
      }),
      // images(),
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs(
        {
          include: 'node_modules/**',
          // include: /node_modules/
          namedExports: {
            // seems to prevent error 'isValidElementType is not exported'
            'node_modules/react-is/index.js': ['isValidElementType'],
            'react-is': ['isValidElementType', 'ForwardRef', 'Memo', 'isFragment']
          }
        }
      )
    ],
    external: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'prop-types',
      'aws-amplify',
    ],
  },
]