export interface BuildExecutorSchema {
    index: string;
    root: string;
    // Always required since you're building from steal config
    stealConfig: string;
    assets: string[];
    dist: string;
}
