// var ctx = document.getElementById("myChart").getContext('2d');
// var ctx = document.getElementById("myChart1").getContext('2d');
// var ctx = document.getElementById("myChart2").getContext('2d');
// var ctx = document.getElementById("myChart3").getContext('2d');

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

var ctx = new Array();
ctx.push(document.getElementById("myChart").getContext('2d'));
ctx.push(document.getElementById("myChart1").getContext('2d'));
ctx.push(document.getElementById("myChart2").getContext('2d'));
ctx.push(document.getElementById("myChart3").getContext('2d'));

for(var i=0;i<4;i++){
    var myChart = new Chart(ctx[i], {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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
}

var ctx = new Array();
ctx.push(document.getElementById("monthly_chart").getContext('2d'));
ctx.push(document.getElementById("line").getContext('2d'));
ctx.push(document.getElementById("line1").getContext('2d'));
ctx.push(document.getElementById("line2").getContext('2d'));
ctx.push(document.getElementById("line3").getContext('2d'));


for(var i=0;i<4;i++){
    var myChart = new Chart(ctx[i], {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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
}


