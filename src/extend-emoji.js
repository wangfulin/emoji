var Emoji = require('./emoji.js');

function ExtendEmoji(opts){
	Emoji.apply(this, opts);
	this.patterns = (opts && opts.patterns) ? opts.patterns : {
		namePattern: /\[([\u4e00-\u9fa5]+)\]/g,
		codePattern: /(#\$face_\d{2}\$#)/g
	};
}

ExtendEmoji.prototype = new Emoji();

ExtendEmoji.prototype.isSupport = function(){

}

ExtendEmoji.prototype.parse2Code = function(){

}

ExtendEmoji.prototype.parse2Img = function(){

}

module.exports = ExtendEmoji;