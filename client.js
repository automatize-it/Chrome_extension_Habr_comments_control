var sttngsarr = {'hcc_rndmsrt': '0', 'hcc_cllpsbrnchs': '0', 'hcc_enbldvdr': '0', 'hcc_hiderate': '0', 'hcc_hideshdwng': '0', 'hcc_hidelng': '0', 'hcc_shrt2bttm': '0', 'hcc_hidelng_lngth': '420', 'hcc_shrt2bttm_lngth': '50'};

function hcc_start(){
	
	chrome.storage.local.get('hcc_glblswtch', function (result) {
				
		if (result.hcc_glblswtch == null) {
				
			chrome.storage.local.set({'hcc_glblswtch': '1'}, function(){
				
				chrome.storage.local.set({'hcc_strdsttngs': sttngsarr}, function(){
					console.log(sttngsarr);
					applyformat();
				});
			});
			//hcc_setup();
		}
		
		if (result.hcc_glblswtch == '1') {
			
			chrome.storage.local.get({'hcc_strdsttngs': {}}, function (result) {
				
				sttngsarr = result.hcc_strdsttngs;
				applyformat();
			});	
		}		
	});
}

function hcc_setup(){
	
	chrome.storage.local.set({hcc_strdsttngs: sttngsarr}, function(){});
}

function addcss(css){
	
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
 }

