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
		return this;
	};

	this.Play = function(video_id){
		console.log('[web] video_id ' + video_id);
		var message = {
			head: 'mango',
			video_id: video_id,
			title: '제목입니당',
			artist: '나가수'
		};
		console.log('[web] message.video_id ' + message.video_id);
		parent.postMessage(message, "*");
	};
}