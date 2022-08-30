$('document').ready(function(){
	window._tv_show_control = new TVShowControl().Init();
});

function TVShowControl(){
	var self = this;
	this.PREFIX = 'TVShowControl';
	this._tv_show_list = [];
	this._music_list = [];

	this.Init = function(){
		self.LoadTVShowList();

		return this;
	};

	this.LoadTVShowList = function(){
		$.getJSON("db/tv_show/tv_show.json", function(tv_show_list){
			self._tv_show_list = tv_show_list;
			var h = '';

			for(var i=0 ; i<tv_show_list.length ; i++){
				var tv = tv_show_list[i];
				var on_click_tv_show = `window._tv_show_control.LoadMusicList('${tv.name}', '${tv.tv_show_uid}')`;

				h += `
				<div class="row border-bottom py-2">
				<div class="col-12 my-auto" style="cursor:pointer" onClick="${on_click_tv_show}">
					${tv.name}
				</div>
				`;
			}

			$('#id_div_tv_show_list').html(h);
		});
	};

	this.LoadMusicList = function(name, tv_show_uid){
		$('#id_label_tv_show_name').html(name);
		$('#id_div_tv_show_detail').animate({
			left: 0
		});

		$.getJSON(`db/tv_show/${tv_show_uid}.json`, function(music_list){
			self._music_list = music_list;
			self.DISP_MusicList();
		});
	};

	this.DISP_MusicList = function(){
		var control = 'window._tv_show_control';
		var h = ``;
		for(var i=0 ; i<self._music_list.length ; i++){			
			var music = self._music_list[i];
			h += MusicItem(self.PREFIX, control, i, music);
		}
		$('#id_div_tv_show_music_list').html(h);
	};

	this.OnClick_CloseDetail = function(){
		$('#id_div_tv_show_detail').animate({
			left: window.screen.width
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