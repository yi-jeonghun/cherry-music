$('document').ready(function(){
	window._home_control = new HomeControl().Init();
});

function HomeControl(){
	var self = this;

	this.Init = function(){
		PullToRefresh.init({
			mainElement: '#id_body',
			onRefresh: function() {
				location.reload();
			}
		});

		self.LoadMusicListMulti();
		self.LoadMusicListSingle();

		return this;
	};

	this.LoadMusicListMulti = function(){
		$.getJSON( "db/music_multi_list.json", function(music_list) {
			self.DISP_RecentMulti(music_list);
		});
	};

	this.LoadMusicListSingle = function(){
		$.getJSON( "db/music_single_list.json", function(music_list) {
			self.DISP_RecentSingle(music_list);
		});
	};

	this.DISP_RecentMulti = function(music_list){
		var h = ``;
		for(var i=0 ; i<music_list.length ; i++){
			if(i > 9){
				break;
			}
			var m = music_list[i];
			var on_click_play = `SendMusicToPlayer('${m.music_uid}', '${m.title}', '${m.artist_uid}', '${m.artist}', '${m.video_id}')`;
			var artist_name = m.artist;
			if(m.artist_uid == '0000000000'){
				artist_name = '';
			}
			h += `
			<div style="padding: 5px;">
				<div style="width: 200px; color: red; position:relative; cursor:pointer" onClick="${on_click_play}">
					<img style="width: 100%; height: auto;" src="https://img.youtube.com/vi/${m.video_id}/0.jpg">
					<div style="position: absolute; left:90px; top:60px">
						<i id="id_btn_play_pause" class="fas fa-play" style="color:red; font-size: 2.5em;"></i>
					</div>
				</div>
				<div style="margin-top: 5px">${m.title}</div>
				<div>${artist_name}</div>
			</div>
			`;
		}
		$('#id_div_multi_list').html(h);
	};

	this.DISP_RecentSingle = function(music_list){
		var h = ``;
		for(var i=0 ; i<music_list.length ; i++){
			if(i > 9){
				break;
			}
			var m = music_list[i];
			var on_click_play = `SendMusicToPlayer('${m.music_uid}', '${m.title}', '${m.artist_uid}', '${m.artist}', '${m.video_id}')`;
			var artist_name = m.artist;
			if(m.artist_uid == '0000000000'){
				artist_name = '';
			}
			h += `
			<div style="padding: 5px">
				<div style="width: 200px; color: red; position:relative; cursor:pointer" onClick="${on_click_play}">
					<img style="width: 100%; height: auto;" src="https://img.youtube.com/vi/${m.video_id}/0.jpg">
					<div style="position: absolute; left:90px; top:60px">
						<i id="id_btn_play_pause" class="fas fa-play" style="color:red; font-size: 2.5em;"></i>
					</div>
				</div>
				<div style="margin-top: 5px">${m.title}</div>
				<div>${artist_name}</div>
			</div>
			`;
		}
		$('#id_div_single_list').html(h);
	};
}