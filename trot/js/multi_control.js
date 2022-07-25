$('document').ready(function(){
	window._multi_control = new MultiControl().Init();
});

function MultiControl(){
	var self = this;

	this.Init = function(){
		self.LoadMusicList();

		PullToRefresh.init({
			mainElement: '#id_body',
			onRefresh: function() {
				location.reload();
			}
		});
		return this;
	};

	this.LoadMusicList = function(){
		$.getJSON( "db/music_multi_list.json", function(music_list) {
			var h = ``;
			for(var i=0 ; i<music_list.length ; i++){
				h += MusicItem(music_list[i]);
			}
			$('#id_div_list').html(h);
		});
	};
}