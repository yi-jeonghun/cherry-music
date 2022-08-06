$('document').ready(function(){
	window._multi_control = new MultiControl().Init();
});

function MultiControl(){
	var self = this;

	this.Init = function(){
		console.log('multi init ');
		self.LoadMusicList();
		return this;
	};

	this.LoadMusicList = function(){
		$.getJSON( "db/music_multi_list.json", function(music_list) {
			console.log('loaded ' + music_list.length);
			var h = ``;
			for(var i=0 ; i<music_list.length ; i++){
				h += MusicItem(music_list[i]);
			}
			$('#id_div_multi_list').html(h);
		});
	};
}