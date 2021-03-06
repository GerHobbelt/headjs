---
layout: main
title: Head.JS, the only script in your HEAD
---
<div itemprop="description">
    <div class="intro">    
        HeadJS, a small library for Responsive Design, Feature Detections & Resource Loading
    </div>  

    <h2>When you need a quick cross-browser compatible hand, don't bang your head. HeadJS is here to help you out !</h2>
    <ul>
        <li>Speed up your apps: Load JS & CSS asyncronously and in parallel, but execute them in order</li>
        <li>Load one asset if a condition is met, else fallback and load a different one</li>
        <li>Manage script dependencies, and execute callbacks once they are loaded</li>
        <li>Cross-browser compatible &laquo; pseudo media-queries &raquo; let you code against different resolutions & devices</li>
        <li>Fix quirks in specific browsers by quickly applying dedicated CSS/JS logic</li>
        <li>Detect various browsers & their versions</li>
        <li>Check if the client supports a certain Browser, HTML5, or CSS3 feature</li>
        <li>Automatically generates JS and CSS classes for browsers & features that where detected</li>
        <li>Automatically generates CSS classes, to know what page or section a user is viewing</li>
        <li>Know if the user is in landscape or portrait mode</li>
        <li>Or whether the client is using a mobile or desktop device</li>
        <li>Get old browsers support HTML5 elements like nav, sidebar, header, footer, ...</li>
        <li>...</li>
        <li>
            <strong>Make it, The only script in your &lt;HEAD&gt;</strong>
            <ul>
                <li><em>A concise solution to universal problems</em></li>
            </ul>
        </li>        
    </ul>

    <h3>Your imagination, Your limit</h3>
</div>

<hr />

<div>
    <h2 >Responsive Design (Think @media-queries, and more)</h2>
    <div class="intro">    
        Achieve responsive design with CSS that targets different screen resolutions, paths, states and browsers.
    </div>   
    <div class="code-example" data-title="head.responsive()">
        <p>Need to display an element at a specific screen size ? </p>
        

{% highlight js %}
/* JS */
if (head.screen.innerWidth > 800) {
    document.getElementById("#side-menu").style.display = "block";
}

/* CSS */
.gt-800 #side-menu {
    display: block;
}
{% endhighlight %}
        
        <p>As you can see above, if you can write it in CSS, you can usually also write it in JavaScript.</p>
        
        <div class="code-example" data-title="Built in">
            mobile, desktop, landscape, portrait, touch, viewport height, viewport width, screen height, screen width, browser height, browser width, browser name (ie, chrome, ff, ios, android, webkit, opera), browser version, current folder, current page
        </div>
    </div> 
    
    <h2>Feature Detections (Like Modernizr. Just smaller, and simpler)</h2>
    <div class="intro">    
        Detect various browsers and their features. Target HTML5 and CSS3 safely.
    </div>   
    <div class="code-example" data-title="head.feature()">
        <p>What about custom detections and device/browser features ?</p>

{% highlight css %}   
/* Add a custom feature yourself */
head.feature("member", true);

/* Now use it */        
if (head.member) {
    document.querySelector(".member-menu").style.display = "block";
}

.member-menu {
    display: block;
} 

/* Use built-in detections*/
                   
/* if the browser supports CSS3 box-shadow */
if (head.boxshadow) {
    document.querySelector(".member-menu").style.boxShadow = "3px 3px 3px black";
}                 

/* if the browser supports CSS3 box-shadow */
.boxshadow .member-menu {
    box-shadow: 3px 3px 3px black;
}
{% endhighlight %}

        <p>We have a bunch of features detections built in, and if that's not enough, simply create one yourself !</p>
        <ol>
            <li>Desktop</li>
            <li>Mobile</li>
            <li>Landscape</li>
            <li>Portrait</li>
            <li>Retina</li>
            <li>Touch</li>            
            <li>Transitions</li>
            <li>Transforms</li>
            <li>Gradients</li>
            <li>Opacity</li>
            <li>Textshadow</li>
            <li>Multiplebgs</li>
            <li>Boxshadow</li>
            <li>Borderimage</li>
            <li>Borderradius</li>
            <li>Cssreflections</li>
            <li>Fontface</li>
            <li>rgba()</li>
        </ol>  
    </div> 

    <h2>Resource Loading (Direct or Conditional)</h2>
    <div class="intro">    
        Manage your library's dependencies. Load JavaScript and StyleSheets in parallel but execute them in the correct order. 
    </div>   
    
    <div class="code-example" data-title="head.load()">
        <p>Need to quickly load a JS or CSS file ?</p>

{% highlight js %}
// Load up some JS
head.load("jQuery.js", function() {
    // Call a function when done
    console.log("Done loading jQuery");
});

// Load up some CSS
head.load("bootstrap.css");
{% endhighlight %}
        <h4>How about something crazy like</h4>
        <p>On DocumentReady, if the user is using IE8, you need to load 2 scripts, otherwise a different script, then fire a callback, and then apply a stylesheet ? Yeah right..</p>
        <p>Easy.</p>

{% highlight js %}
// head.ready(callback)
// head.test(test, success, failure, callback)

head.ready(function() {
    head.test(
        (head.browser.ie && head.browser.version === 8),
        ["file1.js", "file2.js"],
        ["other.js"],
        function() {
            // run callback

            head.load("file1.css");
        }
    );
});
{% endhighlight %}

        <p>Of course you can use each of those functions (ready, test, load) individually too.</p>
    </div>    
</div>

<div class="intro">    
    <strong>Make it the only script in your HEAD.</strong>
    &laquo; A concise solution to universal problems &raquo;
</div>  
              
{% include sections/download.html %}      