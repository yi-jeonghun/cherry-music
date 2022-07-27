
function MusicItem(m){
	var on_click = `SendMusicToPlayer('${m.music_uid}', '${m.title}', '${m.artist_uid}', '${m.artist}', '${m.video_id}')`;
	var h = `
	<div class="row border-bottom px-0 py-1">
		<div class="col-3 px-0">
			<img style="width: 100%; height: auto;" src="https://img.youtube.com/vi/${m.video_id}/0.jpg">
		</div>
		<div class="col-7 px-2">
			${m.title}
		</div>
		<div class="col-2 px-0 my-auto text-right">
			<button type="button" class="btn btn-light" onClick="${on_click}">
				<i id="id_btn_play_pause" class="fas fa-play" style="font-size: 1em;"></i>
			</button>						
		</div>
	</div>
	`;
	return h;
}

function SendMusicToPlayer(music_uid, title, artist_uid, artist, video_id){
	var message = {
		head: 'mango',
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