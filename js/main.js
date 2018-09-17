document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    // var elems = document.querySelectorAll('.dropdown-trigger');
    // var instances = M.Dropdown.init(elems, {});
    
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    document.getElementById('logout').addEventListener('click', function(){
        firebase.auth().signOut().then(function () {
            // console.log(user)
            window.location.href = 'login.html'
        }, function (error) {
            // An error happened.
        });
    })
});