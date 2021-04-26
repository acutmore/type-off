import 'wasi';

// import CJSImportProcessor from "./CJSImportProcessor";
// import computeSourceMap, {RawSourceMap} from "./computeSourceMap";
// import {HelperManager} from "./HelperManager";
// import identifyShadowedGlobals from "./identifyShadowedGlobals";
// import NameManager from "./NameManager";
// import {validateOptions} from "./Options";
// import {parse} from "./parser";
// import type {Scope} from "./parser/tokenizer/state";
// import TokenProcessor from "./TokenProcessor";
// import RootTransformer from "./transformers/RootTransformer";
// import formatTokens from "./util/formatTokens";
// import getTSImportedNames from "./util/getTSImportedNames";

// export interface TransformResult {
class TransformResult {
  code: string;
  constructor(code: string) {
      this.code = code;
  }
//   sourceMap?: RawSourceMap;
}

// export interface SucraseContext {
//   tokenProcessor: TokenProcessor;
//   scopes: Array<Scope>;
//   nameManager: NameManager;
//   importProcessor: CJSImportProcessor | null;
//   helperManager: HelperManager;
// }

// // Re-export options types in an isolatedModules-friendly way so they can be used externally.
// export type Options = import("./Options").Options;
// export type SourceMapOptions = import("./Options").SourceMapOptions;
// export type Transform = import("./Options").Transform;

// export function getVersion(): string {
//   // eslint-disable-next-line
//   return require("../package.json").version;
// }

// export function transform(code: string, options: Options): TransformResult {
function transform(code: string): TransformResult {
//   validateOptions(options);
//   try {
    // const sucraseContext = getSucraseContext(code, options);
    // const transformer = new RootTransformer(
    //   sucraseContext,
    //   options.transforms,
    //   Boolean(options.enableLegacyBabel5ModuleInterop),
    //   options,
    // );
    // let result: TransformResult = {code: transformer.transform()};
    let result: TransformResult = new TransformResult(code);
    // if (options.sourceMapOptions) {
    //   if (!options.filePath) {
    //     throw new Error("filePath must be specified when generating a source map.");
    //   }
    //   result = {
    //     ...result,
    //     sourceMap: computeSourceMap(result.code, options.filePath, options.sourceMapOptions),
    //   };
    // }
    return result;
//   } catch (e) {
//     if (options.filePath) {
//       e.message = `Error transforming ${options.filePath}: ${e.message}`;
//     }
//     throw e;
//   }
}

/**
 * Return a string representation of the sucrase tokens, mostly useful for
 * diagnostic purposes.
 */
// export function getFormattedTokens(code: string, options: Options): string {
//   const tokens = getSucraseContext(code, options).tokenProcessor.tokens;
//   return formatTokens(code, tokens);
// }

/**
 * Call into the parser/tokenizer and do some further preprocessing:
 * - Come up with a set of used names so that we can assign new names.
 * - Preprocess all import/export statements so we know which globals we are interested in.
 * - Compute situations where any of those globals are shadowed.
 *
 * In the future, some of these preprocessing steps can be skipped based on what actual work is
 * being done.
 */
// function getSucraseContext(code: string, options: Options): SucraseContext {
//   const isJSXEnabled = options.transforms.includes("jsx");
//   const isTypeScriptEnabled = options.transforms.includes("typescript");
//   const isFlowEnabled = options.transforms.includes("flow");
//   const file = parse(code, isJSXEnabled, isTypeScriptEnabled, isFlowEnabled);
//   const tokens = file.tokens;
//   const scopes = file.scopes;

//   const nameManager = new NameManager(code, tokens);
//   const helperManager = new HelperManager(nameManager);
//   const tokenProcessor = new TokenProcessor(code, tokens, isFlowEnabled, helperManager);
//   const enableLegacyTypeScriptModuleInterop = Boolean(options.enableLegacyTypeScriptModuleInterop);

//   let importProcessor = null;
//   if (options.transforms.includes("imports")) {
//     importProcessor = new CJSImportProcessor(
//       nameManager,
//       tokenProcessor,
//       enableLegacyTypeScriptModuleInterop,
//       options,
//       options.transforms.includes("typescript"),
//       helperManager,
//     );
//     importProcessor.preprocessTokens();
//     // We need to mark shadowed globals after processing imports so we know that the globals are,
//     // but before type-only import pruning, since that relies on shadowing information.
//     identifyShadowedGlobals(tokenProcessor, scopes, importProcessor.getGlobalNames());
//     if (options.transforms.includes("typescript")) {
//       importProcessor.pruneTypeOnlyImports();
//     }
//   } else if (options.transforms.includes("typescript")) {
//     identifyShadowedGlobals(tokenProcessor, scopes, getTSImportedNames(tokenProcessor));
//   }
//   return {tokenProcessor, scopes, nameManager, importProcessor, helperManager};
// }


// AssemblyScript WASI wrapper: stdout(transform(stdin()))

const bufferIn = new ArrayBuffer(2 ** 13);
const view = new DataView(bufferIn);
const count = process.stdin.read(bufferIn, 0);
view.setUint8(count + 1, 0);
const code = String.UTF8.decode(bufferIn, true);
const out = transform(code);
process.stdout.write(out.code);
