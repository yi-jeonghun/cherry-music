$('document').ready(function(){
	window._artist_control = new ArtistControl().Init();
});

function ArtistControl(){
	var self = this;

	this.Init = function(){
		self.LoadArtistList();

		PullToRefresh.init({
			mainElement: '#id_body',
			onRefresh: function() {
				location.reload();
			}
		});
		return this;
	};

	this.LoadArtistList = function(){
		$.getJSON( "db/artist_list.json", function(artist_list) {
			var h = ``;
			for(var i=0 ; i<artist_list.length ; i++){
				var a = artist_list[i];
				var on_click_artist = `window._artist_control.OnClick_ChooseArtist('${a.name}', '${a.artist_uid}')`;
				h += `
				<div class="row border-bottom px-0">
					<div class="col-12 px-0 py-1" style="cursor:pointer" onClick="${on_click_artist}">
						${a.name}
					</div>
				</div>
				`;
			}
			$('#id_div_list').html(h);
		});
	};

	this.OnClick_ChooseArtist = function(name, artist_uid){
		console.log('artist_uid ' + artist_uid);
		$('#id_label_artist_name').html(name);
		$('#id_div_artist_detail').show();
		$.getJSON(`db/artist/${artist_uid}.json`, function(music_list){
			self.DISP_MusicList(music_list);
		});
	};

	this.OnClick_CloseDetail = function(){
		$('#id_div_artist_detail').hide();
	};

	this.DISP_MusicList = function(music_list){
		var h = ``;
		for(var i=0 ; i<music_list.length ; i++){
			h += MusicItem(music_list[i]);
		}
		$('#id_div_music_list').html(h);
	};
}