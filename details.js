var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;
	if (window.ActiveXObject) {
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e){
			xmlHttp = false;
		}
	}else{
		try{
			xmlHttp = new XMLHttpRequest();
		} catch(e){
			xmlHttp = false;
		}
	}

	if (!xmlHttp) {
		alert("Can't create the object!");
	}else
		return xmlHttp;
}

function process() {
	if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		userName = encodeURIComponent(document.getElementById('userInput').value);
		xmlHttp.open("GET", "https://api.github.com/users/"+userName, true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
		
	} else{
		setTimeout('process()',1000);
	}
} 

function handleServerResponse(){
  if(xmlHttp.readyState==4){
    if(xmlHttp.status==200){
    	document.getElementById("user-name").innerHTML = "Name: ";
		document.getElementById("user-location").innerHTML = "Location: ";
		document.getElementById("user-email").innerHTML = "Email: ";
		document.getElementById("user-repos").innerHTML = "Public repositories: ";
		document.getElementById("user-followers").innerHTML = "Followers: ";
		document.getElementById("user-following").innerHTML = "Following: ";

		var userDetail = JSON.parse(xmlHttp.responseText);
		document.getElementById('user-avatar').src = userDetail.avatar_url;
		document.getElementById('github-profile').href = 'https://github.com/'+userName;
		document.getElementById('user-name').innerHTML += userDetail.name;
		document.getElementById('user-location').innerHTML += userDetail.location;
		document.getElementById('user-email').innerHTML += userDetail.email;
      	//document.getElementById('user-email').href += 'https://mail.google.com/';
		document.getElementById('user-repos').innerHTML += userDetail.public_repos;
		document.getElementById('user-followers').innerHTML += userDetail.followers;
		document.getElementById('user-following').innerHTML += userDetail.following;
		//setTimeout('process()', 1000);
    }else{
      alert('Something Went Wrong!');
    }
  } 
}