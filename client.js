var sttngsarr = {'hcc_rndmsrt': '0', 'hcc_cllpsbrnchs': '0', 'hcc_enbldvdr': '0', 'hcc_hiderate': '0', 'hcc_hideshdwng': '0', 'hcc_hidelng': '0', 'hcc_shrt2bttm': '0', 'hcc_hidelng_lngth': '420', 'hcc_shrt2bttm_lngth': '50'};

function hcc_start(){
	
	chrome.storage.local.get('hcc_glblswtch', function (result) {
				
		if (result.hcc_glblswtch == null) {
				
			chrome.storage.local.set({'hcc_glblswtch': '1'}, function(){
				
				chrome.storage.local.set({'hcc_strdsttngs': sttngsarr}, function(){
					applyformat();
				});
			});
		}
		
		if (result.hcc_glblswtch == '1') {
			
			chrome.storage.local.get({'hcc_strdsttngs': {}}, function (result) {
				
				sttngsarr = result.hcc_strdsttngs;
				applyformat();
			});	
		}		
	});
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
		
	var rootcmnts = document.getElementById('comments-list').children;
	
	if (sttngsarr.hcc_hiderate == '1'){ addcss('span.voting-wjt__counter {visibility: hidden; display: none;');}
	
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
				
				/* 
				when outerHTML is modified, original inline scripts become unsafe for Chrome
				and original page functionality may be broken
				so we must do 8 strings instead of one to make it safe
				*/
				//tmphtml.outerHTML = "<input class=\"brtggl\" type=\"checkbox\" id=\"tggl_"+tmpid+"\"><label class=\"cmmtggl\" for=\"tggl_"+tmpid+"\" id=\"ltggl_"+tmpid+"\"></label>" + tmphtml.outerHTML;
				
				let tmpipt = document.createElement("input"); 
				tmpipt.className = "brtggl"; tmpipt.type = "checkbox"; tmpipt.id = "tggl_"+tmpid;
				
				let tmplbl = document.createElement("label"); 
				tmplbl.className = "cmmtggl"; tmplbl.htmlFor = "tggl_"+tmpid; tmplbl.id = "ltggl_"+tmpid;
				
				rootcmnts[i].insertBefore(tmpipt,tmphtml); rootcmnts[i].insertBefore(tmplbl,tmphtml);
				
				addcss('#'+tmpid+' {visibility: hidden; display: none;}');
				addcss('#tggl_'+tmpid+':checked ~ #'+tmpid+'{visibility: visible; display: block;}');
				
				var tmpamnt = rootcmnts[i].querySelectorAll('li.content-list__item_comment').length;
				
				addcss('#ltggl_'+tmpid+'::after {content: \"\\0020 '+tmpamnt+'\"}');
				
			}
		}
	}
				
	if (sttngsarr.hcc_hidelng == '1'){ 
		
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
			
	if (sttngsarr.hcc_rndmsrt == '1'){
		
		var rootdiv = document.getElementById('comments-list');
		var i = 0;
	
		while (rootcmnts.length > i){
			
			let tmp = Math.floor(Math.random() * (rootcmnts.length-i));
			tmp += i; 
			rootdiv.insertBefore(rootcmnts[tmp], rootcmnts[i]);
			i++;
		}
	}
	
	if (sttngsarr.hcc_shrt2bttm == '1'){
				
		var shtlng = Number(sttngsarr.hcc_shrt2bttm_lngth);
		var iend = 0;
		for (let i=0; i < rootcmnts.length-iend; i++){
			
			let tmp = rootcmnts[i].querySelector("div.comment__message");
			if (tmp.innerHTML.length < shtlng) {
				
				rootdiv.appendChild(rootcmnts[i]);
				iend++; i--;
			}
		}
	}
		
	if (sttngsarr.hcc_enbldvdr == '1') {
		
		var hr = document.createElement("hr");
		hr.className = "btwncmnts";
		var rt = document.getElementById('comments-list');
		
		for (let i = 0; i < rootcmnts.length; i+=2) {
			
			//if not clone, we got one element moving to bottom of list
			let cln = hr.cloneNode(true);
			rt.insertBefore(cln, rt.children[i+1]);
		}
	}
	
} 
 
//window.addEventListener('DOMContentLoaded', hcc_start());
window.addEventListener('load', hcc_start());
