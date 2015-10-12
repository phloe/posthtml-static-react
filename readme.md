# posthtml-static-react

> A [PostHTML](https://github.com/posthtml/posthtml) plugin to render custom elements as static React components.

Basic usage

```js
var React = require("react");
var posthtml = require("posthtml");
var renderStaticReact = require("posthtml-static-react");

var html = "<my-custom-element></my-custom-element>";

var MyCustomElement = function (props) {
	return (
		<div className="my-custom-element"></div>
	);
};

var components = {
	"my-custom-element": MyCustomElement;
};

posthtml()
	.use(renderStaticReact("my-custom-element", components))
	.process(html)
	.then(function (result) {
		console.log(result.html);
		// "<div class=\"my-custom-element\"></div>"
	});
```


#### Arguments

* `matcher` (string|object|array) - Accepts a matcher argument just like [posthtml match](https://github.com/posthtml/posthtml/blob/master/README.md#match-objectstringregexp-functionposthtmlnode-posthtmlnodestring) - or a CSS selector string (which will be turned into at matcher object via [posthtml-match-helper](https://github.com/rasmusfl0e/posthtml-match-helper)).
* `components` (object) - A map of the custom element names used in your HTML and the React components you want to render them as.

#### Returns

A configured plugin ready to use with PostHTML.
