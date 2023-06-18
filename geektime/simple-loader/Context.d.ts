//refer from webpack/declarations/LoaderContext.d.ts => NormalModuleLoaderContext
export interface ContextOptions {
    cacheable(flag?: boolean): void;
    emitFile(
		name: string,
		content: string | Buffer,
		sourceMap?: string,
		assetInfo?: Record<string, any>
	): void;
    getOptions(): OptionsType;
}