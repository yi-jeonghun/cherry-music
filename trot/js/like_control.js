$('document').ready(function(){
	window._like_control = new LikeControl().Init();
});

function LikeControl(){
	var self = this;
	this._music_list_single = [];
	this._music_list_multi = [];
	this._artist_list = [];

	this.Init = function(){
		self.LoadMusicSingle();
		self.LoadMusicMulti();
		self.LoadArtist();
		return this;
	};

	//==============================================================================

	this.OnClickLikeMusic = function(music_uid, title, artist_uid, artist, video_id, is_multiple){
		var found = false;
		if(is_multiple){
			found = self.FindMusicMulti(music_uid);
		}else{
			found = self.FindMusicSingle(music_uid);			
		}

		var message = {
			head: 'MANGO',
			command: 'ClickLikeMusicResponse',
			music_uid: music_uid,
			result: ''
		};

		if(found){
			if(is_multiple){
				self.RemoveMusicMulti(music_uid);
			}else{
				self.RemoveMusicSingle(music_uid);
			}
			message.result = 'deleted';
			$('#id_btn_heart_'+music_uid).css('color', 'black');
		}else{
			var music = {
				music_uid: music_uid, 
				title: title, 
				artist_uid: artist_uid, 
				artist: artist, 
				video_id: video_id,
				is_multiple: is_multiple
			};
			if(is_multiple){
				self.AddMusicMulti(music);
			}else{
				self.AddMusicSingle(music);
			}
			message.result = 'added';
			$('#id_btn_heart_'+music_uid).css('color', 'red');
		}

		parent.postMessage(message, "*");

		if(is_multiple){
			self.SaveMusicListMulti();
		}else{
			self.SaveMusicListSingle();
		}
	};

	//==============================================================================

	this.LoadMusicSingle = function(){
		var music_list_single = window.localStorage.getItem('LIKE_MUSIC_LIST_SINGLE');
		if(music_list_single != null){
			self._music_list_single = JSON.parse(music_list_single);
		}
	};

	this.GetMusicListSingle = function(){
		return self._music_list_single;
	};

	this.SaveMusicListSingle = function(){
		window.localStorage.setItem('LIKE_MUSIC_LIST_SINGLE', JSON.stringify(self._music_list_single));
	};

	this.FindMusicSingle = function(music_uid){
		for(var i=0 ; i<self._music_list_single.length ; i++){
			if(self._music_list_single[i].music_uid == music_uid){
				return true;
			}
		};
		return false;
	};

	this.AddMusicSingle = function(music){
		self._music_list_single.push(music);
	};

	this.RemoveMusicSingle = function(music_uid){
		for(var i=0 ; i<self._music_list_single.length ; i++){
			if(self._music_list_single[i].music_uid == music_uid){
				self._music_list_single.splice(i, 1);
				return true;
			}
		};
	};

	//==============================================================================

	this.LoadMusicMulti = function(){
		var music_list_multi = window.localStorage.getItem('LIKE_MUSIC_LIST_MULTI');
		if(music_list_multi != null){
			self._music_list_multi = JSON.parse(music_list_multi);
		}
	};

	this.GetMusicListMulti = function(){
		return self._music_list_multi;
	};

	this.SaveMusicListMulti = function(){
		window.localStorage.setItem('LIKE_MUSIC_LIST_MULTI', JSON.stringify(self._music_list_multi));
	};

	this.FindMusicMulti = function(music_uid){
		console.log('find music multi ' + music_uid);
		for(var i=0 ; i<self._music_list_multi.length ; i++){
			console.log(i + ' ' + self._music_list_multi[i].music_uid);
			if(self._music_list_multi[i].music_uid == music_uid){
				return true;
			}
		};
		return false;
	};

	this.AddMusicMulti = function(music){
		self._music_list_multi.push(music);
	};

	this.RemoveMusicMulti = function(music_uid){
		for(var i=0 ; i<self._music_list_multi.length ; i++){
			if(self._music_list_multi[i].music_uid == music_uid){
				self._music_list_multi.splice(i, 1);
				return true;
			}
		};
	};
	
	//=============================================================================

	this.LoadArtist = function(){
		var artist_list = window.localStorage.getItem('LIKE_ARTIST_LIST');
		if(artist_list != null){
			self._artist_list = JSON.parse(artist_list);
		}
	};

	this.GetArtistList = function(){
		return self._artist_list;
	};

	this.SaveArtist = function(){
		window.localStorage.setItem('LIKE_ARTIST_LIST', JSON.stringify(self._artist_list));
	};

	this.OnClickLikeArtist = function(artist_uid, name){
		var found = self.FindArtist(artist_uid);

		if(found){
			self.RemoveArtist(artist_uid);
			$('#id_btn_heart_' + artist_uid).css('color', 'black');
		}else{
			var artist = {
				artist_uid: artist_uid, 
				name: name
			};
			self.AddArtist(artist);
			$('#id_btn_heart_' + artist_uid).css('color', 'red');
		}
		self.SaveArtist();
	};

	this.FindArtist = function(artist_uid){
		for(var i=0 ; i<self._artist_list.length ; i++){
			if(self._artist_list[i].artist_uid == artist_uid){
				return true;
			}
		};
		return false;
	};

	this.AddArtist = function(artist){
		self._artist_list.push(artist);
	};

	this.RemoveArtist = function(artist_uid){
		for(var i=0 ; i<self._artist_list.length ; i++){
			if(self._artist_list[i].artist_uid == artist_uid){
				self._artist_list.splice(i, 1);
				return true;
			}
		};
	};
}