var popupstngsarr = {};
var hcc_enabled = false;

function popuphndlr(){
	
	//translation
	localize_menu();
	
	chrome.storage.local.get('hcc_glblswtch', function (result) {
		
		if (result.hcc_glblswtch == '1'){
			
			document.getElementById('glblswtchid').checked = true;
			document.getElementById('swmn').style.opacity = 1;
			hcc_enabled = true;
		}
		else {
			
			document.getElementById('glblswtchid').checked = false;
			document.getElementById('swmn').style.opacity = 0.4;
			document.getElementById('swmn').style.cursor = "not-allowed";
			hcc_enabled = false;
		}
		
		chrome.storage.local.get({hcc_strdsttngs:{}}, function (result) {
		
			popupstngsarr = result.hcc_strdsttngs;
			
			for (var key in popupstngsarr){
				
				let tmp = document.getElementById(key);
				if (tmp == null) continue;
				
				if (key == "hcc_cllpsbrnchs"){
					
					if (popupstngsarr[key] == '1') {
						document.getElementById("brnchssubmn").style.opacity = "1";
					}
					else {
						document.getElementById("brnchssubmn").style.opacity = "0.4";
						document.getElementById("hcc_revcll_bttn").disabled = true;	
						document.getElementById("hcc_cllpsbrnchs_all").disabled = true;
						document.getElementById("hcc_cllpsbrnchs_rev").disabled = true;
					}
				}
				
				
				if (key == "hcc_revcll_bttn"){
					
					if (popupstngsarr[key] == '1') {
						
						let tmp = document.getElementById("hcc_cllpsbrnchs_all");
						tmp.checked = true; tmp.disabled = true; 
						tmp.style.opacity = "0.4";
						tmp.style.cursor = "not-allowed";
					}
				}
				
				
				if (key == "hcc_hiderate"){
					
					if (popupstngsarr[key] == '1') {
						document.getElementById("votessubmn").style.opacity = "1";
					}
					else {
						document.getElementById("votessubmn").style.opacity = "0.4";
						document.getElementById("hcc_hiderate_u").disabled = true;
					}
				}
				
				/******* LATER
				
				if (key == "hcc_hidertngs"){
					
					if (popupstngsarr[key] == '1') {
						document.getElementById("rtngssubmn").style.opacity = "1";
					}
					else {
						document.getElementById("rtngssubmn").style.opacity = "0.4";
						document.getElementById("hcc_hidertngs_u").disabled = true;
						document.getElementById("hcc_hidertngs_v").disabled = true;
					}
				}
				*/
				
				if (tmp.className == "hcc_input"){
					
					tmp.value = popupstngsarr[key];
					continue;
				}
				if (popupstngsarr[key] == '1') { tmp.checked = true;}
				else { tmp.checked = false; } 
			}
			
			if (!hcc_enabled){
				for (var key in popupstngsarr){
					
					let tmp = document.getElementById(key);
					if (tmp == null) continue;
					tmp.disabled = true;	
				}
				
				/*
				var tmp = document.getElementsByClassName('addon');
				for (i=0; i < tmp.length; i++){
					tmp[i].readOnly = true;
				}
				*/
			}
		});
	});
}

