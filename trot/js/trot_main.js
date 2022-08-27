$('document').ready(function(){
	window._trot_main = new TrotMain().Init();
});

function TrotMain(){
	var self = this;

	this.Init = function(){	
		self.InitHandle();
		self.OpenMenu('top100');
		self.InitMessageHandler();
		self.InitPullToRequest();
		return this;
	};

	this.InitHandle = function(){
	};

	this.InitMessageHandler = function(){
		window.addEventListener("message", (event) => {
			// console.log('evnet ' + event);
			var message = event.data;
			if(message.head == 'undefined'){
				return;
			}else if(message.head == 'MANGO'){
				if(message.command == 'ChangeMenu'){
					console.log('message.menu ' + message.menu);
					self.OpenMenu(message.menu);
				}else if(message.command == 'FindLikeMusic'){
					for(var i=0 ; i<message.music_list.length ; i++){
						var m = message.music_list[i];
						// console.log(m.title);
						if(m.is_multiple){
							m.is_like = window._like_control.FindMusicMulti(m.music_uid);
						}else{
							m.is_like = window._like_control.FindMusicSingle(m.music_uid);
						}
					}
					var message = {
						head: 'MANGO',
						command: 'FindLikeMusicResponse',
						music_list: message.music_list
					};
					parent.postMessage(message, "*");
				}else if(message.command == 'ClickLikeMusic'){
					window._like_control.OnClickLikeMusic(message.music);
				}else if(message.command == 'GetAppVersionResponse'){
					$('#id_label_app_version').html(message.app_version);
				}
			}
		}, false);
	};

	//-------------------------------------------------------------
	this._menu_loaded_top100 = false;
	this._menu_loaded_home = false;
	this._menu_loaded_artist = false;
	this._menu_loaded_multi = false;
	this._menu_loaded_single = false;
	this._menu_loaded_my = false;
	this.OpenMenu = function(menu, reload){
		$('#id_menu_top100').hide();
		$('#id_menu_home').hide();
		$('#id_menu_artist').hide();
		$('#id_menu_multi').hide();
		$('#id_menu_single').hide();
		$('#id_menu_my').hide();

		if(window._mango_player != null){
			window._mango_player.PlayList_Hide();
		}

		switch(menu){
			case 'top100':
				$('#id_menu_top100').show();
				if(self._menu_loaded_top100 == false | reload){
					$('#id_menu_top100').load(`./top100.html`);
					self._menu_loaded_top100 = true;
				}
				break;
			case 'home':
				$('#id_menu_home').show();
				if(self._menu_loaded_home == false | reload){
					$('#id_menu_home').load(`./home.html`);
					self._menu_loaded_home = true;
				}
				break;
			case 'artist':
				$('#id_menu_artist').show();
				if(self._menu_loaded_artist == false | reload){
					$('#id_menu_artist').load(`./artist.html`);
					self._menu_loaded_artist = true;
				}
				break;
			case 'multi':
				$('#id_menu_multi').show();
				if(self._menu_loaded_multi == false | reload){
					console.log('load multi ');
					$('#id_menu_multi').load(`./multi.html`);
					self._menu_loaded_multi = true;
				}
				break;
			case 'single':
				$('#id_menu_single').show();
				if(self._menu_loaded_single == false | reload){
					$('#id_menu_single').load(`./single.html`);
					self._menu_loaded_single = true;
				}
				break;
			case 'my':
				$('#id_menu_my').show();
				if(self._menu_loaded_my == false | reload){
					$('#id_menu_my').load(`./my.html`);
					self._menu_loaded_my = true;
				}
			break;
		}
	};

	this.InitPullToRequest = function(div_name, menu){
		// console.log('init pull refresh ' + div_name + ' ' + menu);
		return;

		PullToRefresh.init({
			mainElement: '#id_menu_home',
			triggerElement: '#id_menu_home',
			onRefresh: function () {
				self.OpenMenu('home', true);
			},
			shouldPullToRefresh: function(){
				return !this.mainElement.scrollTop;
			}
		});

		PullToRefresh.init({
			mainElement: '#id_menu_multi',
			triggerElement: '#id_menu_multi',
			onRefresh: function () {
				self.OpenMenu('multi', true);
			},
			shouldPullToRefresh: function(){
				return !this.mainElement.scrollTop;
			}
		});

		PullToRefresh.init({
			mainElement: '#id_menu_single',
			triggerElement: '#id_menu_single',
			onRefresh: function () {
				self.OpenMenu('single', true);
			},
			shouldPullToRefresh: function(){
				return !this.mainElement.scrollTop;
			}
		});
		
		PullToRefresh.init({
			mainElement: '#id_menu_artist',
			triggerElement: '#id_menu_artist',
			onRefresh: function () {
				self.OpenMenu('artist', true);
			},
			shouldPullToRefresh: function(){
				return !this.mainElement.scrollTop;
			}
		});

		PullToRefresh.init({
			mainElement: '#id_menu_my',
			triggerElement: '#id_menu_my',
			onRefresh: function () {
				self.OpenMenu('my', true);
			},
			shouldPullToRefresh: function(){
				return !this.mainElement.scrollTop;
			}
		});

	};
}