export interface ServeExecutorSchema {
    index: string;
    root: string;
    // Only required for development, not for production
    stealConfig?: string;
    port: number;
}
