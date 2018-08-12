document.addEventListener('DOMContentLoaded', function() {
	let app = firebase.app();
    const db = firebase.firestore();
    const auth = firebase.auth();
	
	console.log(auth);

	var objDiv = document.getElementById("chat-container");
	objDiv.scrollTop = objDiv.scrollHeight;

	auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
			console.log(firebaseUser.displayName);
			var user_name = firebaseUser.displayName;
			// console.log(user_name);
		}
	})
})