
function MusicItem(m){
	var on_click = `SendMusicToPlayer('${m.title}', '', '${m.video_id}')`;
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

function SendMusicToPlayer(title, artist, video_id){
	var message = {
		head: 'mango',
		video_id: video_id,
		title: title,
		artist: artist
	};
	parent.postMessage(message, "*");
}