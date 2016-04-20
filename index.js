var Emoji = require('./src/emoji.js');

(function(window, Emoji){
	if(typeof module !== 'undefined'){
		module.exports = Emoji;
	}else if(typeof define == 'function' && typeof define.amd == 'object'){
		define('Emoji', [], Emoji);
	}else{
		global['Emoji'] = Emoji;
	}
})(window, Emoji);