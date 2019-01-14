// ==UserScript==
// @name        habr-comments-control
// @namespace   http*://habr*.*/*
// @namespace   http://habr.com
// @include     http://habr.com/post/*
// @include     http://habr.com/company/*
// @include     http://habr.com/article/*
// @include     https://habr.com/post/*
// @include     https://habr.com/company/*
// @include     https://habr.com/article/*
// @run-at      document-start
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==

window.addEventListener('DOMContentLoaded', Run);

function Run() {

    GM_addStyle('.voting-wjt__counter {visibility: hidden; display: none;');
    GM_addStyle('.comment__message_downgrade {opacity: 1 !important;}');
    GM_addStyle('hr.btwncmnts {display: block;  margin-top: 2em;  margin-bottom: 2em; width: 90%; height: 1px; border: none; color:#e3e3e3;background-color:#e3e3e3;}');

    GM_addStyle('.brtggl {visibility: hidden; display: none;} label.cmmtggl {display: block; color: #666;}');

    GM_addStyle('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "\\1f4ac h"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}'); //\\16A5

    GM_addStyle('label.lngcmmtggl {vertical-align: middle; font-style: italic; display: block; text-align: center; width: 100%; color: #bbb; }');

    GM_addStyle('.brtggl:checked ~ label.cmmtggl::before { content: "Ц";}');

    GM_addStyle('div.lngcmmnt { width: 100%; max-height: 8em; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0)); -webkit-mask-size: 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: 100% 50%;}');
    
    let rootcmnts = document.getElementById('comments-list').children;

    for (let i=0; i < rootcmnts.length; i++ ){

		let tmphtml = (rootcmnts[i].querySelector('ul.content-list_nested-comments'));
        let tmp3 = tmphtml.children.length;
		if ( tmp3 > 0 ) {
			let tmpid = rootcmnts[i].querySelector('ul.content-list_nested-comments').id;
			tmphtml.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"tggl_"+tmpid+"\"><label class=\"cmmtggl\" for=\"tggl_"+tmpid+"\" id=\"ltggl_"+tmpid+"\"></label>" + tmphtml.outerHTML;
			GM_addStyle('#'+tmpid+' {visibility: hidden; display: none;}');
			GM_addStyle('#tggl_'+tmpid+':checked ~ #'+tmpid+'{visibility: visible; display: block;}');
            var tmpamnt = rootcmnts[i].querySelectorAll('li.content-list__item_comment').length;
            GM_addStyle('#ltggl_'+tmpid+'::after {content: \"\\0020 '+tmpamnt+'\"}');
			rootcmnts[i].querySelector('ul.content-list_nested-comments').outerHTML = tmphtml.outerHTML;
		}
	}

    for (let i=0; i < rootcmnts.length; i++){

        let tmp = rootcmnts[i].querySelector("div.comment__message");
		if (tmp.innerHTML.length < 64);

        if (tmp.innerText.length > 400) {

            let tmpid = rootcmnts[i].querySelector('div.comment').id;
            tmp.classList.add("lngcmmnt"); tmp.id = ("lngcmmnt_"+tmpid);
            tmp.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"lngcmnttggl_"+tmpid+"\">"+tmp.outerHTML+"<label class=\"lngcmmtggl\" for=\"lngcmnttggl_"+tmpid+"\" id=\"lntggl_"+tmpid+"\">развернуть</label>";

            GM_addStyle('#lngcmnttggl_'+tmpid+':checked ~ #lngcmmnt_'+tmpid+' {max-height: none; -webkit-mask-image:none}'); 
            GM_addStyle('#lngcmnttggl_'+tmpid+':checked ~ #lntggl_'+tmpid+'{visibility: hidden; display:none;}');
        };
	}

    var rtcmntsarr = [];
    var shrtcmntsarr = [];
    let ii = 0;
    for (let i=0; i < rootcmnts.length; i++ ) {

        let tmp = rootcmnts[i].querySelector("div.comment__message");
		if (tmp.innerText.length < 64) {

            shrtcmntsarr[ii] = rootcmnts[i].outerHTML;
            shrtcmntsarr[ii++] += "<hr class=\"btwncmnts\">";
            //i--;
            continue;
        };

        rtcmntsarr[i-ii] = rootcmnts[i].outerHTML;
        rtcmntsarr[i-ii] += "<hr class=\"btwncmnts\">";
    }

    document.getElementById("comments-list").innerHTML = "";
  
    var bigstr = "";

	while ( rtcmntsarr.length > 0){

		let tmp2 = Math.floor(Math.random() * rtcmntsarr.length);
		bigstr += rtcmntsarr[tmp2];
		rtcmntsarr.splice(tmp2,1);

	}

    while ( shrtcmntsarr.length > 0){

		let tmp2 = Math.floor(Math.random() * shrtcmntsarr.length);
		bigstr += shrtcmntsarr[tmp2];
		shrtcmntsarr.splice(tmp2,1);

	}

    document.getElementById("comments-list").innerHTML = bigstr;

}