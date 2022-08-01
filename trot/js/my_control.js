$('#document').ready(function(){
	window._my_control = new MyControl().Init();
});

function MyControl(){
	var self = this;
	this._music_list = [];

	this.Init = function(){
		PullToRefresh.init({
			mainElement: '#id_body',
			onRefresh: function() {
				location.reload();
			}
		});

		self._music_list = window._favorite_control.GetMusicList();
		self.DISP_MusicList();
		return this;
	};

	this.DISP_MusicList = function(){
		console.log('self._music_list ' + JSON.stringify(self._music_list));
		var h = '';
		for(var i=0 ; i<self._music_list.length ; i++){
			h += MusicItem(self._music_list[i]);
		}
		$('#id_div_list').html(h);
	};
}