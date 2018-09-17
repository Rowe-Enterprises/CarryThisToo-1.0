document.addEventListener('DOMContentLoaded', function() {
	let app = firebase.initializeApp(config);
	const db = firebase.firestore()
	const rt_db = firebase.database();
	const auth = firebase.auth();
	var email = null
	var chat_id = null
	var displayName = null
	
	var objDiv = document.getElementById("chat-container");
	objDiv.scrollTop = objDiv.scrollHeight;

	var send_btn = document.getElementById('send-btn');
	var message_box = document.getElementById('message-box');

	send_btn.addEventListener('click', function(){
		console.log(message_box.value, displayName);
		return firebase.database().ref('/chats/'+chat_id).push({
			message: message_box.value,
			name: displayName
		})
	})

	// var callback_chat = function(snap){
	// 	var data = snap.val()
	// 	console.log(snap)
	// 	console.log(data)
	// 	var chat_container = document.getElementById('chat-container')
	// 	if(data.name != 'Admin')
	// 		chat_container.innerHTML += '<div class="row"><p class="user chip message-chip right"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
	// 	else
	// 		chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip left"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
	
	// }
	

	auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
			document.getElementById('main').style.display = 'block'
    		document.getElementById('loader').style.display = 'none'
			email = firebaseUser.email;
			displayName = firebaseUser.displayName;
			chat_id = firebaseUser.uid

			var callback = function(snap){
				var data = snap.val()
				for(var i in data){
					console.log(data[i])
					var chat_container = document.getElementById('chat-container')
					if(data[i].name != 'Admin')
						chat_container.innerHTML += '<div class="row"><p class="user chip message-chip right"><span class="bold blue-text">'+data[i].name+': </span>'+data[i].message+'</p></div>'
					else
						chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip left"><span class="bold red-text">'+data[i].name+': </span>'+data[i].message+'</p></div>'
				}
			}
				
			rt_db.ref('/chats/'+chat_id+'/').once('value').then(callback)	

			rt_db.ref('/chats/'+chat_id+'/').on('child_added', function(snap){
				var data = snap.val()
				console.log(snap)
				console.log(data)
				var chat_container = document.getElementById('chat-container')
				if(data.name != 'Admin'){
					document.getElementById('message-box').value = ""
					chat_container.innerHTML += '<div class="row"><p class="user chip message-chip right"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
				}else{
					document.getElementById('message-box').value = ""
					chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip left"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
				}			
			});
		
			rt_db.ref('/chats/'+chat_id+'/').on('child_changed', function(snap){
				var data = snap.val()
				console.log(snap)
				console.log(data)
				var chat_container = document.getElementById('chat-container')
				if(data.name != 'Admin'){
					document.getElementById('message-box').value = ""
					chat_container.innerHTML += '<div class="row"><p class="user chip message-chip right"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
				}else{
					document.getElementById('message-box').value = ""
					chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip left"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
				}
			});
		}
	})
})