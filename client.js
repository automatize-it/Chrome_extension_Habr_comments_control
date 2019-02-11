var sttngsarr = {'hcc_rndmsrt': '0', 'hcc_cllpsbrnchs': '0', 'hcc_cllpsbrnchs_all':'0', 'hcc_cllpsbrnchs_rev':'0', 'hcc_enbldvdr': '0', 'hcc_hiderate': '0', 'hcc_hiderate_u':'0', 'hcc_hideshdwng': '0', 'hcc_shwusrnt': '0', 'hcc_hidelng': '0', 'hcc_shrt2bttm': '0', 'hcc_hidelng_lngth': '420', 'hcc_shrt2bttm_lngth': '50'};

var scrltoparr = [];
var unrdcmmnts;

String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

String.prototype.rmnlns = function () {
    return this.replace(/(\r\n|\n|\r)/gm, " ");
};

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

 
function applyformat(){
	
	var unrd; 
	unrd = document.querySelector("#xpanel");
	if (unrd){
		
		unrd = unrd.querySelector("span.new");
		if (unrd.style.display != "none"){
			
			unrdcmmnts = document.querySelectorAll("li.js-comment_new");
		}
	}	
	
	var rootcmnts = document.getElementById('comments-list').children;
	
	if (sttngsarr.hcc_hiderate == '1'){ 
		
		addcss('span.voting-wjt__counter {visibility: hidden; display: none;');
	
		//unhide if voted
		if (sttngsarr.hcc_hiderate_u == '1'){ 
			
			let tmp = document.querySelectorAll("div.voting-wjt_comments");
			for (let item of tmp){
				
				if (item.querySelector("button.voting-wjt__button").title.includes("Вы")){
					
					let tmpspan = item.querySelector("span.voting-wjt__counter");
					tmpspan.style.visibility = "visible";
					tmpspan.style.display = "flex"; 
				}
			}
		}
	}
	
	if (sttngsarr.hcc_hideshdwng == '1'){ addcss('.comment__message_downgrade {opacity: 1 !important;}');}
	
	if (sttngsarr.hcc_enbldvdr == '1') {addcss('hr.btwncmnts {display: block;  margin-top: 2em;  margin-bottom: 2em; width: 90%; height: 1px; border: none; color:#e3e3e3;background-color:#e3e3e3;}');}
	
	if (sttngsarr.hcc_hidelng == '1') { 
		
		addcss('.brtggl {visibility: hidden; display: none;}'); 
				
		addcss('label.cmmtggl {display: block; color: #666;}');
		
		addcss('div.lngcmmnt { width: 100%; max-height: 8em; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0)); -webkit-mask-size: 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: 100% 50%;}'); 
		
		addcss('label.lngcmmtggl {vertical-align: middle; font-style: italic; display: block; text-align: center; width: 100%; color: #bbb; }');
	}
					
	if (sttngsarr.hcc_cllpsbrnchs == '1'){  
				
		addcss('.brtggl {visibility: hidden; display: none;}'); 
				
		addcss('label.cmmtggl {display: block; color: #666;}');
		
		if (sttngsarr.hcc_cllpsbrnchs_rev == '0'){
			addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "\\1f4ac h"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}');
			addcss('.brtggl:checked ~ label.cmmtggl::before { content: "–";}');
		} else {
			
			addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "–"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}');
			addcss('.brtggl:checked ~ label.cmmtggl::before { content: "\\1f4ac h";}');
		}
		
		for (let i=0; i < rootcmnts.length; i++ ){
			
			let brnchs = rootcmnts[i].querySelectorAll('ul.content-list_nested-comments');
			
			for (let brnch of brnchs){
				
				let amnt = brnch.children.length;
				if (amnt == 0) continue;
				
				if (sttngsarr.hcc_cllpsbrnchs_all == '0'){ 
					if (brnch.parentNode.parentNode.id != "comments-list") continue;
				}
				
				let tmpid = brnch.id;
				
				let tmpipt = document.createElement("input"); 
				tmpipt.className = "brtggl"; tmpipt.type = "checkbox"; tmpipt.id = "tggl_"+tmpid;
				
				let tmplbl = document.createElement("label"); 
				tmplbl.className = "cmmtggl"; tmplbl.htmlFor = "tggl_"+tmpid; tmplbl.id = "ltggl_"+tmpid;
				
				brnch.parentNode.insertBefore(tmpipt,brnch); brnch.parentNode.insertBefore(tmplbl,brnch);
				
				if (sttngsarr.hcc_cllpsbrnchs_rev == '0'){  
					
					addcss('#'+tmpid+' {visibility: hidden; display: none;}');
					addcss('#tggl_'+tmpid+':checked ~ #'+tmpid+'{visibility: visible; display: block;}');
				}
				else {
					
					addcss('#'+tmpid+' {visibility: visible; display: block;}');
					addcss('#tggl_'+tmpid+':checked ~ #'+tmpid+'{visibility: hidden; display: none;}');
				}
				
				
				let tmpamnt = brnch.querySelectorAll('li.content-list__item_comment').length;
				
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
	
	var rootdiv = document.getElementById('comments-list');
	
	if (sttngsarr.hcc_rndmsrt == '1'){
		
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
		
	//expand branch if url is for direct comment 
	if (sttngsarr.hcc_cllpsbrnchs == '1' && (window.location.href).includes("#comment_") ){
		
		let cmnt = window.location.href;
		cmnt = cmnt.substring(cmnt.indexOf("#"),cmnt.Length);
		let tmp = document.querySelector(cmnt);
		
		while (tmp.parentNode){
			
			tmp = tmp.parentNode;
			if (tmp.className == "comments-list") break;
			let tmpinpt = tmp.querySelector('input[class=brtggl]');
			if (tmpinpt) tmpinpt.checked = true;
			
		}
	}
	//https://habr.com/ru/company/fbk/blog/347312/#comment_10635686
	
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
	
	if (sttngsarr.hcc_shwusrnt == '1') {
		
		getntsdata();
	}
	
	document.getElementById("xpanel").addEventListener("click", fixtracker, false);
		
}


function getntsdata(){
	
	var theUrl = "https://habr.com/ru/users/"; //notes
	var user = "";
	
	user = document.querySelector("span.user-info__nickname").innerText;
	
	var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open("GET", theUrl+user+"/notes/", true); // true for asynchronous 
    
	xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			addusrnts(xmlHttp.responseText);
		}
    }
	
	xmlHttp.send(null);
	
}

