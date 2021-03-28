"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdmPlugin = void 0;
const xdmPlugin = (options) => (config) => ({
    ...config,
    pageExtensions: [...config?.pageExtensions ?? []],
    webpack(wpcfg, ...a) {
        wpcfg = {
            ...wpcfg,
            module: {
                ...wpcfg?.module,
                rules: [
                    ...wpcfg?.module?.rules,
                    { test: /\.mdx$/, use: [{ loader: 'xdm/webpack.cjs', options }] }
                ]
            }
        };
        if (config.webpack)
            wpcfg = config.webpack(wpcfg, ...a);
        return wpcfg;
    }
});
exports.xdmPlugin = xdmPlugin;
exports.default = exports.xdmPlugin;
//# sourceMappingURL=index.js.map