$('document').ready(function(){
	window._favorite_control = new FavoriteControl().Init();
});

function FavoriteControl(){
	var self = this;
	this._farorite_music_list = [];

	this.Init = function(){
		self.LoadList();
		return this;
	};

	this.LoadList = function(){
		var list = window.localStorage.getItem('FAVORITE_MUSIC_LIST');
		if(list != null){
			self._farorite_music_list = JSON.parse(list);
		}
	};

	this.SaveList = function(){
		window.localStorage.setItem('FAVORITE_MUSIC_LIST', JSON.stringify(self._farorite_music_list));
	};

	this.OnClickLike = function(music_uid){
		var found = self.Find(music_uid);

		if(found){
			self.Remove(music_uid);
			$('#id_btn_heart_'+music_uid).css('color', 'black');
		}else{
			self.Add(music_uid);
			$('#id_btn_heart_'+music_uid).css('color', 'red');
		}
		self.SaveList();
	};

	this.Find = function(music_uid){
		for(var i=0 ; i<self._farorite_music_list.length ; i++){
			if(self._farorite_music_list[i] == music_uid){
				return true;
			}
		};
		return false;
	};

	this.Add = function(music_uid){
		self._farorite_music_list.push(music_uid);
	};

	this.Remove = function(music_uid){
		for(var i=0 ; i<self._farorite_music_list.length ; i++){
			if(self._farorite_music_list[i] == music_uid){
				self._farorite_music_list.splice(i, 1);
				return true;
			}
		};
	};
}