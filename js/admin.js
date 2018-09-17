document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.initializeApp(config);
    const db = firebase.firestore();
    const auth = firebase.auth();
    var user = auth.currentUser;
    var email = null;

    db.collection('users').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var user = doc.data();
            var d_cont = document.getElementById('detail-container');
            var user_card = '<li id="'+user.uid+'"><div class="collapsible-header row margin-0 valign-wrapper"><h6 class="col l12">'+user.first_name+ ' ' + user.last_name + '</h6></div><div class="collapsible-body row margin-0"><div class="col l12"><h6><strong>Unique Id:</strong> <span id="uid">'+user.uid+'</span><br><br><br><div class="col l6"><p><strong>First Name:</strong> <span id="first_name">'+user.first_name+'</span></p><p><strong>Email:</strong> <span id="email">'+user.email+'</span></p><p><strong>Business Phone:</strong> <span id="business_phone">'+user.business_phone+'</span></p><p><strong>Business Line 1:</strong> <span id="business_line_1">'+user.business_line_1+'</span></p><p><strong>Business City:</strong> <span id="business_city">'+user.business_city+'</span></p><p><strong>Business Zip Code:</strong> <span id="business_zip_code">'+user.business_zip_code+'</span></p></div><div class="col l6"><p><strong>Last Name:</strong> <span id="last_name">'+user.last_name+'</span></p><p><strong>Business Name:</strong> <span id="business_name">'+user.business_name+'</span></p><p><strong>Federal Tax EIN:</strong> <span id="federal_tax_ein">'+user.federal_tax_ein+'</span></p><p><strong>Business Line 2:</strong> <span id="business_line_2">'+user.business_line_2+'</span></p><p><strong>Business State:</strong> <span id="business_state">'+user.business_state+'</span></p><p><strong>Business Plan:</strong> <span id="business_plan">'+user.business_plan+'</span></p></div><div class="col l12"><p><strong>Profile Update Status:</strong> <span id="updated">'+user.updated+'</span></p><p><strong>W9 Form Upload Status:</strong> <span id="form_uploaded">'+user.form_uploaded+'</span></p><p><strong>Form Verification Staus:</strong> <span id="form_verified">'+user.form_verified+'</span></p></div><div class="col l12 center"><hr><br><a href="https://firebasestorage.googleapis.com/v0/b/carry-this-too-1.appspot.com/o/forms%2FN0sQt7g76aVuKEfnRnVu5HiPgLg2_1534341426335?alt=media&token=6c621fc9-f3fa-48ff-b2d3-1b9fba0c6993" target="_blank" id="form_url" class="btn blue accent-2">DOWNLOAD FORM</a><a href="#form_verification" class="btn green accent-2 modal-trigger">UPDATE FORM STATUS</a><a href="#" class="btn amber accent-2">DEACTIVATE ACCOUNT</a><a href="#" class="btn red accent-2">DELETE ACCOUNT</a></div></div></li>';
            d_cont.innerHTML += user_card


        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    document.getElementById('invite_btn').addEventListener('click', function(){
        var email_in = document.getElementById('invite_email');
        email = email_in.value;
        console.log(email)
        userData = {
            email: email,
            temp_pass: 'test@ctt',
            type: 'instructor',
            updated: false
        }

        db.collection('users').add(userData).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            M.toast({ html: "User Added!" })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

        // auth.createUserWithEmailAndPassword(email, 'temp@ctt').catch(function(error) {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        // });

    });

// add one content revision per 12 months: GOLD and PLATINUM.

    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            document.getElementById('main').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            // firebaseUser.getIdToken(true).then(function(idToken) {
            //     // Send token to your backend via HTTPS
            //     // ...
            //     console.log(idToken);
            // }).catch(function(error) {
            //     // Handle error
            //     console.log('error: ', error);
            // });

            // console.log(firebaseUser.email);
            // var id = firebaseUser.uid;
            // console.log(id);
            // // if(firebaseUser.email != 'admin@carrythistoo.com'){
            // //     window.location.href = 'login.html';
            // // }
            
            // var userData = {
            //     uid: id,
            //     email: email,
            //     type: 'instructor',
            //     updated: false
            // }
            
            // db.collection('users').add(userData).then(function(docRef) {
            //     console.log("Document written with ID: ", docRef.id);
            // })
            // .catch(function(error) {
            //     console.error("Error adding document: ", error);
            // });

        }else{
            console.log('none');
        }
    })
});