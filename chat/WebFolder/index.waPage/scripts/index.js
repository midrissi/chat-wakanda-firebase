
WAF.onAfterInit = function onAfterInit() {// @lock
	var room 	= new chat.Room('https://idrissi.firebaseIO.com/'),
		$chat 	= $('#container1'),
		$title	= $chat.find('.chat-title'),
		$content= $chat.find('.content');
		
		window.room = room;
	
	room.on('new_message', function(body){
		$content.append($(body));
		
		if($chat.hasClass('hided')){
			$title
			.addClass('highlighted')
			.effect("pulsate", { times:3 }, 750);
		}
	});
	
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var login1 = {};	// @login
	var textField1 = {};	// @textField
	var container2 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$$('textField1').disable();
		if(waf.directory.currentUser()){
			$$('textField1').enable();
		}
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		$$('textField1').disable();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		$$('textField1').enable();
	};// @lock

	textField1.keyup = function textField1_keyup (event)// @startlock
	{// @endlock
		if (event.keyCode == 13) {
			try{
				room.send(this.getValue());
				this.setValue('');
			}
			catch(e){
				alert(e.message);
			}
		}
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		if($title.hasClass('highlighted')){
			$title
			.stop(true,true)
			.css('opacity',1)
			.removeClass('highlighted');
		}
		$chat.toggleClass('hided');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("textField1", "keyup", textField1.keyup, "WAF");
	WAF.addListener("container2", "click", container2.click, "WAF");
// @endregion
};// @endlock
