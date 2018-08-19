document.addEventListener('DOMContentLoaded', function() {
	let app = firebase.app();
	const db = firebase.firestore()
	const rt_db = firebase.database();
	const auth = firebase.auth();
	var email = null
	var uid = null
	var displayName = null
	
	var objDiv = document.getElementById("chat-container");
	objDiv.scrollTop = objDiv.scrollHeight;

	var send_btn = document.getElementById('send-btn');
	var message_box = document.getElementById('message-box');
	send_btn.addEventListener('click', function(){
		console.log(message_box.value, displayName);
		return firebase.database().ref('/chats/'+uid).push({
			message: message_box.value,
			name: displayName
		})
	})

	auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
			email = firebaseUser.email;
			displayName = firebaseUser.displayName;

			db.collection("users")
				.where('email', '==', firebaseUser.email)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						id = doc.id;
						var userData = doc.data();
						userData.id = id;
						uid = userData.uid;
						console.log(userData.uid);

						var callback = function(snap){
							var data = snap.val()
							
							var chat_container = document.getElementById('chat-container')
							if(data.name != 'Admin')
								chat_container.innerHTML += '<div class="row"><p class="user chip message-chip right"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
							else
								chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip left"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
						}

						rt_db.ref('/chats/'+userData.uid+'/').limitToLast(12).on('child_added', callback);
						rt_db.ref('/chats/'+userData.uid+'/').limitToLast(12).on('child_changed', callback);
						
					});
				});			
		}
	})
})