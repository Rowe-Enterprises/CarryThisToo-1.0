document.addEventListener('DOMContentLoaded', function() {
    var root = document.location.pathname;
    var type = null;
    let app = firebase.app();
    
    const db = firebase.firestore();
    const auth = firebase.auth();
    const user = auth.currentUser;


    docRef = db.collection('users').doc(id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var user = doc.data();
            delete user['temp_pass']
            delete user['updated']
            delete user['type']
            delete user['document_status']
            // console.log(user);
            for (var key in user) {
                // console.log(key);
                document.getElementById(key).innerHTML = user[key];
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });  
})