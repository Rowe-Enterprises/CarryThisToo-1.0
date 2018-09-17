document.addEventListener('DOMContentLoaded', function() {
	let app = firebase.initializeApp(config);
	const db = firebase.firestore()
	const rt_db = firebase.database();
	const auth = firebase.auth();
	
	var objDiv = document.getElementById("chat-container");
	objDiv.scrollTop = objDiv.scrollHeight;
    
    var callback_chat = function(snap){
        var data = snap.val()
        var chat_container = document.getElementById('chat-container')
        console.log(data)
        if(data.name != 'Admin')
            chat_container.innerHTML += '<div class="row"><p class="user chip message-chip left"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
        else
            chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip right"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
    }
    
    window.addEventListener('hashchange', function() {
        var chat_id = location.href.split('#')[1];
        var chat_container = document.getElementById('chat-container')
        chat_container.innerHTML = ""

        rt_db.ref('/chats/'+chat_id+'/').on('child_added', callback_chat);
        // rt_db.ref('/chats/'+chat_id+'/').limitToLast(20).on('child_changed', callback_chat);
    });

    var send_btn = document.getElementById('send-btn');
	var message_box = document.getElementById('message-box');
	send_btn.addEventListener('click', function(){
        var chat_id = location.href.split('#')[1];
		return firebase.database().ref('/chats/'+chat_id).push({
			message: message_box.value,
			name: 'Admin'
		});
	});

	auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            document.getElementById('main').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            console.log(firebaseUser);
            rt_db.ref('/chats/').once('value').then(function(snap){
                snap.forEach(function(childSnapshot) {
                    console.log(childSnapshot.key);
                    db.collection("users")
                        .where('uid', '==', childSnapshot.key)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                var user = doc.data();
                                var name = user.first_name + " " + user.last_name

                                var chat_list = document.getElementById('chat-list')
                                chat_list.innerHTML += '<a href="#'+childSnapshot.key+'" id="'+childSnapshot.key+'" class="collection-item">'+ name +'</a>'
                                
                            });
                        });
                })
            });
        }
	});
})