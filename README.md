# xdm-next

A [next.js] plugin for [xdm]'s [webpack plugin][xdm/webpack].

## Install

### Add Dep

```bash
yarn add --dev xdm-next
```

### Add to config

<!-- do not update this example, update example.js -->
```js
// example.js

import xdm from 'xdm-next';

// base config
module.exports = {
    // next.js base config
    pageExtensions: [ ".txt" ] // for example
}

// example plugins
module.exports = myPlugin({ configFlag: true })(module.exports);
module.exports = xdm()(module.exports);
```

## Configuration

The first parameter to [`xdm()`][plugin def] is the same `options` that are passed
to the `xdm` [webpack plugin][xdm/webpack]:

```ts
// src/index.ts#L109-L127

export const xdmPlugin = (options: XDMPluginOptions) => (config: NextConfig): NextConfig => ({
    ...config,
    pageExtensions: [ ...config?.pageExtensions ?? [] ],
    webpack(wpcfg, ...a) {
        wpcfg = {
            ...wpcfg as any,
            module: {
                ...(wpcfg as any)?.module,
                rules: [
                    ...(wpcfg as any)?.module?.rules,
                    { test: /\.mdx$/, use: [{loader: 'xdm/webpack.cjs', options }] }
                ]
            }
        }

        if (config.webpack) wpcfg = config.webpack(wpcfg, ...a);
        return wpcfg
    }
})
```

## Missing bits
1. I made some effort to add types to this plugin. Even though `next.config.js` is not a typescript file, VSCode and other typescript IDEs will recognise
the types it specifies. These types are missing a few things, such as the WebPack config types, which are too complicated to express here.<br/>
I am happy to accept PRs to improve these types.

2. It is not possible without modifying the library to parse files that do not have filenames that end in `.mdx`. Plumbing this through is a little tricky
as XDMPluginOptions is untyped (unknown). Also happy to accept PRs improving this.


[xdm]: https://github.com/wooorm/xdm
[next.js]: https://nextjs.org/
[xdm/webpack]: https://github.com/wooorm/xdm#webpack
[plugin def]: src/index.ts#L109-L127
[XDMPluginOptions]: src/index.ts#L107