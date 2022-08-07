
function MusicItem(control, index, music, sub_type){
	music.title = EscapeHtml(music.title);

	var on_click_play = `${control}.SendMusicToPlayer(${index}, '${sub_type}')`;
	var on_click_like = `${control}.LikeMusic(${index}, '${sub_type}')`;

	var heart_color = 'Black';
	if(music.is_multiple){
		if(window._like_control.FindMusicMulti(music.music_uid)){
			heart_color = 'Red';
		}	
	}else{
		if(window._like_control.FindMusicSingle(music.music_uid)){
			heart_color = 'Red';
		}
	}

	var artist_name = music.artist;
	if(music.artist_uid == '0000000000'){
		artist_name = '';
	}

	var h = `
	<div class="row border-bottom px-0 py-1">
		<div class="col-3 px-0">
			<img style="width: 100%; height: auto;" src="https://img.youtube.com/vi/${music.video_id}/0.jpg">
		</div>
		<div class="col-7 px-2">
			${music.title}
			<br>
			${artist_name}
		</div>
		<div class="col-2 px-0 my-auto text-center">
			<div style="margin-bottom:2px">
				<button type="button" class="btn border" onClick="${on_click_play}">
					<i id="" class="fas fa-play" style="font-size: 1em;"></i>
				</button>						
			</div>
			<div>
				<button type="button" class="btn border" onClick="${on_click_like}" style="color:${heart_color}">
					<i id="id_btn_heart_${music.music_uid}" class="fas fa-heart" style="font-size: 1em;"></i>
				</button>						
			</div>
		</div>
	</div>
	`;
	return h;
}

function SendMessage_AddMusic(music){
	var message = {
		head: 'MANGO',
		command: 'AddMusic',
		music: music
	};
	parent.postMessage(message, "*");
}

function EscapeHtml(unsafe){
	return unsafe
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
 }