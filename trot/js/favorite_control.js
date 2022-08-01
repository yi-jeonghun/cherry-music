$('document').ready(function(){
	window._favorite_control = new FavoriteControl().Init();
});

function FavoriteControl(){
	var self = this;
	this._music_list = [];

	this.Init = function(){
		self.LoadMusic();
		return this;
	};

	this.LoadMusic = function(){
		var music_list = window.localStorage.getItem('FAVORITE_MUSIC_LIST');
		if(music_list != null){
			self._music_list = JSON.parse(music_list);
		}
	};

	this.GetMusicList = function(){
		return self._music_list;
	};

	this.SaveMusic = function(){
		window.localStorage.setItem('FAVORITE_MUSIC_LIST', JSON.stringify(self._music_list));
	};

	this.OnClickLikeMusic = function(music_uid, title, artist_uid, artist, video_id){
		var found = self.FindMusic(music_uid);

		if(found){
			self.Remove(music_uid);
			$('#id_btn_heart_'+music_uid).css('color', 'black');
		}else{
			var music = {
				music_uid: music_uid, 
				title: title, 
				artist_uid: artist_uid, 
				artist: artist, 
				video_id: video_id
			};
			self.AddMusic(music);
			$('#id_btn_heart_'+music_uid).css('color', 'red');
		}
		self.SaveMusic();
	};

	this.FindMusic = function(music_uid){
		for(var i=0 ; i<self._music_list.length ; i++){
			if(self._music_list[i].music_uid == music_uid){
				return true;
			}
		};
		return false;
	};

	this.AddMusic = function(music){
		self._music_list.push(music);
	};

	this.Remove = function(music_uid){
		for(var i=0 ; i<self._music_list.length ; i++){
			if(self._music_list[i].music_uid == music_uid){
				self._music_list.splice(i, 1);
				return true;
			}
		};
	};
}