var React = require("react");
var server = require("react-dom/server");

var matchHelper = require("posthtml-match-helper");

var attrToProp = {
	"class": "className",
	"for": "htmlFor"
};

function toReact (node, components) {
	var tag = node.tag;
	var attrs = node.attrs;
	var element = (tag in components) ? components[tag] : (tag in React.DOM) ? tag : "div";
	var props = {
		key: Math.random().toString(32).slice(2)
	};

	if (attrs) {
		Object.keys(attrs).map(function (attr) {
			var prop = attr in attrToProp ? attrToProp[attr] : attr;
			props[prop] = attrs[attr];
		});
	}

	var children = null;
	if (Array.isArray(node.content)) {
		children = node.content.map(function (_node) {
			return typeof _node === "string" ? _node : toReact(_node, components);
		});
	}

	return React.createElement(element, props, children);
}

module.exports = function (matcher, components) {

	return function posthtmlStaticReact (tree) {

		tree.match(matchHelper(matcher), function (node) {
			return server.renderToStaticMarkup(toReact(node, components));
		});

	};

};
