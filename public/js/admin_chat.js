document.addEventListener('DOMContentLoaded', function() {
	let app = firebase.app();
	const db = firebase.firestore()
	const rt_db = firebase.database();
	const auth = firebase.auth();
	
	var objDiv = document.getElementById("chat-container");
	objDiv.scrollTop = objDiv.scrollHeight;

	var send_btn = document.getElementById('send-btn');
	var message_box = document.getElementById('message-box');
	send_btn.addEventListener('click', function(){
		return firebase.database().ref('/chats/'+uid).push({
			message: message_box.value,
			name: displayName
		})
    })
    
    var callback_chat = function(snap){
        var data = snap.val()
        
        var chat_container = document.getElementById('chat-container')
        if(data.name != 'Admin')
            chat_container.innerHTML += '<div class="row"><p class="user chip message-chip right"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
        else
            chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip left"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
    }
    
    var callback_chat_list = function(snap){
        console.log(snap.key)
        
        db.collection("users")
            .where('uid', '==', snap.key)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var user = doc.data();
                    var name = user.first_name + " " + user.last_name

                    var chat_list = document.getElementById('chat-list')
                    chat_list.innerHTML += '<a href="#'+snap.key+'" id="'+snap.key+'" class="collection-item active">'+ name +'</a>'
                    
                });
            });
    }
    
    

    window.addEventListener('hashchange', function() {
        var chat_id = location.href.split('#')[1];
        var callback_chat = function(snap){
            var data = snap.val()
            var chat_container = document.getElementById('chat-container')
            if(data.name != 'Admin')
                chat_container.innerHTML += '<div class="row"><p class="user chip message-chip left"><span class="bold blue-text">'+data.name+': </span>'+data.message+'</p></div>'
            else
                chat_container.innerHTML += '<div class="row"><p class="admin chip message-chip right"><span class="bold red-text">'+data.name+': </span>'+data.message+'</p></div>'
        }

        
        rt_db.ref('/chats/'+chat_id+'/').limitToLast(12).on('child_added', callback_chat);
        rt_db.ref('/chats/'+chat_id+'/').limitToLast(12).on('child_changed', callback_chat);
    
    });

    var send_btn = document.getElementById('send-btn');
	var message_box = document.getElementById('message-box');
	send_btn.addEventListener('click', function(){
        var chat_id = location.href.split('#')[1];
        console.log(chat_id);
		return firebase.database().ref('/chats/'+chat_id).push({
			message: message_box.value,
			name: 'Admin'
		})
	})
    
    rt_db.ref('/chats/').limitToLast(12).on('child_added', callback_chat_list);
    rt_db.ref('/chats/').limitToLast(12).on('child_changed', callback_chat_list);

	auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){


        }
	})
})