document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});

    var elems = document.querySelectorAll('.sidenav');
    var instance = M.Tabs.init(elems, {});
    
    
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

});