function applyformat(){
	
	console.log(sttngsarr);
		
	var rootcmnts = document.getElementById('comments-list').children;
	
	if (sttngsarr.hcc_hiderate == '1'){ addcss('.voting-wjt__counter {visibility: hidden; display: none;');}
	
	if (sttngsarr.hcc_hideshdwng == '1'){ addcss('.comment__message_downgrade {opacity: 1 !important;}');}
	
	if (sttngsarr.hcc_enbldvdr == '1') {addcss('hr.btwncmnts {display: block;  margin-top: 2em;  margin-bottom: 2em; width: 90%; height: 1px; border: none; color:#e3e3e3;background-color:#e3e3e3;}');}
	
	if (sttngsarr.hcc_hidelng == '1') { 
	
		addcss('div.lngcmmnt { width: 100%; max-height: 8em; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0)); -webkit-mask-size: 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: 100% 50%;}'); 
		
		addcss('label.lngcmmtggl {vertical-align: middle; font-style: italic; display: block; text-align: center; width: 100%; color: #bbb; }');
	}
					
	if (sttngsarr.hcc_cllpsbrnchs == '1'){  
		
		addcss('.brtggl {visibility: hidden; display: none;} label.cmmtggl {display: block; color: #666;}');
		addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "\\1f4ac h"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}');
		addcss('.brtggl:checked ~ label.cmmtggl::before { content: "–";}');
		
		for (let i=0; i < rootcmnts.length; i++ ){

			let tmphtml = (rootcmnts[i].querySelector('ul.content-list_nested-comments')); //.getElementsByTagName("ul")
			let tmp3 = tmphtml.children.length;
			if ( tmp3 > 0 ) {
				
				let tmpid = rootcmnts[i].querySelector('ul.content-list_nested-comments').id;
				tmphtml.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"tggl_"+tmpid+"\"><label class=\"cmmtggl\" for=\"tggl_"+tmpid+"\" id=\"ltggl_"+tmpid+"\"></label>" + tmphtml.outerHTML;
				
				addcss('#'+tmpid+' {visibility: hidden; display: none;}');
				addcss('#tggl_'+tmpid+':checked ~ #'+tmpid+'{visibility: visible; display: block;}');
				
				var tmpamnt = rootcmnts[i].querySelectorAll('li.content-list__item_comment').length;
				
				addcss('#ltggl_'+tmpid+'::after {content: \"\\0020 '+tmpamnt+'\"}');
				
				rootcmnts[i].querySelector('ul.content-list_nested-comments').outerHTML = tmphtml.outerHTML;
			}
		}
	}
				
	if (sttngsarr.hcc_hidelng == '1'){ 
		
		console.log("hdlng");
		for (let i=0; i < rootcmnts.length; i++){

			let tmp = rootcmnts[i].querySelector("div.comment__message");
			
			if (tmp.innerHTML.length > Number(sttngsarr.hcc_hidelng_lngth)) {

				let tmpid = rootcmnts[i].querySelector('div.comment').id;
				tmp.classList.add("lngcmmnt"); tmp.id = ("lngcmmnt_"+tmpid);
				tmp.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"lngcmnttggl_"+tmpid+"\">"+tmp.outerHTML+"<label class=\"lngcmmtggl\" for=\"lngcmnttggl_"+tmpid+"\" id=\"lntggl_"+tmpid+"\">развернуть</label>";

				addcss('#lngcmnttggl_'+tmpid+':checked ~ #lngcmmnt_'+tmpid+' {max-height: none; -webkit-mask-image:none}'); 
				addcss('#lngcmnttggl_'+tmpid+':checked ~ #lntggl_'+tmpid+'{visibility: hidden; display:none;}'); 
			}
		}
	}
	
	var rtcmntsarr = [];
    var shrtcmntsarr = [];
    let ii = 0;
    
	for (let i=0; i < rootcmnts.length; i++ ) {

        let tmp = rootcmnts[i].querySelector("div.comment__message");
		if (sttngsarr.hcc_shrt2bttm == '1'){
			if (tmp.innerHTML.length < Number(sttngsarr.hcc_shrt2bttm_lngth)) {

				shrtcmntsarr[ii++] = rootcmnts[i].outerHTML;
				//if (sttngsarr.hcc_enbldvdr == '1') {shrtcmntsarr[ii++] += "<hr class=\"btwncmnts\">";}
				continue;
			};
		}
        rtcmntsarr[i-ii] = rootcmnts[i].outerHTML;
        //if (sttngsarr.hcc_enbldvdr == '1') {rtcmntsarr[i-ii] += "<hr class=\"btwncmnts\">";}
    }
	
	if (sttngsarr.hcc_enbldvdr == '1') {
		
		let i=0;
		while (i < rtcmntsarr.length) {rtcmntsarr[i++] += "<hr class=\"btwncmnts\">";}
		i=0;
		while (i < shrtcmntsarr.length) {shrtcmntsarr[i++] += "<hr class=\"btwncmnts\">";}
	}

	var bigstr = "";
	
	if (sttngsarr.hcc_rndmsrt == '1'){
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
	}
	else{
		
		rtcmntsarr.foreach(function(item){
			bigstr += item;
		});
		
		shrtcmntsarr.foreach(function(item){
			bigstr += item;
		});
	}

	//document.getElementById("comments-list").innerHTML = "";
    document.getElementById("comments-list").innerHTML = bigstr;
	
} 
 
 
function applyformat2(){
	
	console.log("imhere");
	addcss('.voting-wjt__counter {visibility: hidden; display: none;');
    addcss('.comment__message_downgrade {opacity: 1 !important;}');
    
	addcss('hr.btwncmnts {display: block;  margin-top: 2em;  margin-bottom: 2em; width: 90%; height: 1px; border: none; color:#e3e3e3;background-color:#e3e3e3;}');

    addcss('.brtggl {visibility: hidden; display: none;} label.cmmtggl {display: block; color: #666;}');

    addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "\\1f4ac h"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}'); //\\16A5

    addcss('label.lngcmmtggl {vertical-align: middle; font-style: italic; display: block; text-align: center; width: 100%; color: #bbb; }');

    addcss('.brtggl:checked ~ label.cmmtggl::before { content: "–";}');

    addcss('div.lngcmmnt { width: 100%; max-height: 8em; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0)); -webkit-mask-size: 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: 100% 50%;}');

    let rootcmnts = document.getElementById('comments-list').children;

    for (let i=0; i < rootcmnts.length; i++ ){

		let tmphtml = (rootcmnts[i].querySelector('ul.content-list_nested-comments')); //.getElementsByTagName("ul")
        let tmp3 = tmphtml.children.length;
		if ( tmp3 > 0 ) {
			let tmpid = rootcmnts[i].querySelector('ul.content-list_nested-comments').id;
			tmphtml.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"tggl_"+tmpid+"\"><label class=\"cmmtggl\" for=\"tggl_"+tmpid+"\" id=\"ltggl_"+tmpid+"\"></label>" + tmphtml.outerHTML;
			addcss('#'+tmpid+' {visibility: hidden; display: none;}');
			addcss('#tggl_'+tmpid+':checked ~ #'+tmpid+'{visibility: visible; display: block;}');
            var tmpamnt = rootcmnts[i].querySelectorAll('li.content-list__item_comment').length;
            addcss('#ltggl_'+tmpid+'::after {content: \"\\0020 '+tmpamnt+'\"}');
			rootcmnts[i].querySelector('ul.content-list_nested-comments').outerHTML = tmphtml.outerHTML;
		}
	}

    for (let i=0; i < rootcmnts.length; i++){

        let tmp = rootcmnts[i].querySelector("div.comment__message");
		if (tmp.innerHTML.length < 64);

        if (tmp.innerHTML.length > 400) {

            let tmpid = rootcmnts[i].querySelector('div.comment').id;
            tmp.classList.add("lngcmmnt"); tmp.id = ("lngcmmnt_"+tmpid);
            tmp.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"lngcmnttggl_"+tmpid+"\">"+tmp.outerHTML+"<label class=\"lngcmmtggl\" for=\"lngcmnttggl_"+tmpid+"\" id=\"lntggl_"+tmpid+"\">развернуть</label>";

            addcss('#lngcmnttggl_'+tmpid+':checked ~ #lngcmmnt_'+tmpid+' {max-height: none; -webkit-mask-image:none}'); //#lntggl_'+tmpid+'{visibility: hidden; display:none;} -webkit-mask-image: none;
            addcss('#lngcmnttggl_'+tmpid+':checked ~ #lntggl_'+tmpid+'{visibility: hidden; display:none;}'); //-webkit-mask-image: none;
        };
	}

    var rtcmntsarr = [];
    var shrtcmntsarr = [];
    let ii = 0;
    for (let i=0; i < rootcmnts.length; i++ ) {

        let tmp = rootcmnts[i].querySelector("div.comment__message");
		if (tmp.innerHTML.length < 64) {

            shrtcmntsarr[ii] = rootcmnts[i].outerHTML;
            shrtcmntsarr[ii++] += "<hr class=\"btwncmnts\">";
            //i--;
            continue;
        };

        rtcmntsarr[i-ii] = rootcmnts[i].outerHTML;
        rtcmntsarr[i-ii] += "<hr class=\"btwncmnts\">";
    }

    document.getElementById("comments-list").innerHTML = "";

    //var cmntshtml = document.getElementById("comments-list");

    var bigstr = "";
    //var i = 0;
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
 
window.addEventListener('DOMContentLoaded', hcc_start());