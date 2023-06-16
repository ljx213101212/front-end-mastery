import { Compiler } from "./compiler";
import path from "path";
/**@typedef {import("../declarations/SimplepackOptions").SimplepackOptions} SimplepackOptions*/

const createCompiler = options => {
  const compiler = new Compiler(options);
  return compiler;
};
const simplepack = options => {
  const compiler = createCompiler(options);
  compiler.run();
};
simplepack({
  entry: path.join(__dirname, "../test/index.js"),
  output: path.join(__dirname, "../test/bundle.js")
});