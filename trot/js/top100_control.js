$('document').ready(function(){
	window._top100_control = new Top100Control().Init();
});

function Top100Control(){
	var self = this;
	this.PREFIX = 'Top100Control';
	this._music_list = [];

	this.Init = function(){
		self.LoadMusicList();
		return this;
	};

	this.LoadMusicList = function(){
		$.getJSON( "db/top100.json", function(music_list) {
			self._music_list = music_list;
			var control = 'window._top100_control';
			var h = ``;
			for(var i=0 ; i<self._music_list.length ; i++){
				var music = self._music_list[i];
				h += MusicItem(self.PREFIX, control, i, music);
			}
			$('#id_div_top100_list').html(h);
		});
	};

	this.SendMusicToPlayer = function(index){
		SendMessage_AddMusic(self._music_list[index]);
	};

	this.LikeMusic = function(index){
		window._like_control.OnClickLikeMusic(self._music_list[index]);
	};

	this.ListenAll = function(){
		console.log('listen all ' );
		SendMessage_ListenAll(self._music_list);
	};
}