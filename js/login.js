var db = firebase.firestore();

var email_in = document.getElementById('email');
var password_in = document.getElementById('password');

document.getElementById('login').addEventListener('click', function(){
    var email = email_in.value;
    var password = password_in.value;
    console.log(email + " " + password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
});

var root = document.location.pathname;
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        if(user.email == 'admin@carrythistoo.com')
            window.location = root.replace('login', 'instructor');
        else
            db.collection("users")
            .get()
            .whereEqualTo('email', user.email)
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("asd");
                    window.location = root.replace('login', 'instructor');
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });            
    }
});

  