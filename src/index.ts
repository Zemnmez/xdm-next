import * as consts from 'next/constants';

export interface NextConfig<WebpackConfig = unknown, Webpack = unknown> {
    /**
     * Environment variables (`process.env`)
     * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
     */
    env?: { [environmentVariableName: string]: string }
    
    /**
     * base deploy path
     * @see https://nextjs.org/docs/api-reference/next.config.js/basepath
     */
    basePath?: string

    /**
     * @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
     */
    rewrites?: () => Promise<{
        source: string, destination: string,
        /**
         * Path is automatically prefixed with 
         * unless set to false.
         * @see NextConfig (basePath)
         */
        basePath?: boolean,
        /**
         * locale automatically prefixes path unless this is set to false
         * @default true
         */
        locale?: boolean
    }[]>

    /**
     * @see https://nextjs.org/docs/api-reference/next.config.js/redirects
     */
    redirects?: () => Promise<{
        source: string,
        destination: string,
        permanent?: boolean,
        locale?: boolean,
        basePath?: boolean
    }[]>
    
    /**
     * @see https://nextjs.org/docs/api-reference/next.config.js/headers
     */
    headers?: () => Promise<{
        source: string
        headers: { key: string, value: string }[]
        locale?: boolean
    }>

    /**
     * @see https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
     */
    pageExtensions?: string[]

    /**
     * @see https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
     */
    assetPrefix?: string

    webpack?: (config: WebpackConfig, { buildId, dev, isServer, defaultLoaders, webpack }: { buildId : string, dev: boolean, isServer: boolean, defaultLoaders: Object, webpack: Webpack } ) => WebpackConfig

    compress?: boolean

    serverRuntimeConfig?: Record<string, string>

    poweredByHeader?: boolean
    generateEtags?: boolean
    distDir?: string
    generateBuildId?: () => Promise<string>
    onDemandEntries?: {
        maxInactiveAge?: number,
        pagesBufferLength?: number
    }

    typescript?: {
        ignoreBuildErrors?: boolean
    }

    /** (TODO) */
    exportPathMap: unknown
    trailingSlash?: boolean
    reactStrictMode?: boolean

}

type Phase =
    typeof consts.PHASE_EXPORT |
    typeof consts.PHASE_PRODUCTION_BUILD |
    typeof consts.PHASE_PRODUCTION_SERVER;

/**
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
interface NextConfigFunction {
    (phase: Phase, { defaultConfig }: { defaultConfig?: NextConfig }): NextConfig
}

/**
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
type NextConfigExport = NextConfigFunction | NextConfig;

type XDMPluginOptions = unknown;

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

export default xdmPlugin;