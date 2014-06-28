$(function() {
    $('#height').animateNumbers(172.0);
    $("#weight").animateNumbers(80);
    $("#age").animateNumbers(24);

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
            b: 40
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