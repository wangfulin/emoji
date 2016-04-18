var Emoji = require('./emoji.js');

function SystemEmoji(){
	Emoji.apply(this, arguments);
}

SystemEmoji.prototype = new Emoji();

SystemEmoji.prototype.isSupport = function(){

}

SystemEmoji.prototype.parse2Code = function(){

}

SystemEmoji.prototype.parse2Img = function(){

}

module.exports = SystemEmoji;