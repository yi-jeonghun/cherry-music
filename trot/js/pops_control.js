$('document').ready(function(){
	window._pops_control = new PopsControl().Init();
});

function PopsControl(){
	var self = this;
	this._music_list = [];

	this.Init = function(){
		self.LoadMusicList();
		return this;
	};

	this.LoadMusicList = function(){
		$.getJSON( "db/pops/pops.json", function(music_list) {
			self._music_list = music_list;
			var control = 'window._pops_control';
			var h = ``;
			for(var i=0 ; i<music_list.length ; i++){
				var music = self._music_list[i];
				h += MusicItem(control, i, music);
			}
			$('#id_div_pops_list').html(h);
		});
	};

	this._opend_index_list = [];
	this.ShowMultiMusicList = function(idx){
		if(self._opend_index_list[idx] == undefined || self._opend_index_list[idx] == false){
			self._opend_index_list[idx] = true;
			var list = self._music_list[idx].multi_music_list;
			list = list.replaceAll("\n", "<br>");
			$('#id_div_multi_'+idx).removeClass("d-none");
			$('#id_div_multi_'+idx).html(list);
			$('#id_icon_multi_'+idx).removeClass("fa-angle-down");
			$('#id_icon_multi_'+idx).addClass("fa-angle-up");
		}else if(self._opend_index_list[idx] == true){
			self._opend_index_list[idx] = false;
			$('#id_div_multi_'+idx).addClass("d-none");
			$('#id_div_multi_'+idx).html('');
			$('#id_icon_multi_'+idx).addClass("fa-angle-down");
			$('#id_icon_multi_'+idx).removeClass("fa-angle-up");
		}
	};

	this.SendMusicToPlayer = function(index){
		SendMessage_AddMusic(self._music_list[index]);
	};

	this.LikeMusic = function(index){
		window._like_control.OnClickLikeMusic(self._music_list[index]);
	};
}