const path = require("path");
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import packageJSON from "./package.json";
// import image from 'rollup-plugin-image';
import alias from 'rollup-plugin-alias';

const input = "./src/index.js";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");
import nodeResolve from 'rollup-plugin-node-resolve';


// export default {
//   input,
//     output: {
//       file: packageJSON.main,
//       format: "cjs",
//       sourcemap: true
//       // sourcemap: false
//     },
//   // output: {
//   //   file: 'bundle.js',
//   //   format: 'umd',
//   //   name: 'mvp-webapp',
//   //   indent: false,
//   //   sourcemap: false,
//   // },
//   plugins: [
//     // nodeResolve(),
//     babel({
//       exclude: "node_modules/**"
//     }),
//     external(),
//     resolve(),
//     commonjs(
//       {
//         include: 'node_modules/**',
//         // include: /node_modules/
//         namedExports: {
//         }
//       }
//     )
//   ],
// }

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
        "react-router-dom": path.resolve(__dirname, 'node_modules/react-router-dom/'),  // trying to solve route must be within router
      }
    }),
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
            'react-is': ['isValidElementType']
          }
        }
    )
    ],
    external: ['react', 'react-dom', 'react-redux', 'prop-types', 'styled-components'],

  },
]
  // {
  //   input,
  //   output: {
  //     file: minifyExtension(packageJSON.main),
  //     format: "cjs",
  //     sourcemap: true
  //   },
  //   plugins: [
  //     babel({
  //       exclude: "node_modules/**"
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //     uglify(),
  //   ]
  // },
  // // UMD
  // {
  //   input,
  //   output: {
  //     file: packageJSON.browser,
  //     format: "umd",
  //     sourcemap: true,
  //     name: "reactSampleComponentsLibrary",
  //     globals: {
  //       react: "React",
  //       "@emotion/styled": "styled",
  //       "@emotion/core": "core"
  //     }
  //   },
  //   plugins: [
  //     babel({
  //       exclude: "node_modules/**"
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs()
  //   ]
  // },
  // {
  //   input,
  //   output: {
  //     file: minifyExtension(packageJSON.browser),
  //     format: "umd",
  //     sourcemap: true,
  //     name: "reactSampleComponentsLibrary",
  //     globals: {
  //       react: "React",
  //       "@emotion/styled": "styled",
  //       "@emotion/core": "core"
  //     }
  //   },
  //   plugins: [
  //     babel({
  //       exclude: "node_modules/**"
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //     terser()
  //   ]
  // },
  // // ES
  // {
  //   input,
  //   output: {
  //     file: packageJSON.module,
  //     format: "es",
  //     sourcemap: true,
  //     exports: "named"
  //   },
  //   plugins: [
  //     babel({
  //       exclude: "node_modules/**"
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs()
  //   ]
  // },
  // {
  //   input,
  //   output: {
  //     file: minifyExtension(packageJSON.module),
  //     format: "es",
  //     sourcemap: true,
  //     exports: "named"
  //   },
  //   plugins: [
  //     babel({
  //       exclude: "node_modules/**"
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //     terser()
  //   ]
  // }
// ];
