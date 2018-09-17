// var ctx = document.getElementById("myChart").getContext('2d');
// var ctx = document.getElementById("myChart1").getContext('2d');
// var ctx = document.getElementById("myChart2").getContext('2d');
// var ctx = document.getElementById("myChart3").getContext('2d');

var app = firebase.initializeApp(config);
var user = firebase.auth().currentUser;
var root = document.location.pathname;
document.getElementById('logout').addEventListener('click', function(){
    firebase.auth().signOut().then(function() {
            console.log(user)
            window.location = root.replace('instructor', 'login');
      }, function(error) {
        // An error happened.
      });
    
})

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Credit Earning each month',
            data: [154, 235, 48, 68, 67, 95, 12, 162, 362, 247, 135, 48],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx = document.getElementById("monthly_chart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Earning each month',
            data: [12, 19, 3, 5, 2, 3, 14, 1, 53, 24, 8, 17],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

