import { Parser } from "./parser";
import fs from "fs";

export class Compiler {

    constructor(options) {
        this.entry = options.entry;
        this.output = options.output;

        //ref: lib/Module.js
        this.modules = [];
        this.parser = new Parser();
    }

    run() {
       const mod = this._buildModule(this.entry);
       this.modules.push(mod);
       mod.dependencies.forEach(dep => {
          this.modules.push(this._buildModule(dep))
       });
       this._emit();
    }

    _buildModule(filePath) {
        const ast = this.parser.getAST(this.entry);
        const code = this.parser.generateES5Code(ast);
        return {
            filePath,
            dependencies: this.parser.getDependencies(ast),
            code
        }
    }

    _emit() {
        let bundle = "";
        this.modules.forEach((mod) => {
            bundle += mod.code;
            bundle += "\n";
        });
        fs.writeFileSync(this.output, bundle, 'utf-8');
    }
}