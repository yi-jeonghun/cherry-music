const DIRECTION = {
	FORWARD:0,
	BACKWARD:1
};

//가라고 하는 곳으로 가기만 하게 만들자
//여기는 되도록이면 무뇌하게.
function Router(){
	var self = this;
	this._cur_path = '';

	this.Init = function(){
		window.addEventListener("popstate", self.OnPopState);
		self.ScrollEventHandle();
		return this;
	};

	this.GoHome = function(){
		// if(window._country_code == 'KR'){
		// 	self.Go('/');
		// }else{
		// 	self.Go(`/${window._country_code}/top_rank.go`);
		// }
	};

	this.LoadInitRoute = function(){
		console.log('LoadInitRoute ');
		var pathname = document.location.pathname;
		var search = document.location.search;

		if(pathname == '/'){
			//당분간은 한국만 home 화면을 지원함.
			// if(window._country_code == 'KR'){
			// 	console.log('go home ');
			// 	self.Go('/');
			// }else{
			// 	var source_list = window._top_100_source.list[window._country_code];
			// 	var source = source_list[0].source;
			// 	self.Go(`/${window._country_code}/top_rank.go?s=${source}`);	
			// }
		}else{
			var path = pathname + search;
			self.Go(path);
		}
	};

	this.Go = function(path){
		console.log('path ' + path);
		window.history.pushState('', '', path);
		self.GoTo(path, DIRECTION.FORWARD);
	};

	//path는 항상 다음의 형태
	//  /<2자리 국가코드>/<feature>.go?key=value&...
	this.GoTo = function(path, direction){
		self._cur_path = path;
		// console.log('path ' + path);
		var path_after_cc = path.substr(4);
		var path_arr = path_after_cc.split('?');
		var feature = path_arr[0];
		console.log('feature ' + feature);

		var args = path_arr.length > 1 ? path_arr[1] : null;
		var arg_list = self.ParseArgs(args);

		{
			$('#id_router-home').hide();
			$('#id_router-top_rank').hide();
			$('#id_router-artist').hide();
			$('#id_router-my_playlist').hide();
			$('#id_router-my_playlist_detail').hide();
			$('#id_router-open_playlist').hide();
			$('#id_router-open_playlist_detail').hide();
			$('#id_router-search').hide();
			$('#id_router-like').hide();
			$('#id_router-music').hide();
			$('#id_router-radio_list').hide();
			$('#id_router-radio_detail').hide();
			$('#id_router-era').hide();
			$('#id_router-era_chart').hide();
		}

		switch(feature){
			case '':
				$('#id_router-home').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_Home();
				}
				break;
			case 'top_rank.go':
				$('#id_router-top_rank').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_TopRank(args, arg_list);
				}
				break;
			case 'artist.go':
				$('#id_router-artist').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_Artist(args, arg_list);
				}
				break;
			case 'search.go':
				$('#id_router-search').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_Search();
				}
				break;
			case 'my_playlist.go':
				$('#id_router-my_playlist').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_MyPlaylist();
				}
				break;
			case 'my_playlist_detail.go':
				$('#id_router-my_playlist_detail').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_MyPlaylistDetail(args, arg_list);
				}
				break;
			case 'open_playlist.go':
				$('#id_router-open_playlist').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_OpenPlaylist();
				}
				break;
			case 'open_playlist_detail.go':
				$('#id_router-open_playlist_detail').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_OpenPlaylistDetail(args, arg_list);
				}
				break;
			case 'like.go':
				$('#id_router-like').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_Like();
				}
				break;
			case 'music.go':
				$('#id_router-music').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_Music(args, arg_list);
				}
				break;
			case 'radio_list.go':
				$('#id_router-radio_list').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_RadioList(args, arg_list);
				}
				break;
			case 'radio_detail.go':
				$('#id_router-radio_detail').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_RadioDetail(args, arg_list);
				}
				break;
			case 'era.go':
				$('#id_router-era').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_Era(args, arg_list);
				}
				break;
			case 'era_chart.go':
				$('#id_router-era_chart').show();
				if(direction == DIRECTION.FORWARD){
					self.GoTo_EraChart(args, arg_list);
				}
				break;	
			}
	};

	this.GoTo_Home = function(){
		var target_div = 'id_router-home';
		var route_url = '/home.vu';
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_TopRank = function(args, arg_list){
		{
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var source_name = '';
			{
				var source_list = window._top_100_source.list[window._country_code];
				var source = arg_list['s'];
				console.error('source ' + source);
				for(var s=0 ; s<source_list.length ; s++){
					if(source == source_list[s].source){
						source_name = source_list[s].name;
					}	
				}
			}

			var title = `${source_name} Top 100 - Cherry Music [${country_name}]`;
			var keywords = `${country_name} ${source_name} Top 100, ` + TR(L_TOP_RANK_META_KEYWORDS);
			var desc = `${country_name} ${source_name} Top 100, ` + TR(L_TOP_RANK_META_DESC);
			self.UpdateMeta(title, keywords, desc);	
		}

		var target_div = 'id_router-top_rank';
		var route_url = '/top_rank.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_Artist = function(args, arg_list){
		var target_div = 'id_router-artist';
		var route_url = '/artist.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.UpdateMeta_Artist = function(artist){
		var country_name = COUNTRY_NAME_LIST[window._country_code];
		var title = artist + ' - Cherry Music [' + country_name + ']';
		var keywords = artist + TR(L_ARTIST_META_KEYWORDS);
		var desc = artist + TR(L_ARTIST_META_DESC);
		this.UpdateMeta(title, keywords, desc);	
	}

	this.GoTo_Search = function(){
		{
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var title = 'Search - Cherry Music [' + country_name + ']';
			var keywords = 'Search';
			var desc = 'Search';
			this.UpdateMeta(title, keywords, desc);	
		}

		var target_div = 'id_router-search';
		var route_url = '/search.vu';
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_MyPlaylist = function(){
		{
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var title = 'My Playlist - Cherry Music [' + country_name + ']';
			var keywords = 'My Playlist';
			var desc = 'My Playlist';
			this.UpdateMeta(title, keywords, desc);	
		}

		var target_div = 'id_router-my_playlist';
		var route_url = '/my_playlist.vu';
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_MyPlaylistDetail = function(args, arg_list){
		var target_div = 'id_router-my_playlist_detail';
		var route_url = '/my_playlist_detail.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.UpdateMeta_MyPlaylistDetail = function(playlist_name, desc){
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var title = playlist_name + ' - Cherry Music [' + country_name + ']';
			var keywords = 'Playlist ' + desc;
			var desc = 'Playlist ' + desc;
			this.UpdateMeta(title, keywords, desc);	
	};

	this.GoTo_OpenPlaylist = function(){
		{
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var title = 'Playlist - Cherry Music [' + country_name + ']';
			var keywords = 'Playlist';
			var desc = 'Playlist';
			this.UpdateMeta(title, keywords, desc);	
		}

		var target_div = 'id_router-open_playlist';
		var route_url = '/open_playlist.vu';
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_OpenPlaylistDetail = function(args, arg_list){
		var target_div = 'id_router-open_playlist_detail';
		var route_url = '/open_playlist_detail.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.UpdateMeta_OpenPlaylistDetail = function(playlist_name, desc){
		var country_name = COUNTRY_NAME_LIST[window._country_code];
		var title = playlist_name + ' - Cherry Music [' + country_name + ']';
		var keywords = 'Playlist ' + desc;
		var desc = 'Playlist ' + desc;
		this.UpdateMeta(title, keywords, desc);	
	};

	this.GoTo_Like = function(){
		{
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var title = 'Like - Cherry Music [' + country_name + ']';
			var keywords = 'Like artist, like playlist, like music, favorite music';
			var desc = 'Like artist, like playlist, like music, favorite music';
			this.UpdateMeta(title, keywords, desc);	
		}

		var target_div = 'id_router-like';
		var route_url = '/like.vu?';
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_Music = function(args, arg_list){
		var target_div = 'id_router-music';
		var route_url = '/music.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_RadioList = function(args, arg_list){
		var target_div = 'id_router-radio_list';
		var route_url = '/radio_list.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.GoTo_RadioDetail = function(args, arg_list){
		var target_div = 'id_router-radio_detail';
		var route_url = '/radio_detail.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.UpdateMeta_Music = function(title, artist){
		var country_name = COUNTRY_NAME_LIST[window._country_code];
		var title = `${title} - ${artist} | Cherry Music[${country_name}]`;
		var keywords = `${title}, ${artist}, ${TR(L_LYRICS)}`;
		var desc = `${title}, ${artist}, ${TR(L_LYRICS)}`;
		this.UpdateMeta(title, keywords, desc);	
	}

	this.GoTo_Era = function(args, arg_list){
		var target_div = 'id_router-era';
		var route_url = '/era.vu?'+args;
		self.LoadInnerView(target_div, route_url);

		{
			var country_name = COUNTRY_NAME_LIST[window._country_code];
			var title = `${TR(L_CHART_BY_ERA)} - Cherry Music [${country_name}]`;
			var keywords = `${TR(L_CHART_BY_ERA)}`;
			var desc = `${TR(L_CHART_BY_ERA)}`;
			this.UpdateMeta(title, keywords, desc);		
		}
	};

	this.GoTo_EraChart = function(args, arg_list){
		var target_div = 'id_router-era_chart';
		var route_url = '/era_chart.vu?'+args;
		self.LoadInnerView(target_div, route_url);
	};

	this.UpdateMeta_EraChart = function(meta){
		var country_name = COUNTRY_NAME_LIST[window._country_code];
		var title = `${TR(L_CHART_BY_ERA)} : ${meta} - Cherry Music [${country_name}]`;
		var keywords = `${TR(L_CHART_BY_ERA)}, ${meta}`;
		var desc = `${TR(L_CHART_BY_ERA)}, ${meta}`;
		this.UpdateMeta(title, keywords, desc);	
	};

	////////////////////////////////////////////////////////////////////

	this.UpdateMeta = function(title, keywords, desc){
		$('title').text(title);
		$("meta[property='og:title']").attr("content", title);

		$("meta[name=description]").attr("content", desc);
		$("meta[property='og:description']").attr("content", desc);

		$("meta[name=keywords]").attr("content", keywords);
	};

	this.ParseArgs = function(args){
		var ret = [];
		if(args == null){
			return ret;
		}

		var arg_list = args.split('&');
		for(var i=0 ; i<arg_list.length ; i++){
			var key_value = arg_list[i].split('=');
			if(key_value.length == 2){
				var key = key_value[0];
				var value = key_value[1];
				ret[key] = decodeURI(value);
			}
		}

		return ret;
	};

	this.LoadInnerView = function(target_div, route_url){
		$.get(route_url, (body)=>{
			var new_body = '';
			var arr = body.split(/{%|%}/);
			for(var i=0 ; i<arr.length ; i++){
				if(arr[i].indexOf('L_') == 0){
					var L_ = window[arr[i]];
					var tr = TR(L_);
					new_body += tr;
				}else{
					new_body += arr[i];
				}
			}

			$('#'+target_div).html(new_body);
			{
				var key = 'SCORLL_TOP-' + self._cur_path;
				var scroll_top = window.localStorage.getItem(key);

				$('.main_div').animate({
					scrollTop: scroll_top
				}, 'fast');
			}
		});
	};
	
	this.ScrollEventHandle = function(){
		$('.main_div').on('scroll', function(e) {
			var key = 'SCORLL_TOP-' + self._cur_path;
			var val = this.scrollTop;
			console.log(key + ' : ' + val);
			window.localStorage.setItem(key, val);
		});
	};

	this.OnPopState = function(event){
		console.log('OnPopState ' );
		var pathname = document.location.pathname;
		var search = document.location.search;
		var path = pathname + search;
		self.GoTo(path, DIRECTION.BACKWARD);
	};
}