
function MusicItem(m){
	var on_click_play = `SendMusicToPlayer('${m.music_uid}', '${m.title}', '${m.artist_uid}', '${m.artist}', '${m.video_id}')`;
	var on_click_like = `window._favorite_control.OnClickLikeMusic('${m.music_uid}', '${m.title}', '${m.artist_uid}', '${m.artist}', '${m.video_id}', ${m.is_multiple})`;
	var heart_color = 'Black';
	if(m.is_multiple){
		if(window._favorite_control.FindMusicMulti(m.music_uid)){
			heart_color = 'Red';
		}	
	}else{
		if(window._favorite_control.FindMusicSingle(m.music_uid)){
			heart_color = 'Red';
		}
	}

	var artist_name = m.artist;
	if(m.artist_uid == '0000000000'){
		artist_name = '';
	}

	var h = `
	<div class="row border-bottom px-0 py-1">
		<div class="col-3 px-0">
			<img style="width: 100%; height: auto;" src="https://img.youtube.com/vi/${m.video_id}/0.jpg">
		</div>
		<div class="col-7 px-2">
			${m.title}
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
					<i id="id_btn_heart_${m.music_uid}" class="fas fa-heart" style="font-size: 1em;"></i>
				</button>						
			</div>
		</div>
	</div>
	`;
	return h;
}

function SendMusicToPlayer(music_uid, title, artist_uid, artist, video_id){
	var message = {
		head: 'MANGO',
		command: 'AddMusic',
		music: {
			music_uid: music_uid,
			title: title,
			artist_uid: artist_uid,
			artist: artist,
			video_id: video_id,
		}
	};
	parent.postMessage(message, "*");
}