let app = firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
var user = auth.currentUser;
var email_id = null;
var id = null;

cart_list = new Array()

document.addEventListener('DOMContentLoaded', function() {

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

    var marketing_poster_id = document.getElementById('marketing-poster').id
    var marketing_flyer_id = document.getElementById('marketing-flyer').id
    var marketing_window_decals_id = document.getElementById('marketing-window-decals').id
    var qr_code_id = document.getElementById('qr-code').id
    var ctt_badge_id = document.getElementById('ctt-badge').id
    var content_modification_id = document.getElementById('content-modification').id
    var design_modification_id = document.getElementById('design-modification').id
    var calendar_id = document.getElementById('calendar').id
    var text_messaging_id = document.getElementById('text-messaging').id
    var payment_gateway_id = document.getElementById('payment-gateway').id
    var web_dev_design_id = document.getElementById('web-dev-design').id

    var marketing_poster_item_name = document.getElementById('marketing-poster-item-name').innerText
    var marketing_flyer_item_name = document.getElementById('marketing-flyer-item-name').innerText
    var marketing_window_decals_item_name = document.getElementById('marketing-window-decals-item-name').innerText
    var qr_code_item_name = document.getElementById('qr-code-item-name').innerText
    var ctt_badge_item_name = document.getElementById('ctt-badge-item-name').innerText
    var content_modification_item_name = document.getElementById('content-modification-item-name').innerText
    var design_modification_item_name = document.getElementById('design-modification-item-name').innerText
    var calendar_item_name = document.getElementById('calendar-item-name').innerText
    var text_messaging_item_name = document.getElementById('text-messaging-item-name').innerText
    var payment_gateway_item_name = document.getElementById('payment-gateway-item-name').innerText
    var web_dev_design_item_name = document.getElementById('web-dev-design-item-name').innerText

    var marketing_poster_amount = document.getElementById('marketing-poster-amount').innerHTML 
    var marketing_flyer_amount = document.getElementById('marketing-flyer-amount').innerHTML 
    var marketing_window_decals_amount = document.getElementById('marketing-window-decals-amount').innerHTML 
    var qr_code_amount = document.getElementById('qr-code-amount').innerHTML 
    var ctt_badge_amount = document.getElementById('ctt-badge-amount').innerHTML 
    var content_modification_amount = document.getElementById('content-modification-amount').innerHTML 
    var design_modification_amount = document.getElementById('design-modification-amount').innerHTML 
    var calendar_amount = document.getElementById('calendar-amount').innerHTML 
    var text_messaging_amount = document.getElementById('text-messaging-amount').innerHTML 
    var payment_gateway_amount = document.getElementById('payment-gateway-amount').innerHTML 
    var web_dev_design_amount = document.getElementById('web-dev-design-amount').innerHTML

    var ctt_badge_total_amount = document.getElementById('ctt-badge-total-amount').innerHTML
    var content_modification_total_amount = document.getElementById('content-modification-total-amount').innerHTML
    var design_modification_total_amount = document.getElementById('design-modification-total-amount').innerHTML
    var calendar_total_amount = document.getElementById('calendar-total-amount').innerHTML
    var text_messaging_total_amount = document.getElementById('text-messaging-total-amount').innerHTML
    var payment_gateway_total_amount = document.getElementById('payment-gateway-total-amount').innerHTML
    var web_dev_design_total_amount = document.getElementById('web-dev-design-total-amount').innerHTML

    var marketing_poster = document.getElementById('add-marketing-poster') 
    var marketing_flyer = document.getElementById('add-marketing-flyer') 
    var marketing_window_decals = document.getElementById('add-marketing-window-decals') 
    var qr_code = document.getElementById('add-qr-code') 
    var ctt_badge = document.getElementById('add-ctt-badge') 
    var content_modification = document.getElementById('add-content-modification') 
    var design_modification = document.getElementById('add-design-modification') 
    var calendar = document.getElementById('add-calendar') 
    var text_messaging = document.getElementById('add-text-messaging') 
    var payment_gateway = document.getElementById('add-payment-gateway') 
    var web_dev_design = document.getElementById('add-web-dev-design')

    var marketing_poster_quantity = document.getElementById('marketing-poster-no')
    var marketing_flyer_quantity = document.getElementById('marketing-flyer-no')
    var marketing_window_decals_quantity = document.getElementById('marketing-window-decals-no')

    marketing_poster.addEventListener('click', function(){
        console.log(itemExist(marketing_poster_id))
        if(!itemExist(marketing_poster_id)){
            cart_item = {}
            cart_item['id'] = marketing_poster_id
            cart_item['name'] = marketing_poster_item_name
            cart_item['amount'] = marketing_poster_amount
            cart_item['quantity'] = marketing_poster_quantity.value
            cart_list.push(cart_item)
            document.getElementById('del-' + marketing_poster_id).style.display = 'block'
            this.style.display = 'none'
            // console.log(cart_list)
        }
    });

    marketing_flyer.addEventListener('click', function(){
        if(!itemExist(marketing_flyer_id)){
            cart_item = {}
            cart_item['id'] = marketing_flyer_id
            cart_item['name'] = marketing_flyer_item_name
            cart_item['amount'] = marketing_flyer_amount
            cart_item['quantity'] = marketing_flyer_quantity.value
            cart_list.push(cart_item)
            // console.log(cart_list)
            document.getElementById('del-' + marketing_flyer_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    marketing_window_decals.addEventListener('click', function(){
        if(!itemExist(marketing_window_decals_id)){
            cart_item = {}
            cart_item['id'] = marketing_window_decals_id
            cart_item['name'] = marketing_window_decals_item_name
            cart_item['amount'] = marketing_window_decals_amount
            cart_item['quantity'] = marketing_window_decals_quantity.value
            cart_list.push(cart_item)
            // console.log(cart_list)
            document.getElementById('del-' + marketing_window_decals_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    qr_code.addEventListener('click', function(){
        if(!itemExist(qr_code_id)){
            cart_item = {}
            cart_item['id'] = qr_code_id
            cart_item['name'] = qr_code_item_name
            cart_item['amount'] = qr_code_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + qr_code_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    ctt_badge.addEventListener('click', function(){
        if(!itemExist(ctt_badge_id)){
            cart_item = {}
            cart_item['id'] = ctt_badge_id
            cart_item['name'] = ctt_badge_item_name
            cart_item['amount'] = ctt_badge_amount
            cart_item['total_amount'] = ctt_badge_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + ctt_badge_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    content_modification.addEventListener('click', function(){
        if(!itemExist(content_modification_id)){
            cart_item = {}
            cart_item['id'] = content_modification_id
            cart_item['name'] = content_modification_item_name
            cart_item['amount'] = content_modification_amount
            cart_item['total_amount'] = content_modification_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + content_modification_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    design_modification.addEventListener('click', function(){
        if(!itemExist(design_modification_id)){
            cart_item = {}
            cart_item['id'] = design_modification_id
            cart_item['name'] = design_modification_item_name
            cart_item['amount'] = design_modification_amount
            cart_item['total_amount'] = design_modification_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + design_modification_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    calendar.addEventListener('click', function(){
        if(!itemExist(calendar_id)){
            cart_item = {}
            cart_item['id'] = calendar_id
            cart_item['name'] = calendar_item_name
            cart_item['amount'] = calendar_amount
            cart_item['total_amount'] = calendar_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + calendar_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    text_messaging.addEventListener('click', function(){
        if(!itemExist(text_messaging_id)){
            cart_item = {}
            cart_item['id'] = text_messaging_id
            cart_item['name'] = text_messaging_item_name
            cart_item['amount'] = text_messaging_amount
            cart_item['total_amount'] = text_messaging_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + text_messaging_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    payment_gateway.addEventListener('click', function(){
        if(!itemExist(payment_gateway_id)){
            cart_item = {}
            cart_item['id'] = payment_gateway_id
            cart_item['name'] = payment_gateway_item_name
            cart_item['amount'] = payment_gateway_amount
            cart_item['total_amount'] = payment_gateway_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + payment_gateway_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    web_dev_design.addEventListener('click', function(){
        if(!itemExist(web_dev_design_id)){
            cart_item = {}
            cart_item['id'] = web_dev_design_id
            cart_item['name'] = web_dev_design_item_name
            cart_item['amount'] = web_dev_design_amount
            cart_item['total_amount'] = web_dev_design_total_amount
            cart_list.push(cart_item)
            document.getElementById('del-' + web_dev_design_id).style.display = 'block'
            this.style.display = 'none'
        }
    });

    bronze.addEventListener('click', function(){
        if(!itemExist('bronze-plan')){
            cart_item = {}
            cart_item['id'] = 'bronze-plan'
            cart_item['plan_name'] = "bronze"
            cart_item['payment_period'] = document.getElementById('payment-option').value
            cart_item['price'] = ""
            cart_list.push(cart_item)

            M.toast({html: 'Plan Added to Cart'})
            bronze.classList.add('disabled')
            silver.classList.remove('disabled')
            gold.classList.remove('disabled')
            platinum.classList.remove('disabled')
            bronze.innerHTML = "PLAN ADDED"
            silver.innerHTML = "CHOOSE PLAN"
            gold.innerHTML = "CHOOSE PLAN"
            platinum.innerHTML = "CHOOSE PLAN"
        }
    })

    silver.addEventListener('click', function(){
        if(!itemExist('silver-plan')){
            cart_item = {}
            cart_item['id'] = 'silver-plan'
            cart_item['plan_name'] = "silver"
            cart_item['payment_period'] = document.getElementById('payment-option').value
            cart_item['price'] = ""
            cart_list.push(cart_item)

            M.toast({html: 'Plan Added to Cart'})
            bronze.classList.remove('disabled')
            silver.classList.add('disabled')
            gold.classList.remove('disabled')
            platinum.classList.remove('disabled')
            bronze.innerHTML = "CHOOSE PLAN"
            silver.innerHTML = "PLAN ADDED"
            gold.innerHTML = "CHOOSE PLAN"
            platinum.innerHTML = "CHOOSE PLAN"
        }
    })

    gold.addEventListener('click', function(){
        if(!itemExist('gold-plan')){
            cart_item = {}
            cart_item['id'] = 'gold-plan'
            cart_item['plan_name'] = "gold"
            cart_item['payment_period'] = document.getElementById('payment-option').value
            cart_item['price'] = ""
            cart_list.push(cart_item)

            M.toast({html: 'Plan Added to Cart'})
            bronze.classList.remove('disabled')
            silver.classList.remove('disabled')
            gold.classList.add('disabled')
            platinum.classList.remove('disabled')
            bronze.innerHTML = "CHOOSE PLAN"
            silver.innerHTML = "CHOOSE PLAN"
            gold.innerHTML = "PLAN ADDED"
            platinum.innerHTML = "CHOOSE PLAN"
        }
    })

    platinum.addEventListener('click', function(){
        if(!itemExist('platinum-plan')){
            cart_item = {}
            cart_item['id'] = 'platinum-plan'
            cart_item['plan_name'] = "platinum"
            cart_item['payment_period'] = document.getElementById('payment-option').value
            cart_item['price'] = ""
            cart_list.push(cart_item)

            M.toast({html: 'Plan Added to Cart'})
            bronze.classList.remove('disabled')
            silver.classList.remove('disabled')
            gold.classList.remove('disabled')
            platinum.classList.add('disabled')
            bronze.innerHTML = "CHOOSE PLAN"
            silver.innerHTML = "CHOOSE PLAN"
            gold.innerHTML = "CHOOSE PLAN"
            platinum.innerHTML = "PLAN ADDED"
        }
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

function showCart(){
    console.log('showing cart')
    document.getElementById('cart').innerHTML = ""
    for(var cart_item in cart_list){
        var name = cart_list[cart_item]['name']
        var amount = cart_list[cart_item]['amount']
        // var total_amount = cart_item[i]['name']
        var item = '<li class="collection-item padding-0"><div class="row margin-0 padding-16 valign-wrapper"><div class="col l4"><h6 class="bold">'+ name +'</h6></div><div class="col l5 center"><h5 class="bold">'+ amount +'</h5></div><div class="col l1"><i id="" class="material-icons remove-item right">close</i></div></div></li>'
        document.getElementById('cart').innerHTML += item
    }
}

function itemExist(id){
    var flag = false
    for(var i in cart_list){
        if (cart_list[i].id == id){
            flag = true
        }
    }
    return flag
}

function removeItem(el, id){
    for(var item = 0; item < cart_list.length; item++){
        if(cart_list[item].id == id){
            cart_list.splice(item, 1);
            el.style.display = 'none'
            document.getElementById('add-' + id).style.display = 'block'
            break
        }
    }
}