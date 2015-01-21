(function($) {
	$.myUtil = {
		alert: {
			show: function(title, content, modal) {
				title = title || '来自网页的信息';
				if ($('.mu-alert').length == 0) {
					var html = '<div class="mu-alert mu-hide">' 
						+ '<div class="mu-alert-title" ></div>'
						+ '<div class="mu-alert-content"></div>'
						+ '<div class="mu-alert-btn"><span>确 定</span></div>'
						+ '</div>';
					$('body').append(html);
				}
				var $alert = $('.mu-alert');
				$alert.find('.mu-alert-title').text(title);
				$alert.find('.mu-alert-content').text(content);
				var h = $alert.height(),
					w = $alert.width(),
					winH = $.myUtil.getWinHeight(),
					winW = $.myUtil.getWinWidth();
				$alert.css({
					top: (winH - h) / 2,
					left: (winW - w) / 2
				});
				if (modal) {
					$.myUtil.modal.show(null, function() {
						$alert.fadeIn(500);
					});
				} else {
					$alert.fadeIn(500);
				}
			},
			close: function() {
				$('.mu-alert').fadeOut(500, 'swing', function() {
					$.myUtil.modal.close();
				});
			}
		},
		loading: {
			show: function(text) {
				text = text || '加载中...';
				if ($('.mu-loading').length == 0) {
					var html = '<div class="mu-loading mu-hide"><img src="./img/loader.gif" /><div class="mu-loading-text">加载中...</div></div>';
					$('body').append(html);
				}
				var $load = $('.mu-loading');
				$load.children('.mu-loading-text').text(text);
				var h = $load.height(),
					w = $load.width(),
					winH = $.myUtil.getWinHeight(),
					winW = $.myUtil.getWinWidth();
				$load.css({
					top: (winH - h) / 2,
					left: (winW - w) / 2
				});
				$.myUtil.modal.show();
				$load.show();
			},
			close: function() {
				$('.mu-loading').hide();
				$.myUtil.modal.close();
			}
		},
		modal: {
			show: function(speed, cb) {
				if ($('.mu-modal').length == 0) {
					var html = '<div class="mu-modal mu-hide"></div>';
					$('body').append(html);
				}
				$('.mu-modal').show();
				$('.mu-modal').animate({
					height: $.myUtil.getWinHeight()
				}, speed || 100, 'swing', function() {
					cb && cb();
				});
			},
			close: function() {
				$('.mu-modal').animate({
					height: 0
				}, 100);
			}
		},
		getWinHeight: function() {
		    var winHeight = 0;
		    // 获取窗口高度
		    if (window.innerHeight)
		        winHeight = window.innerHeight;
		    else if ((document.body) && (document.body.clientHeight))
		        winHeight = document.body.clientHeight;
		    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
		    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
		    {
		        winHeight = document.documentElement.clientHeight;
		    }
		    if(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0
		    		&& navigator.userAgent.indexOf("CriOS") < 0) {
		    	winHeight -= 20;
			} 
		    return winHeight;
		},
		getWinWidth: function() {
		    var winWidth = 0;
		    // 获取窗口宽度
		    if (window.innerWidth)
		        winWidth = window.innerWidth;
		    else if ((document.body) && (document.body.clientWidth))
		        winWidth = document.body.clientWidth;
		    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
		    {
		        winWidth = document.documentElement.clientWidth;
		    }
		    return winWidth;
		}
	};
	$(function() {
		$('body').on('click', '.mu-alert .mu-alert-btn span', function() {
			$.myUtil.alert.close();
		});
		$('body').on('click', '.mu-modal', function() {
			$.myUtil.alert.close();
		});
	});
})(jQuery)