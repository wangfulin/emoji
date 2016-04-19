var Emoji = require('../src/emoji.js');
var extendDataset = require('./system-dataset.js');

var emojiInstance = new Emoji({
	dataset: extendDataset,
	patterns: {
		namePattern: /\[([\u4e00-\u9fa5]+)\]/g,
		codePattern: /(&#x1[0-9a-fA-F]{4};)/g
	}
});

emojiInstance.setBase('/images/live-room/system-imgs/');

var data = emojiInstance.getData();
console.log(data);

var afterSend = emojiInstance.parse2Code('xxxx[露齿而笑]xxxxx');
console.log(afterSend);

var afterReceive = emojiInstance.parse2Img('xxxx&#x1F600;xxxxx');
console.log(afterReceive);