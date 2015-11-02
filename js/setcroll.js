
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');

		for (i=0; i<3; i++) {
			li = document.createElement('li');
			li.className='appone'
			li.innerHTML= '<div class="appico"><img src="img/thumbs/1.jpg" height="150" width="150" alt=""></div><div class="apptxt"><ul class="app-title">违章查询11</ul><ul class="app-category">生活</ul></div><div class="appbtn"><span class="dbtn">下载</span></div>'
			el.insertBefore(li, el.childNodes[0]);
		}

		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');

		for (i=0; i<3; i++) {
			li = document.createElement('li');
			li.className='appone';
            			li.innerHTML= '<div class="appico"><img src="img/thumbs/1.jpg" height="150" width="150" alt=""></div><div class="apptxt"><ul class="app-title">违章查询'+i+'</ul><ul class="app-category">生活</ul></div><div class="appbtn"><span class="dbtn">下载</span></div>'

			el.appendChild(li, el.childNodes[0]);
		}

		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉加载更多...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉加载更多...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉加载更多...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 1) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 1) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在加载...';
				pullUpAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载...';
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);