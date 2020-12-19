# Docs

<a href="https://docs.htmlcsstoimage.com"><img src="https://res.cloudinary.com/hcti/image/fetch/c_limit,f_auto,q_auto,w_1200/https://docs.htmlcsstoimage.com/assets/images/html-css-to-image.png" width="600" /></a>

👋 This is the source for our documentation site: https://docs.htmlcsstoimage.com.

If you've found an error, or would like to suggest an improvement, please open an issue or a pull request.

## Get help
If you need help with your account, please email us: support@htmlcsstoimage.com

## Development

This is a static site generated by Jekyll and served from [Cloudflare Workers](https://blog.cloudflare.com/workers-sites/).

To run it locally, you need Ruby installed.

1. Install the gems

```
bundle install
```

2. Start the development server

```
HCTI_API_KEY=key bundle exec jekyll serve --livereload
```

`HCTI_API_KEY` is only required to be set for production. You can set it to a fake value for development.

## Production
[![](https://github.com/htmlcsstoimage/docs/workflows/Deploy/badge.svg)](https://github.com/htmlcsstoimage/docs/actions)

Docs are built and deployed with GitHub Actions.
