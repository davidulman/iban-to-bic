export let entry: string;
export let devtool: string;
export namespace module {
    let rules: {
        test: RegExp;
        use: string;
        exclude: RegExp;
    }[];
}
export namespace resolve {
    let extensions: string[];
}
export namespace output {
    let filename: string;
    let path: string;
    let libraryTarget: string;
    let library: string;
    let umdNamedDefine: boolean;
    let auxiliaryComment: string;
}
