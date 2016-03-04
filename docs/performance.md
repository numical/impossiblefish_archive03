# Performance
Impossible Fish is (currently) entirely a client-side app, hence server considerations are limited to simple file serving.

Hence our core performance concern as developers is perceived page load performance.

## Page Loading
Perhaps the canonical rules for high performance  websites was [compiled in 2007](http://stevesouders.com/hpws/rules.php) by Steve Souders.  The development of Impossible Fish has tried to take account of each of these sometimes contradictory rules.  Here is the sad story of how we did:

Rule #1 is 'Make Fewer HTTP Requests'. The earlier commits of Impossible Fish took this to heart and used Webpack's capabilities to in-line the font, the stylesheet and all the javascript in a single script file.  Consequently the site consisted of a single 350 byte html file and a single, ahem, 300k .js file loaded at the end of the `<body>` tag  (If 300k does not appear large, note this was for functionality that totalled an empty fishtank and a console that accepted only 'hide console' and 'help' commands).  The thought was that if this file came from a CDN (Rule #2: Use a Content Delivery Network) everything would be simple and fast.

However the faults with this logic became apparent as soon as we used Chrome Tool's throttling abilities to mock an average 3G connection (750 kb/s). Nothing displayed for over 12 seconds.

So the next idea was to use further Webpack capabilties and divide the code into [chunks](https://webpack.github.io/docs/code-splitting.html) - a smaller (30k) js file that included the font and styling, and an asynchronously loaded script (270k) for the application code.  Clever eh?  No - because all the HTML content was in the React application code that did not run until the script was downloaded so we still had 10+ seconds of blank screen. 

No matter - we recreate some of the html structure in the html file and have this overwritten when React starts.  Brilliant - not.  We now had 3 seconds of unstyled text (a bit more than a flash) as the first script with css and fonts was loaded, then a static, non-dynamic, non-auto-sized fishtank appears for another 10 seconds, and then this was very obviously overwritten completely when the main script file is loaded and parsed.

So we had to think again.  Firstly  we realised that in-lining the font was actually a bad idea.  It certainly prevented another http request but at the expense of having to be downloaded every time, and did not work on all browsers as the woff2 format we had selected was not universally supported.  Suddenly the point of [Google Fonts](https://www.google.com/fonts) was abundantly clear. Secondly we realised that using Webpack to embed the stylesheet was also dumb.  A clever tooling feature certainly but for Impossible Fish with its single, global CSS file, why not just in-line it in the html?  But if we removed these, was there any point doing the chunking? A realisation dawned on us; we were being seduced by the power of the tooling to do things utterly inappropriate for the website.  Shame on you Webpack!

So back to basics... The inlined font is replaced with a simple call to Google Fonts - this gives us caching and a clever script to ensure the apporpriate font format is used for each brower. The CSS is now a `<style>` element within the `<head>` of the HTML (bad practice..? see later). And now there is no need for Webpack chunking - simply adding the `async` flag to the single Webpack generated script gives us async loading.  The result? The page is presented properly styled in less than half a second.  

Success!  Well, ish.  Some problems:
- the app code still takes 12 seconds to load so we have an unresponsive page for that long;
- we relied on app code to resize the canvas to the viewport size (see
    [constraints](./constraints.md)) so the canvas is the wrong size for those 12 seconds;
- Webpack is no longer involved in the CSS generation so we have lost minification and, more
importantly, the [postcss](http://postcss.org/) processing we were doing.

So...

