$('#document').ready(function(){
	window._my_control = new MyControl().Init();
});

function MyControl(){
	var self = this;
	this._single_list = [];
	this._multi_list = [];
	this._artist_list = [];

	this.Init = function(){
		$('#id_div_artist_detail').css('left', window.screen.width);

		self.InitHandle();

		self._single_list = window._like_control.GetMusicListSingle();
		self._multi_list = window._like_control.GetMusicListMulti();
		self._artist_list = window._like_control.GetArtistList();

		self.DISP_MultiList();
		self.DISP_SingleList();
		self.DISP_ArtistList();
		return this;
	};

	this.InitHandle = function(){
		$('#id_nav_multi').on('click', self.OnClick_NavMulti);
		$('#id_nav_single').on('click', self.OnClick_NavSingle);
		$('#id_nav_artist').on('click', self.OnClick_NavArtist);
	};

	this.OnClick_NavMulti = function(){
		self.ChangeTab('multi');
	};
	this.OnClick_NavSingle = function(){
		self.ChangeTab('single');
	};
	this.OnClick_NavArtist = function(){
		self.ChangeTab('artist');
	};
	this.ChangeTab = function(tab){
		$('#id_nav_multi').removeClass('active');
		$('#id_nav_single').removeClass('active');
		$('#id_nav_artist').removeClass('active');

		$('#id_div_my_multi_list').hide();
		$('#id_div_my_single_list').hide();
		$('#id_div_my_artist_list').hide();

		switch(tab){
			case 'multi':
				$('#id_nav_multi').addClass('active');
				$('#id_div_my_multi_list').show();
				break;
			case 'single':
				$('#id_nav_single').addClass('active');
				$('#id_div_my_single_list').show();
				break;
			case 'artist':
				$('#id_nav_artist').addClass('active');
				$('#id_div_my_artist_list').show();
				break;
		}
	};

	this.DISP_MultiList = function(){
		var h = '';
		for(var i=0 ; i<self._multi_list.length ; i++){
			h += MusicItem(self._multi_list[i]);
		}
		$('#id_div_my_multi_list').html(h);
	};
	this.DISP_SingleList = function(){
		var h = '';
		for(var i=0 ; i<self._single_list.length ; i++){
			h += MusicItem(self._single_list[i]);
		}
		$('#id_div_my_single_list').html(h);
	};
	this.DISP_ArtistList = function(){
		var h = '';
		for(var i=0 ; i<self._artist_list.length ; i++){
			var a = self._artist_list[i];
			var heart_color = 'Black';
			if(window._like_control.FindArtist(a.artist_uid)){
				heart_color = 'Red';
			}
			var on_click_artist = `window._my_control.OnClick_ChooseArtist('${a.name}', '${a.artist_uid}')`;
			var on_click_like = `window._like_control.OnClickLikeArtist('${a.artist_uid}', '${a.name}')`;
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
		$('#id_div_my_artist_list').html(h);
	};

	//==================================================================
	this.OnClick_ChooseArtist = function(name, artist_uid){
		$('#id_label_my_artist_name').html(name);
		$('#id_div_my_artist_detail').animate({
			left: 0
		});
		$.getJSON(`db/artist/${artist_uid}.json`, function(music_list){
			self.DISP_MusicList(music_list);
		});
	};

	this.OnClick_CloseDetail = function(){
		$('#id_div_my_artist_detail').animate({
			left: window.screen.width
		});
	};

	this.DISP_MusicList = function(music_list){
		var h = ``;
		for(var i=0 ; i<music_list.length ; i++){
			h += MusicItem(music_list[i]);
		}
		$('#id_div_my_music_list').html(h);
	};
}