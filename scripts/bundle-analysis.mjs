import { visualizer } from 'rollup-plugin-visualizer';

// Astro builds multiple Vite environments. Give each a separate report so
// build-time modules cannot overwrite or inflate the browser bundle report.
// Keep reports outside dist so they can never become public assets.
export default function bundleAnalysis() {
  return {
    name: 'hcti-bundle-analysis',
    hooks: {
      'astro:build:setup': ({ updateConfig }) => {
        updateConfig({
          plugins: ['client', 'ssr', 'prerender'].flatMap((environment) =>
            ['html', 'json'].map((format) => ({
              ...visualizer({
                filename: `reports/bundle-${environment}.${format}`,
                template: format === 'json' ? 'raw-data' : 'treemap',
                gzipSize: true,
                brotliSize: true,
                open: false,
              }),
              applyToEnvironment: (env) => env.name === environment,
            })),
          ),
        });
      },
    },
  };
}