function localize_menu(){
	
	//let's indian dance begin!!11
	document.getElementById('ppp_mn_1').innerText = chrome.i18n.getMessage("ppp_mn_1");
	
	document.getElementById('ppp_mn_2').innerText = chrome.i18n.getMessage("ppp_mn_2");
	document.getElementById('ppp_mn_2_ttl').title = chrome.i18n.getMessage("ppp_mn_2_ttl");
	
	document.getElementById('ppp_mn_3').innerText = chrome.i18n.getMessage("ppp_mn_3");
	document.getElementById('ppp_mn_3_ttl').title = chrome.i18n.getMessage("ppp_mn_3_ttl");
	document.getElementById('ppp_mn_3_1').innerText = chrome.i18n.getMessage("ppp_mn_3_1");
	document.getElementById('ppp_mn_3_1_ttl').title = chrome.i18n.getMessage("ppp_mn_3_1_ttl");
	document.getElementById('ppp_mn_3_2').innerText = chrome.i18n.getMessage("ppp_mn_3_2");
	document.getElementById('ppp_mn_3_2_ttl').title = chrome.i18n.getMessage("ppp_mn_3_2_ttl");
	document.getElementById('ppp_mn_3_3').innerText = chrome.i18n.getMessage("ppp_mn_3_3");
	document.getElementById('ppp_mn_3_3_ttl').title = chrome.i18n.getMessage("ppp_mn_3_3_ttl");
	
	document.getElementById('ppp_mn_4').innerText = chrome.i18n.getMessage("ppp_mn_4");
	document.getElementById('ppp_mn_4_ttl').title = chrome.i18n.getMessage("ppp_mn_4_ttl");
	
	document.getElementById('ppp_mn_5').innerText = chrome.i18n.getMessage("ppp_mn_5");
	document.getElementById('ppp_mn_5_ttl').title = chrome.i18n.getMessage("ppp_mn_5_ttl");
	document.getElementById('ppp_mn_5_1').innerText = chrome.i18n.getMessage("ppp_mn_5_1");
	document.getElementById('ppp_mn_5_1_ttl').title = chrome.i18n.getMessage("ppp_mn_5_1_ttl");
	
	document.getElementById('ppp_mn_6').innerText = chrome.i18n.getMessage("ppp_mn_6");
	document.getElementById('ppp_mn_6_ttl').title = chrome.i18n.getMessage("ppp_mn_6_ttl");
	
	var tmp = document.getElementById('ppp_mn_7');
	tmp.innerHTML = chrome.i18n.getMessage("ppp_mn_7")+tmp.innerHTML+chrome.i18n.getMessage("symb");
	document.getElementById('ppp_mn_7_ttl').title = chrome.i18n.getMessage("ppp_mn_7_ttl");
	
	tmp = document.getElementById('ppp_mn_8');
	tmp.innerHTML = chrome.i18n.getMessage("ppp_mn_8")+tmp.innerHTML+chrome.i18n.getMessage("symb");
	document.getElementById('ppp_mn_8_ttl').title = chrome.i18n.getMessage("ppp_mn_8_ttl");
	
	document.getElementById('ppp_mn_9').innerText = chrome.i18n.getMessage("ppp_mn_9");
	document.getElementById('ppp_mn_9_ttl').title = chrome.i18n.getMessage("ppp_mn_9_ttl");
	
	document.getElementById('ppp_mn_10').innerText = chrome.i18n.getMessage("ppp_mn_10");
	document.getElementById('ppp_mn_10_ttl').title = chrome.i18n.getMessage("ppp_mn_10_ttl");
	
	document.getElementById('ppp_mn_11').innerText = chrome.i18n.getMessage("ppp_mn_11");
	document.getElementById('ppp_mn_11_ttl').title = chrome.i18n.getMessage("ppp_mn_11_ttl");
}

function input_savestatenrld(){
	
	chrome.storage.local.set({hcc_strdsttngs: popupstngsarr},function(){
			
		window.location.reload(true);		
		chrome.tabs.executeScript(null,{code: "window.location = window.location;"});
	});
}

document.addEventListener('DOMContentLoaded', popuphndlr());

document.getElementById("glblswtchid").addEventListener("click", function(){
		
	let tmp = document.getElementById("glblswtchid");
	
	if (tmp.checked == true) {
		
		chrome.storage.local.set({hcc_glblswtch:'1'}, function(){});
		chrome.browserAction.setIcon({ path: 'hcc_64.png'});
	}
	else {
		
		chrome.storage.local.set({hcc_glblswtch:'0'}, function(){});
		tmp.checked = false;
		chrome.browserAction.setIcon({ path: 'hcc_64_dsbld.png'});
	}

	chrome.tabs.executeScript(null,{code: "window.location = window.location;"});
	
	window.location.reload(true);
	
});

document.getElementById("swmn").addEventListener("click", function(event){
		
	if (event.target.type == "checkbox"){
		
		var tmp = event.target.id;
		var tmpstate = '0'; if (event.target.checked) tmpstate = '1';
		
		popupstngsarr[tmp] = tmpstate;
		
		//dirty, fix later
		if (tmp == "hcc_revcll_bttn" && tmpstate == '1') {popupstngsarr['hcc_cllpsbrnchs_all'] = '1';}
		
		input_savestatenrld();
	}
	
});

document.getElementById("hcc_hidelng_lngth").addEventListener("keyup", function(event) {
    
	if (event.key === "Enter") {
        
		popupstngsarr.hcc_hidelng_lngth = document.getElementById("hcc_hidelng_lngth").value;
		input_savestatenrld();
    }
});

document.getElementById("hcc_shrt2bttm_lngth").addEventListener("keyup", function(event) {
    
	if (event.key === "Enter") {
        
		popupstngsarr.hcc_shrt2bttm_lngth = document.getElementById("hcc_shrt2bttm_lngth").value;
		input_savestatenrld();
    }
});
