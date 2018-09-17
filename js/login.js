let app = firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function () {
    var root = document.location.pathname;
    var type = null;
    document.getElementById('main').style.display = 'block'
    document.getElementById('loader').style.display = 'none'

    var email_in = document.getElementById('email');
    var password_in = document.getElementById('password');
    var id = null;
    var updated = false;

    document.getElementById('login').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const email = email_in.value;
        const password = password_in.value;

        db.collection('users').where('email', '==', email).get().then(function (querySnapshot) {
            console.log(querySnapshot.size)
            // var doc = querySnapshot.

            if (email == 'admin@carrythistoo.com') {
                auth.signInWithEmailAndPassword(email, password).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
            } else if (querySnapshot.size > 0) {
                querySnapshot.forEach(function (doc) {
                    var user = doc.data()
                    console.log(user)
                    if (user.updated) {
                        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            M.toast({ html: errorMessage })
                        });
                    } else if (user.temp_pass == password) {
                        console.log('pass success')
                        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                        });
                    } else {
                        M.toast({ html: "Incorrect Password" })
                    }
                })
            } else {
                M.toast({ html: "You don't have access to the portal please contact the admin" })
            }

        }).catch(function (error) {
            M.toast({ html: error.message })
        })
    });

    auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // window.user = firebaseUser;
            console.debug('begin login');
            if (firebaseUser.email == "admin@carrythistoo.com") {
                M.toast({ html: "Welcome Admin!"})
                window.location = root.replace('login', 'admin');
            } else {
                db.collection("users")
                    .where('email', '==', firebaseUser.email)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            console.log("Welcome " + doc.data().email);
                            M.toast({ html: "Welcome " + firebaseUser.displayName + "!"})
                            id = doc.id;
                            var userData = doc.data();
                            type = userData.type;
                            updated = userData.updated;

                            if (updated) {
                                window.location.href = 'instructor.html';
                            } else {
                                window.location.href = 'signup.html';
                            }
                        });
                    });
            }
        } else {
            console.log('error');
        }
    })
});



