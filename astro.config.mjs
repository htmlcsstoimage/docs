import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import navigation from './src/navigation.mjs';
import markdownExports from './scripts/markdown-exports.mjs';
import starlightImageZoom from 'starlight-image-zoom';
import externalLinks from './scripts/external-links.mjs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.DOCS_ORIGIN || 'http://localhost:4321',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: page => !new URL(page).pathname.startsWith('/og/') }), starlight({
    title: 'HTML/CSS to Image',
    description: 'Generate images from HTML and CSS. Developer documentation for HTML/CSS to Image.',
    favicon: '/favicon.ico',
    sidebar: navigation,
    plugins: [starlightImageZoom()],
    customCss: ['./src/styles/global.css'],
    components: { TwoColumnContent: './src/components/TwoColumnContent.astro', Sidebar: './src/components/Sidebar.astro', MobileMenuFooter: './src/components/MobileMenuFooter.astro', PageFrame: './src/components/PageFrame.astro', Header: './src/components/Header.astro', SiteTitle: './src/components/SiteTitle.astro', Footer: './src/components/Footer.astro', PageTitle: './src/components/PageTitle.astro', Head: './src/components/Head.astro' },
    editLink: { baseUrl: `https://github.com/htmlcsstoimage/docs/edit/${process.env.DOCS_BRANCH || 'docs-new'}/` },
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    pagination: false,
    credits: false,
    head: process.env.DOCS_ENV === 'production' ? [] : [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }],
  }), externalLinks(), markdownExports()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        onwarn(warning, warn) {
          // Astro 7 emits this legacy marker in generated content modules.
          // Asset propagation uses module IDs and __astroPropagation metadata,
          // so the bundler dropping this directive does not affect our output.
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE'
            && warning.message.includes('"use astro:head-inject"')
            && warning.message.includes('?astroPropagatedAssets')) return;
          warn(warning);
        },
      },
    },
  },
});
