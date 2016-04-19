var Emoji = require('../src/emoji.js');
var extendDataset = require('./extend-dataset.js');

var emojiInstance = new Emoji({
	dataset: extendDataset,
	patterns: {
		namePattern: /\[([\u4e00-\u9fa5]+)\]/g,
		codePattern: /(#\$face_\d{2}\$#)/g
	}
});

var data = emojiInstance.getData();
console.log(data);

var afterSend = emojiInstance.parse2Code('xxxx[圆傻白甜]xxxxx');
console.log(afterSend);

var afterReceive = emojiInstance.parse2Img('xxxx#$face_06$#xxxxx');
console.log(afterReceive);