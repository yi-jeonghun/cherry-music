$('document').ready(function(){
	window._multi_control = new MultiControl().Init();
});

function MultiControl(){
	var self = this;
	this._music_list = [];

	this.Init = function(){
		self.LoadMusicList();
		return this;
	};

	this.LoadMusicList = function(){
		$.getJSON( "db/music_multi_list.json", function(music_list) {
			self._music_list = music_list;
			var control = 'window._multi_control';
			var h = ``;
			for(var i=0 ; i<music_list.length ; i++){
				var music = self._music_list[i];
				h += MusicItem(control, i, music);
			}
			$('#id_div_multi_list').html(h);
		});
	};

	this.SendMusicToPlayer = function(index){
		SendMessage_AddMusic(self._music_list[index]);
	};

	this.LikeMusic = function(index){
		window._like_control.OnClickLikeMusic(self._music_list[index]);
	};
}