function addusrnts(dcmnt){
	
	var parser = new DOMParser();
	var tmp = parser.parseFromString(dcmnt.toString(), "text/html");
	var usrnms = tmp.querySelectorAll("td.notes-table__username");
	var usrnts = tmp.querySelectorAll("td.notes-table__desc");
	addcss("div.usernotes{font-size: 0.8em; margin: 0.5em;padding: 0.5em;background-color:#fff7d7;}");
	
	var usrsincmmnts = document.getElementsByClassName("user-info_inline");
	
	for (let i=0; i< usrsincmmnts.length; i++){
		
		var tmpusrnm = usrsincmmnts[i].dataset.userLogin;
		for (let ii=0; ii<usrnms.length; ii++){
			if (tmpusrnm == usrnms[ii].innerText.trim()){
				
				//console.log("gotcha");
				let tmpparent = usrsincmmnts[i].parentNode;
				let tmpref = tmpparent.querySelector("time");
				let tmphtml = document.createElement("div");
				let tmptext = usrnts[ii].innerText.rmnlns();
				tmptext = tmptext.substring(0, 60); 
				if (usrnts[ii].innerText.length > 60) tmptext += "...";
				tmphtml.className = "usernotes"; tmphtml.innerText = tmptext;
				tmphtml.setAttribute('title', usrnts[ii].innerText);
				tmpparent.insertBefore(tmphtml, tmpref);
			}
		}
	}
			
}

function fixtracker(){
	
	console.log("mlv");
	if (!unrdcmmnts || sttngsarr.hcc_cllpsbrnchs == '0') return;
	for (let i=0; i< unrdcmmnts.length; i++){
				
		let tmpinpt = unrdcmmnts[i].parentNode;
		tmpinpt = tmpinpt.querySelectorAll("input.brtggl");
		for (let z=0; z < tmpinpt.length; z++){
			
			tmpinpt[z].checked = true;
		}
		
		let tmp = unrdcmmnts[i];
		while (tmp.parentNode){
				
			tmp = tmp.parentNode;
			if (tmp.tagName == "LI"){
				
				let tmp2 = tmp.querySelector("input.brtggl");
				if (tmp2) tmp2.checked = true;
			}
			if (tmp.id == "comments-list") break;
		}
	}
}

//window.addEventListener('DOMContentLoaded', addlst());
window.addEventListener('load', hcc_start());

document.getElementById("comments").addEventListener('click', function(event){
	
	
	if (event == null || sttngsarr.hcc_hiderate_u == '0') return;
	var clckdlmnt = event.target;
	
	var i = 0;
	while (clckdlmnt.parentNode) {
        if (i > 5) break;
		clckdlmnt = clckdlmnt.parentNode;
		if (clckdlmnt.classList.contains("voting-wjt_comments")) {
			
			let tmpspan = clckdlmnt.querySelector("span.voting-wjt__counter");
			
			var observer = new MutationObserver(function() {
				
				let tmpspan = clckdlmnt.querySelector("span.voting-wjt__counter");
				tmpspan.setAttribute("style", "visibility: visible; display: flex;");
				
				observer.disconnect();				
			});
			
			var config = { attributes: true, childList: false, characterData: false, subtree: false };
			// Start observing the target node for configured mutations
			observer.observe(tmpspan.parentNode, config);
		}
		i++;
	}
});

document.getElementById("xpanel").addEventListener("click", fixtracker, false);
