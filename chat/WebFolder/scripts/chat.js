var chat = {};

(function(namespace){
	function Room(link, helper){
		if(!link){
			throw Error('The link is mandatory');
		}
		
		this.link	= link;
		this.fb		= new Firebase(this.link);
		this.events	= {};
		this.helper	= helper || new Helper();
	}
	
	Room.prototype.on = function on(event , fn){
		var that = this;
		
		switch(event){
			case 'new_message':
				this.fb.on('child_added', function(ss, prevName){
					var val = ss.val(),
						body= that.helper.format(val.name, val.text,ss.name());
						
					fn.call(that, body, prevName);
				});
				
				this.events['new_message'] = fn;
				break;
//			case 'message_removed':
//				this.events['message_removed'] = fn;
//				break;
//			case 'message_changed':
//				this.events['message_changed'] = fn;
//				break;
//			case 'message_moved':
//				this.events['message_moved'] = fn;
//				break;
		}
	}
	
	Room.prototype.send = function(body){
		var curUser = waf.directory.currentUser();
		if(!curUser){
			throw new Error('You are not connected');
		}
		else{
			this.fb.push({name:curUser.fullName, text:body}).name();
		}
	}
	
	Room.prototype.getHelper = function(){
		return this.helper;
	}
	
	function Helper(){
		
	}
	
	Helper.regex = /:penguin:|:putnam:|:poop:|:\)|:\(|:p|:D|:o|;\)|8\)|8\||>:\(|:\\|:'\(|3:\)|O:\)|:\*|<3|\^_\^|-_-|O.o|>:o|:v|:\|]|:colonthree:|:shark:|:like:|:-\)|:-\(|:-p|:-D|:-o|;-\)|B-\)|8-\)|>:-\(|:-\\|:'-\(|3:-\)|O:-\)|:-\*|>:-o|:-v/g;
	Helper.smileys = {
		':)': 'emoticon_smile',
		':(': 'emoticon_frown',
		':p': 'emoticon_tongue',
		':D': 'emoticon_grin',
		':o': 'emoticon_gasp',
		';)': 'emoticon_wink',
		'8)': 'emoticon_glasses',
		'8|': 'emoticon_sunglasses',
		'>:(': 'emoticon_grumpy',
		':\\': 'emoticon_unsure',
		':\'(': 'emoticon_cry',
		'3:)': 'emoticon_devil',
		'O:)': 'emoticon_angel',
		':*': 'emoticon_kiss',
		'<3': 'emoticon_heart',
		'^_^': 'emoticon_kiki',
		'-_-': 'emoticon_squint',
		'O.o': 'emoticon_confused',
		'>:o': 'emoticon_confused_rev',
		':v': 'emoticon_pacman',
		':|]': 'emoticon_robot',
		':colonthree:': 'emoticon_colonthree',
		':penguin:': 'emoticon_penguin',
		':putnam:': 'emoticon_putnam',
		':shark:': 'emoticon_shark',
		':like:': 'emoticon_like',
		':poop:': 'emoticon_poop',
		':-)': 'emoticon_smile',
		':-(': 'emoticon_frown',
		':-p': 'emoticon_tongue',
		':-D': 'emoticon_grin',
		':-o': 'emoticon_gasp',
		';-)': 'emoticon_wink',
		'B-)': 'emoticon_glasses',
		'8-)': 'emoticon_sunglasses',
		'>:-(': 'emoticon_grumpy',
		':-\\': 'emoticon_unsure',
		':\'-(': 'emoticon_cry',
		'3:-)': 'emoticon_devil',
		'O:-)': 'emoticon_angel',
		':-*': 'emoticon_kiss',
		'>:-o': 'emoticon_confused_rev',
		':-v': 'emoticon_pacman'
	}
	
	Helper.prototype.format = function(name, body, ref){
		body = body.replace(Helper.regex, function (match) {
		    return typeof Helper.smileys[match] != 'undefined' ?
				'<span class="emoticon ' + Helper.smileys[match] + '"></span>' : match;
	  	});
	  	
	  	var res = $('<div/>')
		.html(body)
		.prepend($('<em/>')
		.append('<b>')
		.text(name + ': '));
		
		if(ref){
			res.attr('data-name',ref);
		}
		
		return res.get(0).outerHTML;
	}
	
	namespace.Room 		= Room;
	namespace.Helper 	= Helper;
})(chat)
