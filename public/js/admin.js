document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.app();
    const db = firebase.firestore();
    const auth = firebase.auth();
    var user = auth.currentUser;
    var email = null;

    db.collection('user').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    document.getElementById('invite_btn').addEventListener('click', function(){
        var email_in = document.getElementById('email');
        email = email_in.value;

        auth.createUserWithEmailAndPassword(email, 'temp@ctt').catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
 
    });

    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser.email);
            var id = firebaseUser.uid;
            console.log(id);
            // if(firebaseUser.email != 'admin@carrythistoo.com'){
                // window.location.href = 'login.html';
            // }
            
            var userData = {
                uid: id,
                email: email,
                type: 'instructor',
                updated: false
            }
            
            db.collection('users').add(userData).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        }else{
            console.log('none');
        }
    })
});