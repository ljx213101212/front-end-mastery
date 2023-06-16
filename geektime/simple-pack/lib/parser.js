import { parse, importDeclaration } from "@babel/parser";
import fs from 'fs';
import traverse from '@babel/traverse';
import { transformFromAstSync } from "@babel/core";

export class Parser {
    constructor() {}

    getAST(filePath) {
        const code = fs.readFileSync(filePath, 'utf-8');
        const options = {
            sourceType: 'module'
        }
        return parse(code, options);
    }

    getDependencies(ast) {
        const dependencies = [];
        
        traverse(ast, {
            ImportDeclaration: (path) => {
                const { node } = path;
                const { value } = node.source;
                dependencies.push(value);
            }
        })
        return dependencies;
    }

    generateES5Code(ast) {
        const result = transformFromAstSync(ast, undefined, {
            presets: ['@babel/preset-env']
        })
        return result.code;
    }
}