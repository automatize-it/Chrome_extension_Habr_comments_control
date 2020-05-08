var sttngsarr = {'hcc_rndmsrt': '0', 'hcc_cllpsbrnchs': '0', 'hcc_cllpsbrnchs_all':'0', 'hcc_cllpsbrnchs_rev':'0','hcc_revcll_bttn':'0', 'hcc_enbldvdr': '0', 'hcc_hiderate': '0', 'hcc_hiderate_u':'0', 'hcc_hideshdwng': '0', 'hcc_shwusrnt': '0', 'hcc_hidelng': '0', 'hcc_shrt2bttm': '0', 'hcc_hidelng_lngth': '420', 'hcc_shrt2bttm_lngth': '50', 'hcc_hidertngs': '0', 'hcc_hideorigbrn': '0'};

var scrltoparr = [];
var unrdcmmnts;

//tried hard to codegrab Habr's original branch icon but completely failed (((
//var comtreesvg =" url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAASCAYAAABvqT8MAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAFNSURBVDhPfZLLSsNQEIbTpLnYtA2CWhAFH8rncudLFJcirl2JEEuLt1bUKG0aSZcudGOcL2bCqRADX6Y9Z/5/Zk6OVRRFy6AthMJGFVlzBLuipQJiE6aRxwJKX+gJOGs1k66wJ9jqEgiIIsEVcON3X+hZ8kgkx9EKQK9q0AgvTT7Qxf/ghYChaMU6PBoWED+nnvzHCDpVdBHQG4MhrAXjJMOkTBIQQDk0wxJxrAWTJFN3To49jNsk4kSFTaEWnFzehtfS1nSRe4/pyn+Y5+7N23sHAcnENUETpmCtpQa++Sb1g+B+nm8JodAVImH7NJ7uqkgrMFx5SsfnV8HZaGZ/fH6xXu5J/85fAXeF4euWLu6SoKrqT16zvinAmbOmiingHrHvxk+LyBQwrN79WjBOlpx/ea3lmwxMwY4wIBl0Y5auaBOi0cty/3d9WPwAjqhbUBHo+v0AAAAASUVORK5CYII=')";


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


