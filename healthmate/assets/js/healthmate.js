$(function() {
    // Bmob.initialize("9cef14ccfed7bf117429733f7c2e3a99", "55851e8509f6365bd8116750677cc708");


    // var user = new Bmob.User();
    // user.set("username", "evernight");
    // user.set("password", "199136");
    // user.set("email", "everatnight@gmail.com");

    // // other fields can be set just like with Bmob.Object
    // user.set("phone", "415-392-0202");

    // user.signUp(null, {
    //     success: function(user) {
    //         // Hooray! Let them use the app now.
    //     },
    //     error: function(user, error) {
    //         // Show the error message somewhere and let the user try again.
    //         alert("Error: " + error.code + " " + error.message);
    //     }
    // });


    $.ajax({
        dataType: "jsonp",
        url: 'http://192.168.0.2:5000/basic/bp/demo',
        data: {},
        success: function(json, textStatus) {
            console.log(json);
            Morris.Line({
                element: 'bloodpressure',
                data: json,
                xkey: 'timestamp',
                goals: [115, 75],
                continuousLine: false,
                goalStrokeWidth: 3,
                goalLineColors: ['#d0002c', '#007fd0'],
                ykeys: ['high', 'low'],
                labels: ['收缩压', '舒张压'],
                lineColors: ['#0aa699', '#d1dade'],
            });
        }
    });

    $.ajax({
        dataType: "jsonp",
        url: 'http://192.168.0.2:5000/basic/demo',
        data: {},
        success: function(json, textStatus) {
            $('#height').animateNumbers(json.height / 10);
            $("#weight").animateNumbers(json.weight);
            $("#age").animateNumbers(24);


            $('#bmi').html(json.bmi);
            $('#bodyfat').html(json.bodyFat);

            $('#bphigh').html(json.bphigh);
            $('#bplow').html(json.bplow);
        }
    });

    $.ajax({
        dataType: "jsonp",
        url: 'http://192.168.0.2:5000/loseweight/demo/1/99999999999999',
        data: {},
        success: function(json, textStatus) {
            // console.log(json);
            // $('#steps').html(json.total.steps);
            // $('#distance').html(json.total.distance);
            // $('#cal').html(json.total.cal);

            $('#steps').easyPieChart({
                lineWidth: 9,
                barColor: '#f35958',
                trackColor: '#e5e9ec',
                scaleColor: false
            });
            $('#cal').easyPieChart({
                lineWidth: 9,
                barColor: '#7dc6ec',
                trackColor: '#e5e9ec',
                scaleColor: false
            });
            $('#activetime').easyPieChart({
                lineWidth: 9,
                barColor: '#0aa699',
                trackColor: '#e5e9ec',
                scaleColor: false
            });
        }
    });



    Morris.Line({
        element: 'bodyweight',
        data: [{
            y: '2006',
            a: 50
        }, {
            y: '2007',
            a: 65
        }, {
            y: '2008',
            a: 50
        }, {
            y: '2009',
            a: 75
        }, {
            y: '2010',
            a: 60
        }, {
            y: '2011',
            a: 75
        }, {
            y: '2012',
            a: 76
        }],
        xkey: 'y',
        goals: [75],
        goalStrokeWidth: 3,
        goalLineColors: ['#007fd0'],
        ykeys: ['a'],
        labels: ['体重'],
        lineColors: ['#0aa699'],
    });

});