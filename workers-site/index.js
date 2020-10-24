import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(redirectOrHandleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function redirectOrHandleEvent(event) {
  var url = new URL(event.request.url);
  var path = url.pathname.replace(/\/$/, "");
  var site = "https://docs.htmlcsstoimage.com";

  switch(path) {
    case "/getting-started/creating-an-image":
      return Response.redirect(site + '/getting-started/using-the-api/', 301);
      break;
    case "/getting-started/deleting-an-image":
      return Response.redirect(site + '/getting-started/using-the-api/', 301);
      break;
    case "/getting-started/retrieving-an-image":
      return Response.redirect(site + '/getting-started/using-the-api/', 301);
      break;
    case "/getting-started/authentication":
      return Response.redirect(site + '/getting-started/using-the-api/', 301);
      break;
    case "/getting-started/full-page-images":
      return Response.redirect(site + '/getting-started/convert-emails-images/', 301);
      break;
    case "/getting-started/duplicate-image-detection":
      return Response.redirect(site + '/guides/duplicate-image-detection/', 301);
      break;
    case "/getting-started/faq":
      return Response.redirect(site + '/faq', 301);
      break;
    case "/advanced-examples/using-google-fonts":
      return Response.redirect(site + '/guides/using-google-fonts', 301);
      break;
    case "/advanced-examples/rendering-emoji":
      return Response.redirect(site + '/guides/rendering-emoji', 301);
      break;
    case "/advanced-examples/image-charts-with-highcharts":
      return Response.redirect(site + '/guides/image-charts-with-highchartsjs', 301);
      break;
    case "/advanced-examples/transparent-background":
      return Response.redirect(site + '/guides/transparent-background', 301);
      break;
    case "/advanced-examples/external-css-and-fonts":
      return Response.redirect(site + '/guides/external-css-js-and-fonts/', 301);
      break;
    case "/getting-started/lossless-image-optimization":
      return Response.redirect(site + '/getting-started/file-formats', 301);
      break;
    case "/advanced-examples/instagram-embed":
      return Response.redirect(site + '/guides/instagram-embed/', 301);
      break;
    case "/advanced-examples/twitter-embed":
      return Response.redirect(site + '/guides/twitter-embed/', 301);
      break;
    case "/getting-started/integromat-integration":
      return Response.redirect(site + '/integrations/integromat/', 301);
      break;
    case "/getting-started/zapier-integration":
      return Response.redirect(site + '/integrations/zapier/', 301);
      break;
    case "/getting-started/convert-emails-images":
      return Response.redirect(site + '/guides/convert-emails-images/', 301);
      break;
    case "/getting-started/file-formats":
      return Response.redirect(site + '/guides/file-formats/', 301);
      break;
    case "/guides/twitter-embed":
      return Response.redirect(site + '/guides/twitter-screenshot/', 301);
      break;
    default:
      return await handleEvent(event);
      break;
  }
}

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}
  let cacheControl = {}

  if (event.request.url.match(/\.js$/) || event.request.url.match(/\.css$/) || event.request.url.match(/\.png$/)) {
    cacheControl = {
      browserTTL: 365* 60 * 60 * 24,
      edgeTTL: 30 * 60 * 60 * 24,
      bypassCache: false, // do not bypass Cloudflare's cache
    }
  } else {
    cacheControl = {
      browserTTL: 600,
      edgeTTL: 60,
      bypassCache: false, // do not bypass Cloudflare's cache
    }
  }
  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    } else {
      options.cacheControl = cacheControl
    }

    const page = await getAssetFromKV(event, options)

    // allow headers to be altered
    const response = new Response(page.body, page)

    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'unsafe-url')
    response.headers.set('Feature-Policy', 'none')

    return response

  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}


