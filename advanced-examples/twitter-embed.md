---
description: An example for how to generate a screenshot of a tweet from Twitter.
---

# Twitter Embed

To auto generate a screenshot of a tweet, you can use the Twitter embed.

### Example code

Here's example HTML you can send to the API to generate the image. To change the tweet, swap out the ID in the code.

```markup
<div style="display: inline-block">
  <div class="tweet" id="1253524351376330752"></div>
</div>
<script src="https://code.jquery.com/jquery-3.4.0.slim.min.js"
  integrity="sha256-ZaXnYkHGqIhqTbJ6MB4l9Frs/r7U4jlx7ir8PJYBqbI="
  crossorigin="anonymous"></script>
<script src="http://platform.twitter.com/widgets.js"></script>
<script>
  var tweets = $(".tweet");
  $(tweets).each( function( t, tweet ) {
    var id = $(this).attr('id');
    twttr.widgets.createTweet(
      id, tweet,
      {
        conversation : 'none',
        cards        : 'hidden',
        linkColor    : '#cc0000',
        theme        : 'light'
      });
    });
</script>
```

### Tweet screenshot

![](../.gitbook/assets/image%20%286%29.png)

{% page-ref page="../getting-started/creating-an-image.md" %}

{% page-ref page="../getting-started/url-to-image.md" %}

