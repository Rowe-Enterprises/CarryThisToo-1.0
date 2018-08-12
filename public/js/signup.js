document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.app();
    const db = firebase.firestore();
    const auth = firebase.auth();
    var user = auth.currentUser;
    var email = null;
    var id = null;
    
    document.getElementById('confirm_btn').addEventListener('click', function(){    
        var inputs = document.getElementsByTagName('input');
        profileData = {};
        userData = {};
        if(inputs['password'].value == inputs['confirm_password'].value){
            var password = inputs['password'].value;
            console.log(password);
            for(var i=0;i<inputs.length;i++){
                userData[inputs[i].name] = inputs[i].value;
            }

            user.updatePassword(password).then(function() {
                // Update successful.
                console.log('pass updated');
            }).catch(function(error) {
                // An error happened.
                console.log('pass update failed');
            });

            profileData.displayName = inputs['first_name'] + " " + inputs['last_name'];
            profileData.emailVerified = true;
            profileData.phoneNumber = inputs['business_phone'];

            user.updateProfile(profileData).then(function() {
                // Update successful.
                console.log('profile updated');
            }).catch(function(error) {
                // An error happened.
                console.log('profile update failed');
            });

            email = userData['email'];
            password = userData['password'];
            delete userData['confirm_password'];
            delete userData['password'];
            userData['business_plan'] = 'bronze';
            userData['updated'] = true;

            db.collection('users').where('email', '==', email).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    id = doc.id;
                    console.log(doc.id, " => ", doc.data());
                    var userRef = db.collection('users').doc(id);
                    // console.log();
                    userRef.update(userData).then(function() {
                        console.log("Document successfully updated!");
                        window.location = root.replace('signup', 'instructor');
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

            // console.log(id);
        }
    });

    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            user = firebaseUser;
            email = firebaseUser.email;
            document.getElementById('email').value = email;
        }
    });
});