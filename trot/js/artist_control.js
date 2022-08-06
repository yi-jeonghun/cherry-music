$('document').ready(function(){
	window._artist_control = new ArtistControl().Init();
});

function ArtistControl(){
	var self = this;

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
				if(window._favorite_control.FindArtist(a.artist_uid)){
					heart_color = 'Red';
				}			
				var on_click_artist = `window._artist_control.OnClick_ChooseArtist('${a.name}', '${a.artist_uid}')`;
				var on_click_like = `window._favorite_control.OnClickLikeArtist('${a.artist_uid}', '${a.name}')`;
				h += `
				<div class="row border-bottom py-1">
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
			self.DISP_MusicList(music_list);
		});
	};

	this.OnClick_CloseDetail = function(){
		$('#id_div_artist_artist_detail').animate({
			left: window.screen.width
		});
	};

	this.DISP_MusicList = function(music_list){
		var h = ``;
		for(var i=0 ; i<music_list.length ; i++){
			h += MusicItem(music_list[i]);
		}
		$('#id_div_artist_music_list').html(h);
	};
}