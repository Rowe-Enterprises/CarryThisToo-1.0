document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.initializeApp(config);
    const db = firebase.firestore();
    const auth = firebase.auth();
    var user = auth.currentUser;
    var email_id = null;
    var id = null;

    cart = {}

    document.getElementById('loader').style.display = "none"
    document.getElementById('main').style.display = "block"
    
    document.getElementById('confirm_btn').addEventListener('click', function(){    
        var first_name = document.getElementById('first_name')
        var last_name = document.getElementById('last_name')
        var business_name = document.getElementById('business_name')
        var email = document.getElementById('email')
        var business_line_1 = document.getElementById('business_line_1')
        var business_line_2 = document.getElementById('business_line_2')
        var business_phone = document.getElementById('business_phone')
        var federal_tax_ein = document.getElementById('federal_tax_ein')
        var business_city = document.getElementById('business_city')
        var business_state = document.getElementById('business_state')
        var business_zip_code = document.getElementById('business_zip_code')
        var password = document.getElementById('password')
        var confirm_password = document.getElementById('confirm_password')
        profileData = {};
        userData = {};
        if(password.value == confirm_password.value){
            var password_val = password.value;
            console.log(password_val);

            user.updatePassword(password_val).then(function() {
                // Update successful.
                console.log('pass updated');
            }).catch(function(error) {
                // An error happened.
                console.log('pass update failed');
            });
``
            profileData.displayName = first_name.value + " " + last_name.value;
            profileData.emailVerified = true;
            profileData.phoneNumber = business_phone;

            user.updateProfile(profileData).then(function() {
                // Update successful.
                console.log('profile updated');
            }).catch(function(error) {
                // An error happened.
                console.log('profile update failed');
            });

            userData['uid'] = user.uid
            userData['first_name'] = first_name.value
            userData['last_name'] = last_name.value
            userData['business_name'] = business_name.value
            userData['email'] = email.value
            userData['business_line_1'] = business_line_1.value
            userData['business_line_2'] = business_line_2.value
            userData['business_phone'] = business_phone.value
            userData['federal_tax_ein'] = federal_tax_ein.value
            userData['business_city'] = business_city.value
            userData['business_state'] = business_state.value
            userData['business_zip_code'] = business_zip_code.value
            userData['updated'] = true
            userData['temp_pass'] = null

            console.log(userData)
            
            db.collection('users').where('email', '==', email_id).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    id = doc.id;
                    console.log(doc.id, " => ", doc.data());
                    var userRef = db.collection('users').doc(id);
                    // console.log();
                    userRef.update(userData).then(function() {
                        console.log("Document successfully updated!");
                        // window.location.href = 'instructor.html';
                        document.getElementById('register-container').style.display = 'none'
                        document.getElementById('pricing-container').style.display = 'block'
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

    var bronze = document.getElementById('bronze-plan')
    var silver = document.getElementById('silver-plan')
    var gold = document.getElementById('gold-plan')
    var platinum = document.getElementById('platinum-plan')
    var a_le_carte = document.getElementById('a-le-carte')

    bronze.addEventListener('click', function(){
        cart['plan_name'] = "bronze"
        cart['payment_period'] = document.getElementById('payment-option').value
        cart['price'] = ""

        M.toast({html: 'Plan Added to Cart'})
        bronze.classList.add('disabled')
        silver.classList.remove('disabled')
        gold.classList.remove('disabled')
        platinum.classList.remove('disabled')
        // console.log(cart)
    })

    silver.addEventListener('click', function(){
        cart['plan_name'] = "silver"
        cart['payment_period'] = document.getElementById('payment-option').value
        cart['price'] = ""

        M.toast({html: 'Plan Added to Cart'})
        bronze.classList.remove('disabled')
        silver.classList.add('disabled')
        gold.classList.remove('disabled')
        platinum.classList.remove('disabled')
        // console.log(cart)
    })

    gold.addEventListener('click', function(){
        cart['plan_name'] = "gold"
        cart['payment_period'] = document.getElementById('payment-option').value
        cart['price'] = ""

        M.toast({html: 'Plan Added to Cart'})
        bronze.classList.remove('disabled')
        silver.classList.remove('disabled')
        gold.classList.add('disabled')
        platinum.classList.remove('disabled')
        // console.log(cart)
    })

    platinum.addEventListener('click', function(){
        cart['plan_name'] = "platinum"
        cart['payment_period'] = document.getElementById('payment-option').value
        cart['price'] = ""

        M.toast({html: 'Plan Added to Cart'})
        bronze.classList.remove('disabled')
        silver.classList.remove('disabled')
        gold.classList.remove('disabled')
        platinum.classList.add('disabled')
        // console.log(cart)
    })

    a_le_carte.addEventListener('click', function(){
        document.getElementById('pricing-container').style.display = 'none'
        document.getElementById('add-on-container').style.display = 'block'
    })

    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            document.getElementById('main').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            user = firebaseUser;
            email_id = firebaseUser.email;
            document.getElementById('email').value = email_id;
        }
    });
});