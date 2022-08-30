$('document').ready(function(){
	window._multi_control = new MultiControl().Init();
});

function MultiControl(){
	var self = this;
	this.PREFIX = 'MultiControl';
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
				h += MusicItem(self.PREFIX, control, i, music);
			}
			$('#id_div_multi_list').html(h);
		});
	};

	this._opend_index_list = [];
	this.ShowMultiMusicList = function(idx){
		var music = self._music_list[idx];
		var music_uid = music.music_uid;

		if(self._opend_index_list[idx] == undefined || self._opend_index_list[idx] == false){
			self._opend_index_list[idx] = true;
			var list = music.multi_music_list;
			list = list.replaceAll("\n", "<br>");
			$(`#id_div_multi_${self.PREFIX}_${music_uid}`).removeClass("d-none");
			$(`#id_div_multi_${self.PREFIX}_${music_uid}`).html(list);
			$(`#id_icon_multi_${self.PREFIX}_${music_uid}`).removeClass("fa-angle-down");
			$(`#id_icon_multi_${self.PREFIX}_${music_uid}`).addClass("fa-angle-up");
		}else if(self._opend_index_list[idx] == true){
			self._opend_index_list[idx] = false;
			$(`#id_div_multi_${self.PREFIX}_${music_uid}`).addClass("d-none");
			$(`#id_div_multi_${self.PREFIX}_${music_uid}`).html('');
			$(`#id_icon_multi_${self.PREFIX}_${music_uid}`).addClass("fa-angle-down");
			$(`#id_icon_multi_${self.PREFIX}_${music_uid}`).removeClass("fa-angle-up");
		}
	};

	this.SendMusicToPlayer = function(index){
		SendMessage_AddMusic(self._music_list[index]);
	};

	this.LikeMusic = function(index){
		window._like_control.OnClickLikeMusic(self._music_list[index]);
	};
}