function addcss_hide(tag){
	
	addcss(tag+'{visibility: hidden; display: none;}');
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
	
	if (sttngsarr.hcc_hideorigbrn == '1') { 
		
		addcss_hide('span.comment__collapse');
	}
	
	if (sttngsarr.hcc_hidertngs == '1') { 
		
		addcss_hide('.stacked-counter');
		addcss_hide('.dropdown__user-stats');
	}
	
	var rootcmnts = document.getElementById('comments-list').children;
	
	if (sttngsarr.hcc_hiderate == '1'){ 
		
		addcss_hide('span.voting-wjt__counter');
	
		//unhide if voted
		//in half cases unhides current first comment's rate instead of voted, but only "live", after page reload works correctly
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
					
	if (sttngsarr.hcc_cllpsbrnchs == '1'){  
				
		addcss_hide('.brtggl');
		addcss('label.cmmtggl {display: block; color: #666;}');
		
		if (sttngsarr.hcc_cllpsbrnchs_rev == '0'){
			
			//addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "\\1f4ac "'+comtreesvg+'; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}');
			addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "\\1f4ac h"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}');
			addcss('.brtggl:checked ~ label.cmmtggl::before { content: "–";}');
		} else {
			
			addcss('label.cmmtggl::before {font-weight: normal; font-size: 16px; content: "–"; vertical-align: middle; display: inline-block; width: 2em; background: #f7f7f7; text-align: center;}');
			addcss('.brtggl:checked ~ label.cmmtggl::before { content: "\\1f4ac h";}');
		}
		
		//css styles for bottom collapse buttons
		addcss('label.cmmtggl_frombttm::before { content: "–";}');
				
		for (let i=0; i < rootcmnts.length; i++ ){
			
			let brnchs = rootcmnts[i].querySelectorAll('ul.content-list_nested-comments');
			
			for (let brnch of brnchs){
				
				let amnt = brnch.children.length;
				
				//let bttmbttn = 1;
				//if this is last comment don't do anything unless we need to create collapse from bottom button
				if (brnch.parentNode.id == "comments-list") {continue;}
				
				//Habr's html code contains empty <ul> at the end of comments branch
				if (amnt == 0) {
					
					//dat sheat took a lot of me and this code is smokin but not hot pile
					if (sttngsarr.hcc_revcll_bttn == '1'){
						
						let tmpbr = brnch.parentNode;
						let tmp_id = tmpbr.querySelector("span.parent_id").dataset.parent_id;
						
						while( tmpbr.id != "comments-list" ){
							
							if (tmpbr.tagName == "UL" && tmpbr.children.length > 1) { 
								tmp_id = tmpbr.querySelector("span.parent_id").dataset.parent_id;
								break; 
							}
							
							tmpbr = tmpbr.parentNode;
							if (tmpbr.id != "comments-list" && 
								tmpbr.querySelector("span.parent_id").dataset.parent_id != "0") {
									tmp_id = tmpbr.querySelector("span.parent_id").dataset.parent_id;
								}
						}
						
						if (tmp_id == 0) {continue;}
						
						let tmplblem = null;
						if (tmpbr.id == "comments-list"){
							
							tmplblem = tmpbr.querySelectorAll("label.cmmtggl");
						}
						else {
							
							//thats ok, just 3 nodes up (ノ°Д°）ノ︵ ┻━┻ 
							tmplblem = tmpbr.parentNode.parentNode.parentNode.querySelectorAll("label.cmmtggl");
						}
						
						let tmpble = null;
						for (let i=0; i < tmplblem.length; i++){
							
							//console.log(tmplblem[i].id); console.log("ltggl_reply_comments_" + tmp_id); 
							if (tmplblem[i].id == "ltggl_reply_comments_" + tmp_id){
									
								tmplble = tmplblem[i];
								break;
							}
						}
							
						if (tmplble == null) {continue;}
						let tmpfcs = tmplble.parentNode;
												
						/**** CREATING ELEMENT WITH DUPLICATE ID SURE WILL GO TO XHTML HELL FOR THAT ****/
						tmplblbttm = tmplble.cloneNode(true);
						tmplblbttm.classList.add("cmmtggl_frombttm");
						
						tmplblbttm.onclick = function() { tmpfcs.scrollIntoView(); };
						
						brnch.parentNode.insertBefore(tmplblbttm,brnch.nextSibling);	
					}
					
					//just continue
					continue;
				}
				
				if (sttngsarr.hcc_cllpsbrnchs_all == '0' &&
					brnch.parentNode.parentNode.id != "comments-list")
					{continue;}
				
				let tmpid = brnch.id;
				
				let tmpipt = document.createElement("input"); 
				tmpipt.className = "brtggl"; tmpipt.type = "checkbox"; tmpipt.id = "tggl_"+tmpid;
				
				let tmplbl = document.createElement("label"); 
				tmplbl.className = "cmmtggl"; tmplbl.htmlFor = "tggl_"+tmpid; tmplbl.id = "ltggl_"+tmpid;
				
				tmplbl.onclick = function(){document.getElementById("ltggl_"+tmpid).focus();};
				//create button to collapse/expand branch from start
				brnch.parentNode.insertBefore(tmpipt,brnch); brnch.parentNode.insertBefore(tmplbl,brnch);
				
				//create button to collapse/expand branch from end				
				
				/*
				if ( amnt > 1 || brnch.parentNode.parentNode.id == "comments-list" ){
					
					let tmpfcs = document.getElementById("ltggl_"+tmpid).parentNode; //
					
					
				}
				*/		
				
				if (sttngsarr.hcc_cllpsbrnchs_rev == '0'){  
					
					addcss_hide('#'+tmpid);
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
		
		addcss('label.cmmtggl {display: block; color: #666;}');
		
		addcss('div.lngcmmnt { width: 100%; max-height: 8em; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0)); -webkit-mask-size: 100%; -webkit-mask-repeat: no-repeat; -webkit-mask-position: 100% 50%;}'); 
		
		addcss('label.lngcmmtggl {vertical-align: middle; font-style: italic; display: block; text-align: center; width: 100%; color: #bbb; }');
		
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
	
	
	/**********************EXPERIMENTAL*************************/
	/*
	var enblexprmnlt = 0;
	
	if (enblexprmnlt == 1){
		
		var tcmntsnms = [];
		var tcmntsrts = [];
		
		let z = -1;
		let tmpamnt = "";
		for (let i=0; i < rootcmnts.length; i++ ){
			
			let ttls = rootcmnts[i].querySelector('span.voting-wjt__counter');
			
			//Всего голосов –8: ↑7 и ↓15
			
			tmpamnt = (ttls.innerText);
			if (tmpamnt == "") {continue;}
			
			if (tmpamnt.indexOf("–") != -1) {
				
				tmpamnt = tmpamnt.replace(/–/g,"-");
			}
			
			tmpamnt = parseInt(tmpamnt);
			let tmpstr = ttls.title;
			
			let plss = parseInt(tmpstr.substring((tmpstr.indexOf("↑")+1),(tmpstr.indexOf("↓")-3)));
			let mnss = parseInt(tmpstr.substring((tmpstr.indexOf("↓")+1),tmpstr.Length));
			
			if (plss == 0 || mnss == 0 || (plss+mnss) < 8) {continue;}
			
			z++;
			
			//this is index of root comment. It's not working, dunno why
			tcmntsnms[z] = i;
			//We need max rating and mix plus-to-minus amount to count comment as interesting.
			//So we need max amount of votes minus min plus-to-minus to be highest to count comment discussable
			tcmntsrts[z] = (plss+mnss) - Math.abs(tmpamnt);
							
		}
		
		console.log(tcmntsnms);
		console.log(tcmntsrts);
		console.log("alive_end");
		
		let tmpln = z;
		var endcmnts = [];
		for (i=0; i < z+1; i++){
			
			let mx = Math.max.apply(null, tcmntsrts);
			let tmpi = tcmntsrts.indexOf(mx);
			endcmnts[i] = tcmntsnms[tmpi];
			tcmntsrts[tmpi] = 0;
		}
		
		endcmnts = endcmnts.reverse();
		console.log(endcmnts);
		
		i = 0;
	
		while (endcmnts.length > i){
			
			//rootdiv.insertBefore(rootcmnts[tmp], rootcmnts[i]);
			rootdiv.insertBefore(rootcmnts[(endcmnts[i])],rootcmnts[0]);
			i++;
		}
		
	}
	*/

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
	
	//expand branch if url is for direct comment sttngsarr.hcc_cllpsbrnchs == '1' &&

	if ( sttngsarr.hcc_cllpsbrnchs == '1' && sttngsarr.hcc_cllpsbrnchs_rev == '0' && (window.location.href).includes("#comment_") ){
		
		let cmnt = window.location.href;
		cmnt = cmnt.substring(cmnt.indexOf("#"),cmnt.Length);
		let tmp = document.querySelector(cmnt);
		
		while (tmp.parentNode){
			
			tmp = tmp.parentNode;
			if (tmp.className == "comments-list") break;
			let tmpinpt = tmp.querySelector('input[class=brtggl]');
			if (tmpinpt) {
				
				tmpinpt.checked = true;
			}
			
		}
		
		document.getElementById(cmnt).focus(); 
	}
		
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
