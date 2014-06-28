$(function() {
    Bmob.initialize("9cef14ccfed7bf117429733f7c2e3a99", "55851e8509f6365bd8116750677cc708");
    $('#height').animateNumbers(172.0);
    $("#weight").animateNumbers(80);
    $("#age").animateNumbers(24);

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

    Morris.Line({
        element: 'bloodpressure',
        data: [{
            y: '2006',
            a: 50,
            b: 40
        }, {
            y: '2007',
            a: 65,
            b: 55
        }, {
            y: '2008',
            a: 50,
            b: null
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        goals: [115, 75],
        events: ['2010', '2011'],
        goalStrokeWidth: 3,
        goalLineColors: ['#d0002c', '#007fd0'],
        ykeys: ['a', 'b'],
        labels: ['收缩压', '舒张压'],
        lineColors: ['#0aa699', '#d1dade'],
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