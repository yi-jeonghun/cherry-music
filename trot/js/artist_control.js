$('document').ready(function(){
	window._artist_control = new ArtistControl().Init();
});

function ArtistControl(){
	var self = this;
	this.PREFIX = 'ArtistControl';
	this._music_list = [];

	this.Init = function(){
		self.LoadArtistList();

		$('#id_div_artist_detail').css('left', window.screen.width);
		return this;
	};

	this.LoadArtistList = function(){
		$.getJSON( "db/artist_list.json", function(artist_list) {
			var h = ``;
			for(var i=0 ; i<artist_list.length ; i++){
				var a = artist_list[i];
				var heart_color = 'Black';
				if(window._like_control.FindArtist(a.artist_uid)){
					heart_color = 'Red';
				}			
				var on_click_artist = `window._artist_control.OnClick_ChooseArtist('${a.name}', '${a.artist_uid}')`;
				var on_click_like = `window._like_control.OnClickLikeArtist('${a.artist_uid}', '${a.name}')`;
				h += `
				<div class="row border-bottom py-2">
					<div class="col-10 my-auto" style="cursor:pointer" onClick="${on_click_artist}">
						${a.name}
					</div>
					<div class="col-2">
						<button type="button" class="btn border my-auto" onClick="${on_click_like}" style="color:${heart_color}">
							<i id="id_btn_heart_${a.artist_uid}" class="fas fa-heart" style="font-size: 1em;"></i>
						</button>
					</div>
				</div>
				`;
			}
			$('#id_div_artist_list').html(h);
		});
	};

	//==================================================================

	this.OnClick_ChooseArtist = function(name, artist_uid){
		$('#id_label_artist_artist_name').html(name);
		$('#id_div_artist_artist_detail').animate({
			left: 0
		});

		$.getJSON(`db/artist/${artist_uid}.json`, function(music_list){
			self._music_list = music_list;
			self.DISP_MusicList();
		});
	};

	this.OnClick_CloseDetail = function(){
		$('#id_div_artist_artist_detail').animate({
			left: window.screen.width
		});
	};

	this.DISP_MusicList = function(){
		var control = 'window._artist_control';
		var h = ``;
		for(var i=0 ; i<self._music_list.length ; i++){			
			var music = self._music_list[i];
			h += MusicItem(self.PREFIX, control, i, music);
		}
		$('#id_div_artist_music_list').html(h);
	};

	this.SendMusicToPlayer = function(index){
		SendMessage_AddMusic(self._music_list[index]);
	};

	this.LikeMusic = function(index){
		window._like_control.OnClickLikeMusic(self._music_list[index]);
	};

	this.ListenAll = function(){
		SendMessage_ListenAll(self._music_list);
	};
}