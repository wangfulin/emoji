var browser = require('bowser');
var _base = '/images/live-room/wukong-imgs/';
var _ext = '.png';

function Emoji(opts){
	this.dataset = (opts && opts.dataset) ? opts.dataset : [];
	this.isSystemEmoji = (opts && opts.isSystemEmoji) ? opts.isSystemEmoji : false;
	this.patterns = (opts && opts.patterns) ? opts.patterns : {
		namePattern: null,
		codePattern: null
	};
}

// 支持的表情的知识库，参考 http://caniemoji.com/
var _support = {
	'Mac OS X': {
		'Safari': '10.7',
		'Chrome': '10.10',
		'Firefox': '10.7'
	},
	'Windows': {
		'Microsoft Edge': '10',
		'Internet Explorer': '7',
		'Firefox': '7'
	},
	'iOS': {
		'Safari': '5',
		'Chrome': '5'
	},
	'Android': {
		'Chrome': '4.4'
	}
};


function isSupport(isSystemEmoji){
	if(isSystemEmoji){
		for(var sys in _support){
			if(browser[sys]){
				if(isNewerOrEqualVersion(sys[browser.name], browser.version)){
					return true;
				}
			}
		}
	}
	return false;
}

function isNewerOrEqualVersion(curVer, sysVer){
	if(!curVer){
		return false;
	}
	if(typeof curVer !== 'string' || typeof sysVer !== 'string'){
		return false;
	}
	return versionComparator(curVer, sysVer);

}

function versionComparator(prev, next){
	var splitedPrev = prev.split('.');
	var splitedNext = next.split('.');
	var prevLen = splitedPrev.length;
	var nextLen = splitedNext.length;
	for(var i = 0; i < prevLen; i++){
		if(parseInt(splitedPrev[i]) > parseInt(splitedNext[i])){
			return false;
		}else if(parseInt(splitedPrev[i]) < parseInt(splitedNext[i])){
			return true;
		}
	}
	if(prevLen > nextLen){
		return false;
	}else{
		return true;
	}
}

Emoji.prototype = {
	setBase: function(base){
		_base = base;
	},
	setExtension: function(ext){
		_ext = ext;
	},
	setData: function(dataset){
		this.dataset = dataset;
	},
	setPatterns: function(patterns){
		this.patterns = patterns;
	},
	getData: function(){
		var self = this;
		var parsedDataset = self.dataset;
		if(!isSupport(self.isSystemEmoji)){
			var parsedDataset = [];
			var len = self.dataset.length;
			for(var i = 0; i < len; i++){
				parsedDataset.push(self.parse2Img(self.dataset[i]['code']));
			}

			return parsedDataset;
		}
		return parsedDataset;
	},
	parse2Code: function(message){
		var self = this;
		message = String(message);
		message = message.replace(self.patterns.namePattern, function(match, name){
			return getCode(self.dataset, name)
		});
		return message;
	},
	parse2Img: function(message){
		var self = this;
		message = String(message);
		message = message.replace(self.patterns.codePattern, function(code){
			var imgName = getImgName(self.dataset, code);
			var itemName = getItemName(self.dataset, code);
			return '<img title="' + imgName + '" alt="' + imgName +
				'" src="' + _base + imgName + _ext + '" data-item-name="[' + itemName + ']" />';
		});
		return message;
	}
}


function getCode(dataset, name){
	var len = dataset.length;
	console.log(name);
	for(var i = 0; i < len; i++){
		if(dataset[i].item_name === name){
			return dataset[i].code;
		}
	}
	return name;
}

function getImgName(dataset, code){
	var len = dataset.length;
	for(var i = 0; i < len; i++){
		if(dataset[i].code === code){
			return dataset[i].image_name;
		}
	}
	return code;
}

function getItemName(dataset, code){
	var len = dataset.length;
	for(var i = 0; i < len; i++){
		if(dataset[i].code === code){
			return dataset[i].item_name;
		}
	}
	return code;
}

module.exports = Emoji;