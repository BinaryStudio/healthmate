$(function() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var timelinecode = '<ul class="cbp_tmtimeline"> \
                <li> \
                  <time class="cbp_tmtime"> \
                    <span class="date"><%= startDate %></span> \
                    <span class="time"> \
                      <%= startTime %> \
                    </span> \
                  </time> \
                  <div class="cbp_tmicon primary animated bounceIn"> \
                    <i class="fa fa-comments"></i> \
                  </div> \
                  <div class="cbp_tmlabel"> \
                    <div class="p-t-10 p-l-30 p-r-20 p-b-20 xs-p-r-10 xs-p-l-10 xs-p-t-5"> \
                      <h4 class="inline m-b-5"> \
                        <span class="text-success semi-bold">开始<%= type %></span> \
                      </h4> \
                    </div> \
                  </div> \
                </li> \
                <li> \
                  <time class="cbp_tmtime"> \
                    <span class="date"><%= endDate %></span> \
                    <span class="time"> \
                      <%= endTime %> \
                    </span> \
                  </time> \
                  <div class="cbp_tmicon success animated bounceIn"> \
                    <i class="fa fa-map-marker"></i> \
                  </div> \
                  <div class="cbp_tmlabel"> \
                    <div class="p-t-10 p-l-30 p-r-20 p-b-20 xs-p-r-10 xs-p-l-10 xs-p-t-5"> \
                      <h4 class="inline m-b-5"> \
                        <span class="text-success semi-bold"><%= type %><%= distance %>m, 耗时<%= duration %>min, 消耗卡路里<%= calories %>大卡。</span>\
                      </h4> \
                    </div> \
                    <div class="tiles grey"> \
                      <div class="progress progress-striped active progress-large"> \
                        <div style="width: <%= percent %>%;" class="progress-bar progress-bar-success"></div> \
                      </div> \
                    </div> \
                  </div> \
                </li> \
              </ul>';

    var timelineTemplate = _.template(timelinecode);

    $.ajax({
        dataType: "jsonp",
        url: 'http://192.168.0.2:5000/loseweight/xb6/weight',
        data: {},
        success: function(json, textStatus) {
            console.log(json)

            $('#weightgraph').highcharts({
                title: {
                    text: '近一月体重趋势',
                    x: -20 //center
                },
                yAxis: {
                    title: {
                        text: 'kg'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                tooltip: {
                    valueSuffix: 'kg'
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    for (var i = 0; i < this.series.xData.length; i++) {
                                        if (this.category == this.series.xData[i]) {
                                            if (i >= 1) {
                                                start = this.series.data[i - 1].x;
                                                end = this.x;

                                                console.log('http://192.168.0.2:5000/loseweight/demo/' + start + '/' + end);

                                                $.ajax({
                                                    dataType: "jsonp",
                                                    url: 'http://192.168.0.2:5000/loseweight/demo/' + start + '/' + end,
                                                    data: {},
                                                    success: function(json, textStatus) {

                                                        console.log(json);
                                                        $('#calories').html(json.total.cal);
                                                        $('#steps').html(json.total.steps);
                                                        $('#distance').html(json.total.distance);
                                                        var maxcalam = json.total.pm_cal_max;
                                                        var maxcalpm = json.total.am_cal_max;

                                                        for (var period in json.as) {
                                                            console.log(json);
                                                            console.log(period);
                                                            for (var i in json.as[period]) {
                                                                var startTime = moment(json.as[period][i].start_time);
                                                                var endTime = moment(json.as[period][i].end_time);
                                                                console.log(startTime.format());
                                                                console.log(endTime.format());
                                                                var startDate = startTime.format("YYYY-M-D");
                                                                var endDate = endTime.format("YYYY-M-D");
                                                                var sTime = startTime.format("hh:mm:ss");
                                                                var eTime = endTime.format("hh:mm:ss");
                                                                var type = json.as.AM[i].type === 'walking' ? '走路' : '跑步';
                                                                var timelineresult = timelineTemplate({
                                                                    'startDate': startDate,
                                                                    'startTime': sTime,
                                                                    'endDate': endDate,
                                                                    'endTime': eTime,
                                                                    'type': type,
                                                                    'percent': json.as.AM[i].calories / maxcalam * 100,
                                                                    'calories': json.as.AM[i].calories,
                                                                    'duration': json.as.AM[i].duration,
                                                                    'distance': json.as.AM[i].distance
                                                                });
                                                                $('#timeline' + period).prepend(timelineresult);
                                                            }
                                                        }


                                                        for (var i in json.as.PM) {
                                                            var startTime = moment(json.as.AM[i].start_time);
                                                            var endTime = moment(json.as.AM[i].end_time);
                                                            console.log(startTime.format());
                                                            console.log(endTime.format());
                                                            var startDate = startTime.format("YYYY-M-D");
                                                            var endDate = endTime.format("YYYY-M-D");
                                                            var sTime = startTime.format("hh:mm:ss");
                                                            var eTime = endTime.format("hh:mm:ss");
                                                            var type = json.as.AM[i].type === 'walking' ? '走路' : '跑步';
                                                            var timelineresult = timelineTemplate({
                                                                'startDate': startDate,
                                                                'startTime': sTime,
                                                                'endDate': endDate,
                                                                'endTime': eTime,
                                                                'type': type,
                                                                'percent': json.as.AM[i].calories / maxcalam * 100,
                                                                'calories': json.as.AM[i].calories,
                                                                'duration': json.as.AM[i].duration,
                                                                'distance': json.as.AM[i].distance
                                                            });
                                                            $('#timelineam').prepend(timelineresult);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: '体重',
                    data: json.graph
                }]
            });
        }
    });

    $.ajax({
        dataType: "jsonp",
        url: 'http://192.168.0.2:5000/basic/demo',
        data: {},
        success: function(json, textStatus) {
            $('#weight').html(json.weight);
            $('#bmi').html(json.bmi);
            $('#bodyfat').html(json.bodyFat);
        }
    });







});