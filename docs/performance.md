# Performance
Impossible Fish is (currently) entirely a client-side app, hence server considerations are limited
to simple file serving.
Hence our core performance concern as developers is perceived page load performance.

## Page Loading
Perhaps the canonical rules for high performance  websites was [compiled in
2007](http://stevesouders.com/hpws/rules.php) by Steve Souders.  The development of Impossible Fish
has tried to take account of each of these sometimes contradictory rules.

Rule #1 is 'Make Fewer HTTP Requests'. The earlier commits of Impossible Fish took this to heart and
used Webpack's capabilities to in-line the font, the stylesheet and all the javascript in a single
script file.  Consequently the site consisted of a single 350 byte html file and a single, ahem, 300k .js file loaded at the end of the <body> tag  (If 300k does not appear note this was for functionality that totalled a n emoty fishtank and a console that accepted only 'hide console' and 'help' command ).  The thought was that if this file came from a CDN (Rule #2: Use a Content Delivery Network) everything would be simple and fast.

However the faults with this logic became apparent as soon as we used Chrome Tool's throttling
abilities to mock an average 3G connection.  As no fonts an no styling happened until the full
script was downloaded, we had not so much a flash of unstyled text as a   


