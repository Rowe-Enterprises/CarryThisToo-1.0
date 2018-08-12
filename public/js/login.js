document.addEventListener('DOMContentLoaded', function() {
    var root = document.location.pathname;
    var type = null;
    let app = firebase.app();
    const db = firebase.firestore();
    const auth = firebase.auth();

    var email_in = document.getElementById('email');
    var password_in = document.getElementById('password');
    var id = null;
    var updated = false;

    document.getElementById('login').addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        const email = email_in.value;
        const password = password_in.value;

        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    });

    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            window.user = firebaseUser;
            
            if(firebaseUser.email == "admin@carrythistoo.com"){
                window.location = root.replace('login', 'admin');
            }else{
                db.collection("users")
                    .where('email', '==', firebaseUser.email)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            console.log("Welcome " + doc.data().email);
                            id = doc.id;
                            var userData = doc.data();
                            type = userData.type;
                            updated = userData.updated;

                            if(updated){
                                window.location.href = 'instructor.html';
                            }else{
                                window.location.href = 'signup.html';
                            }
                        });
                    });
            }
        }else{
            console.log('error');
        }
    })
});



