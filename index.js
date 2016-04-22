var Emoji = require('./src/emoji.js');

(function(root, Emoji){
	if(typeof module === 'object' && typeof module === 'object'){
		module.exports = Emoji;
	}else if(typeof define === 'function' && define.amd){
		define('Emoji', [], Emoji);
	}else if(typeof exports === 'object'){
		exports['Emoji'] = Emoji;
	}else{
		root['Emoji'] = Emoji;
	}
})(this, Emoji);
