var popupstngsarr = {};
var hcc_enabled = false;

function popuphndlr(){
	
	chrome.storage.local.get('hcc_glblswtch', function (result) {
		
		if (result.hcc_glblswtch == '1'){
			
			document.getElementById('glblswtchid').checked = true;
			document.getElementById('swmn').style.opacity = 1;
			hcc_enabled = true;
		}
		else {
			
			document.getElementById('glblswtchid').checked = false;
			document.getElementById('swmn').style.opacity = 0.4;
			hcc_enabled = false;
		}
		
		chrome.storage.local.get({hcc_strdsttngs:{}}, function (result) {
		
			popupstngsarr = result.hcc_strdsttngs;
			
			for (var key in popupstngsarr){
				
				let tmp = document.getElementById(key);
				if (tmp == null) continue;
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
				
				var tmp = document.getElementsByClassName('addon');
				for (i=0; i < tmp.length; i++){
					tmp[i].readOnly = true;
				}
			}
		});
	});
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
