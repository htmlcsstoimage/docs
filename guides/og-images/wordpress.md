---
layout: page
title: Generate Automatic Open Graph Images for your WordPress Site
nav_title: WordPress
permalink: /guides/og-images/wordpress/
parent: OG Images
grand_parent: Guides
nav_order: 5
description: >-
  Add automatic Open Graph images to every WordPress post, page, archive, and custom post type with theme hooks and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your WordPress Site
{: .no_toc }
{: .fs-9 }

Generate a path-specific HCTI social card for every WordPress post, page, archive, and custom post type.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Create an [OG Image Config](/getting-started/og-images/) for the exact public HTTPS origin of the WordPress site and copy its domain ID.

Choose **Page Screenshot** to capture WordPress output or a selected element. Choose **Template Values** to combine your theme's SEO metadata with an HCTI template.

Add PHP customizations in a small site plugin or a child theme's `functions.php`. Do not edit the parent theme, because a theme update can remove the change.

## Build the HCTI image URL

Add this helper and replace `YOUR_DOMAIN_ID`:

```php
function mysite_hcti_og_image_url( $existing = '' ) {
    $request_uri = isset( $_SERVER['REQUEST_URI'] )
        ? wp_unslash( $_SERVER['REQUEST_URI'] )
        : '/';
    $path = wp_parse_url( $request_uri, PHP_URL_PATH );

    if ( ! is_string( $path ) || '' === $path ) {
        $path = '/';
    }

    return 'https://hcti.io/v1/og/YOUR_DOMAIN_ID' . $path;
}
```

Parsing only `PHP_URL_PATH` removes tracking and preview query strings. HCTI then visits the same path on the configured WordPress origin.

## Option A: a site without an SEO social-tag plugin

If nothing else generates Open Graph or Twitter image tags, print them through `wp_head`:

```php
function mysite_print_hcti_og_tags() {
    $image_url = mysite_hcti_og_image_url();
    ?>
    <meta property="og:image" content="<?php echo esc_url( $image_url ); ?>">
    <meta property="og:image:secure_url" content="<?php echo esc_url( $image_url ); ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="<?php echo esc_url( $image_url ); ?>">
    <?php
}
add_action( 'wp_head', 'mysite_print_hcti_og_tags', 5 );
```

Your active theme must call `wp_head()` inside its document `<head>`, as standard WordPress themes do.

## Option B: Yoast SEO already generates the tags

Do not add a duplicate set. Filter Yoast's existing image values instead:

```php
add_filter( 'wpseo_opengraph_image', 'mysite_hcti_og_image_url' );
add_filter( 'wpseo_twitter_image', 'mysite_hcti_og_image_url' );
```

Yoast's Open Graph image filter replaces an image only when Yoast would otherwise emit one. Make sure social metadata is enabled and a fallback image is configured. Other SEO plugins have their own filters; use the plugin's documented image filter rather than the generic `wp_head` block.

## Use post data in Template Values mode

HCTI can map the `og:title`, `og:description`, page title, and description that your SEO plugin already emits. To pass explicit WordPress values, add more tags through `wp_head`:

```php
function mysite_print_hcti_template_values() {
    if ( ! is_singular() ) {
        return;
    }

    $post_id = get_queried_object_id();
    ?>
    <meta property="html:tv:headline" content="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
    <meta property="html:tv:author" content="<?php echo esc_attr( get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $post_id ) ) ); ?>">
    <meta property="hcti:content_version" content="<?php echo esc_attr( get_post_modified_time( 'U', true, $post_id ) ); ?>">
    <?php
}
add_action( 'wp_head', 'mysite_print_hcti_template_values', 6 );
```

Rename `headline` and `author` to match your HCTI template. The numeric modified timestamp refreshes the content identity after a post edit.

## Configure Page Screenshot mode

You can emit an `hcti:selector` for a layout element that exists across the relevant templates:

```php
function mysite_print_hcti_screenshot_selector() {
    if ( is_singular( 'post' ) ) {
        echo '<meta property="hcti:selector" content=".social-card">' . "\n";
    }
}
add_action( 'wp_head', 'mysite_print_hcti_screenshot_selector', 6 );
```

Check that the selector exists on the public page and is not `display: none`.

## Verify the output

Clear any WordPress page cache or CDN cache, then use **View Source** on a post, page, archive, and custom post type. Confirm that the URL path is correct and that only one integration controls the social image tags. Test the public URL in the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer).

See the WordPress references for the [`wp_head` hook](https://developer.wordpress.org/reference/hooks/wp_head/), [`wp_parse_url()`](https://developer.wordpress.org/reference/functions/wp_parse_url/), and [child themes](https://developer.wordpress.org/themes/advanced-topics/child-themes/). Yoast documents its [Open Graph image filters](https://developer.yoast.com/features/opengraph/api/wpseo-opengraph-images/).

[Back to OG Image Configs](/getting-started/og-images/)
