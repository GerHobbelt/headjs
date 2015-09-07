[![Head JS](http://headjs.com/site/assets/img/logo-big.png)](http://headjs.com)

This project was never announced. `git push` and it was all viral!


###Latest Version: 1.0.3 / [Download](http://headjs.com/site/download.html)


#####Status
[![Build Status](https://travis-ci.org/headjs/headjs.png?branch=master)](https://travis-ci.org/headjs/headjs)


#####Tested with (..amongst others)
[![Selenium Status](https://saucelabs.com/browser-matrix/itechnology.svg)](https://saucelabs.com/u/itechnology)



##About
  * _Load scripts and css on demand_
  * _Achieve responsive design with CSS that targets different screen resolutions, paths, states and browsers_
  * _Detect various browsers and their features_
  * _Target HTML5 and CSS3 safely_
  * __Make it the only script in your HEAD__
  * __A concise solution to universal problems__





###Responsive Design, Feature Detections, and Resource Loading
  * Speed up your apps: Load JS & CSS asyncronously and in parallel, but execute them in order
  * Load one asset if a condition is met, else fallback and load a different one
  * Manage script dependencies, and execute callbacks once they are loaded
  * Cross-browser compatible &laquo; pseudo media-queries &raquo; let you code against different resolutions & devices
  * Fix quirks in specific browsers by quickly applying dedicated CSS/JS logic
  * Detect various browsers & their versions
  * Check if the client supports a certain Browser, HTML5, or CSS3 feature
  * Automatically generates JS and CSS classes for browsers & features that where detected
  * Automatically generates CSS classes, to know what page or section a user is viewing
  * Know if the user is in landscape or portrait mode
  * Or whether the client is using a mobile or desktop device
  * Get old browsers support HTML5 elements like nav, sidebar, header, footer, ...
  * ...
  * __Make it, The only script in your &lt;HEAD&gt;__
    * ___A concise solution to universal problems___




###Resources
- __WebSite__
  - [http://headjs.com](http://headjs.com)
- __Bugs__
  - [https://github.com/headjs/headjs/issues](https://github.com/headjs/headjs/issues)
- __Community Support__
  - [http://stackoverflow.com](http://stackoverflow.com/questions/tagged/head.js)
  - _Remember to tag your questions with_: ___head.js___
- __Feature Requests/Suggestions__
  - [http://headjs.uservoice.com](http://headjs.uservoice.com/forums/182905-headjs-feature-suggestions)





##Updates

###0.99 / 2012-11-15

    - Load: Fixed regression in IE6, caused by IE10 fix
    - Load: CSS loading seems to work in all browsers.
        - However a few will not trigger the callback. Over 90% do.
        - For now only load css in situations where you don't need the callback triggered.
        - head.load("file1.css", "file2.css")
    - Load: Conditional loading with head.test() now in evaluation phase
        - try it, but don't rely on it yet
        - head.test(bool, "ok.js", "failed.js", callback)
    - All: CDN is now availiable thanks to: http://cloudflare.com
        - Info in download section on main site
    - Unit Tests
        - Integrated with main site so that everyone can participate
        - They have also been hooked up to automatically report stats back to http://browserscope.org


###v0.98 / 2012-11-09

    - Load: Fixed loading bug in IE10
    - Load: Corrected some issues with loading from inside <head>
    - Load: Rewrite of large parts of code base
      - Started to massively document the sourcecode :)
    - Load: Test Only (css loading)
      - You can now load CSS files with head.load("somefile.css")
      - Consider this as under testing
      - head.load is an alias to head.js
    - Css3: moved "touch" detection from core to here
    - Css3: added "retina" detection
    - Css3: replaced "font-face" detection that was using "Conditional Comments" with simplisitc browser version detection
    - Core: Added gt, gte, lte, eq classes to width detection (lt existed already)
    - Core: Added gt, gte, lt, lte, eq classes for browser vendor & version detection
    - By default only lt/gt classes are activated
      - You can of course configure to your likings via head_conf


###RoadMap (v1.0 / v2.0) 2012-11-06

    - Conditional Loader
      - head.test(bool, success, failure, callback)
    - Resource Loading
      - head.load(somefile.js , callback)
      - head.load(somefile.css, callback)
    - Advanced Responsive Design
      - Take into account browsers min/max versions & height/width pseudo media queries (lt, lte, eq, gt, gte)
      - .ie-lt6, .ff-gte17, .w-lt1024, .h-gte800
    - Inverse naming conventions for readability & to be able to programatically inject values more easily
      - .no-box-shadow -> .box-shadow-true/false
        - jQuery(selector).addClass("box-shadow-" + head.features.boxShadow)
        - class="localStorage-<%= bool.toString().toLower() %>"
      - .no-ie -> .ie-true/false
      - .index-page -> .page-index
    - Advanced Configuration
      - Expose a maximum of functionalty through head_conf, so you only get the functionality you actually require
        - Enable/Disable lt/gt class generation
        - Enable/Disable height/width support
        - Configure custom height/width/browser breakpoints
        - ..etc
    - Remove tests from css3.js and let users "roll their own"
      - 80% of css related tests are probably irrevelant anyways
        - For things like border-radius & the likes everyone uses gracefull degradation with their css anyways ..right ? :)
    - Renaming files
      - head.responsive.js (can be used standalone)
        - old core.js with a few additions from css3.js so we can externalise the test suite
      - head.load.js (can be used standalone)
        - old load.js
      - head.features.js (MUST be used with head.responsive.js)
        - old css3.js, but now only integrates actual tests
    - Revamped website with Twitter Bootstrap
      - Make the site a tad more ergonomic to navigate
      - Expose unit tests & advanced documentation directly in site
      - Custom "roll-your-own" builder
      - Integrate website with gh-pages for quicker deploy

*How much of this roadmap will end up in the current version of head.js, i don't know yet.*

* Most likely when v1.0 comes out, it will have a good part of the above functioanlity included while at the same time preserving the existing api syntax.
  * Like this, those that already depend on HeadJS get no breaking changes.
* At the same time there will probably be a v2.0 release that uses the above syntax, and be the defacto version for future development.

__P.S. 70% of the preliminary work mentioned above is already done :)__

###v0.97a / 2012-10-20

    - Updated QUnit &amp; got unit tests running again
    - Switched to "use strict"
    - Fixed up some variable usages
    - Added browser detections other than just for ie-lt
    - updated browser regexes (firefox, safari, opera, ios, android, webkit)
    - detect if browser is: desktop, mobile, touch enabled
    - detect portrait/landscape mode
    - html5 shim now only triggers on ie-lt9
    - added a throttle to onResize, since some browsers fire tons of events/sec
    - added corrected height/width measurements, but only exposed via new object: head.screen
      - contains height/width, innerHeight/innerWidth, outerHeight/outerWidth
    - forced all css router names to lowercase just in case ppl type in url's with wierd casings

