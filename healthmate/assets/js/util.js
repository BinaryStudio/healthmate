function notify(place, type, content, time) {
    time = time || false;
    var numId = Math.round((Math.random() * 1000));
    var id = "alertinfo" + numId;
    var alertTemplate = _.template("<div id='<%= id %>' class='\
                                    animated fadeInUp text-sm alert-<%= type %>' style='min-height:40px; padding:10px'><a href='#' data-dismiss='alert' class='pull-right m-r-n-sm m-t-n-sm'><i class='icon-close icon-remove '></i>\
                                    </a>\
                                    </div>");
    var alertContentTemplate = _.template("<center><strong><%= content %></strong></center>");

    $(place).prepend(alertTemplate({
        id: id,
        type: type
    }));
    $("#" + id).prepend(alertContentTemplate({
        content: content
    }));

    if (time) {
        window.setTimeout(function() {
            $("#" + id).fadeOut();
        }, time);
    }
}

/* Set the defaults for DataTables initialisation */
$.extend(true, $.fn.dataTable.defaults, {
    "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'p i>>",
    "sPaginationType": "bootstrap",
    "oLanguage": {
        "sLengthMenu": "_MENU_"
    }
});


/* Default class modification */
$.extend($.fn.dataTableExt.oStdClasses, {
    "sWrapper": "dataTables_wrapper form-inline"
});


/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": oSettings._iDisplayLength === -1 ?
            0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": oSettings._iDisplayLength === -1 ?
            0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
};


/* Bootstrap style pagination control */
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function(oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function(e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                '<ul>' +
                '<li class="prev disabled"><a href="#"><i class="fa fa-chevron-left"></i></a></li>' +
                '<li class="next disabled"><a href="#"><i class="fa fa-chevron-right"></i></a></li>' +
                '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', {
                action: "previous"
            }, fnClickHandler);
            $(els[1]).bind('click.DT', {
                action: "next"
            }, fnClickHandler);
        },

        "fnUpdate": function(oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, ien, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            } else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, ien = an.length; i < ien; i++) {
                // Remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // Add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function(e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // Add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});



function submitData(method, url, submitData, successCallBack, errorCallBack) {
    $.ajax({
        type: method,
        url: url,
        data: submitData,
        success: successCallBack,
        //async :false,
        error: errorCallBack
    });
}


/*=object自动填充表单函数=*/
function fillFormUseObject(obj, formid) {
    for (var attr in obj) {
        if (typeof(obj[attr]) === 'function') {
            continue;
        }
        var $input = $("#" + formid + " :input[name='" + attr + "']");
        var type = $input.attr("type");
        if (type == "checkbox" || type == "radio") {
            var avalues = obj[attr].split(",");
            for (var v = 0; v < avalues.length; v++) {
                $input.each(function(i, n) {
                    var value = $(n).val();
                    if (value == avalues[v]) {
                        $(n).attr("checked", "checked");
                    }
                });
            }
        } else {
            $input.val(obj[attr]);
        }
    }
}

function formSubmitGenerator(formselector, timerselector, url, tableselector, emptytext, depth, tabledata, tabledata2, customcode) {
    return function(e) {
        e.preventDefault();
        form = $(formselector).serializeJson();
        console.log(form);
        $(timerselector).fadeIn('slow');
        $(timerselector).TimeCircles().destroy();
        $(timerselector).TimeCircles({
            "bg_width": 1.0,
            "fg_width": 0.14,
            "circle_bg_color": "#e8e8e8",
            'time': {
                'Days': {
                    show: false
                },
                'Hours': {
                    'text': '小时'
                },
                'Minutes': {
                    'text': '分',
                    'color': '#0aa699'
                },
                'Seconds': {
                    'text': '秒'
                }
            }
        });


        submitData('post', url, form, function(msg) {
            console.log(msg);
            $(timerselector).TimeCircles().stop();
            $(".retabledemo").fadeOut('fast');
            $('#reduceresult').fadeIn('slow');
            var maketabledata;
            if (depth == 1) {
                maketabledata = msg[tabledata];
            } else if (depth == 2) {
                console.log(msg[tabledata]);
                if (typeof msg[tabledata] == 'string') {
                    var obj = eval("(" + msg[tabledata] + ")");
                    maketabledata = obj[tabledata2];
                } else if (typeof msg[tabledata] == 'object') {
                    maketabledata = msg[tabledata][tabledata2];
                }

            } else {
                maketabledata = msg.data;
            }

            reduceresultDataTable = $(tableselector).dataTable({
                "sDom": "<'row'<'col-md-6'l T><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
                'bProcessing': true,
                "bDestroy": true,
                'bPaginate': true,
                "sPaginationType": "bootstrap",
                "aaData": maketabledata,
                "aoColumns": [{
                    "sTitle": 'KEY'
                }, {
                    "sTitle": 'VALUE'
                }],
                "aaSorting": [
                    [1, "asc"]
                ],
                'oLanguage': {
                    'oPaginate': {
                        'sPrevious': '上一页',
                        'sNext': '下一页'
                    },
                    'sSearch': '搜索',
                    'sInfo': '共_TOTAL_条字段',
                    'sLoadingRecords': '载入数据中...',
                    'sProcessing': '载入中...',
                    'sEmptyTable': emptytext
                },
                bAutoWidth: false,
                "fnCreatedRow": function(nRow, aData, iDataIndex) {
                    $('td', nRow).addClass('tdcenter');
                },
            });

            if (customcode) {
                customcode(msg);
            }
        }, function(xhr, msg) {
            $(timerselector).TimeCircles().stop();
        });
    }
}


function jobGenerator(url) {
    return submitData('post', '/api/startredundancy', form, function(msg) {
        $("#PageOpenTimer").TimeCircles().stop();
        $(".retabledemo").fadeOut('fast');
        $('#reduceresult').fadeIn('slow');
        console.log(msg.data);
        reduceresultDataTable = $('#reduceresult').dataTable({
            "sDom": "<'row'<'col-md-6'l T><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
            'bProcessing': true,
            "bDestroy": true,
            'bPaginate': true,
            "sPaginationType": "bootstrap",
            "aaData": msg.data,
            "aoColumns": [{
                "sTitle": 'KEY'
            }, {
                "sTitle": 'VALUE'
            }],
            "aaSorting": [
                [1, "asc"]
            ],
            'oLanguage': {
                'oPaginate': {
                    'sPrevious': '上一页',
                    'sNext': '下一页'
                },
                'sSearch': '搜索',
                'sInfo': '共_TOTAL_条字段',
                'sLoadingRecords': '载入数据中...',
                'sProcessing': '载入中...',
                'sEmptyTable': '知识库为空'
            },
            bAutoWidth: false,
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
                $('td', nRow).addClass('tdcenter');
            },
        });

    });
}

function callBackGenerator(callBackType, targetModal, message, notifyCallBack) {
    if (callBackType === 'error') {
        return function(XmlHttpRequest, textStatus, errorThrown) {
            // res = JSON.parse(XmlHttpRequest.responseText);
            // var errorDetail = '';
            // for (var i in res.message) {
            //     errorDetail += '<br />字段'+i+':'+res.message[i][0]+'<br />';
            // }
            if (notifyCallBack != undefined) {
                notifyCallBack(XmlHttpRequest, textStatus, errorThrown);
            }
            notify(targetModal, 'error', message + XmlHttpRequest.responseText);

        };
    } else if (callBackType === 'success') {
        return function(msg) {
            if (notifyCallBack != undefined) {
                notifyCallBack(msg);
            }
            notify(targetModal, 'success', message);
            window.setTimeout(function() {
                location.reload();
            }, 1000);
            //emailNotify(form.user, form.approver, msg.data.datapath, msg.data.retaintime, msg.data.datarule, 0);
        };
    }
}



//将表单serialize成json
(function($) {
    $.fn.serializeJson = function() {
        var serializeObj = {};
        $(this.serializeArray()).each(function() {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
})(jQuery);


//Datatable maker
function dataTableMaker(selector, source, columns, createRowCallBack, initCompleteCallBack) {
    var dTable = $(selector).dataTable({
        'bProcessing': true,
        'sAjaxSource': source,
        'sAjaxDataProp': 'data',
        'bSortClasses': false,
        'bLengthChange': false,
        'bAutoWidth': true,
        'bPaginate': false,
        'bScrollCollapse': true,
        'sPaginationType': 'bootstrap',
        'sDom': '<"top col-lg-12"f><"clear">rt<"bottom"lp<"clear">>',
        'aoColumns': columns,

        'oLanguage': {
            'oPaginate': {
                'sPrevious': '上一页',
                'sNext': '下一页'
            },
            'sSearch': '搜索',
            'sInfo': '共_TOTAL_条字段',
            'sLoadingRecords': '载入数据中...',
            'sProcessing': '载入中...',
            'sEmptyTable': '无正在运行Instance'
        },
        'fnCreatedRow': createRowCallBack,
        'fnInitComplete': initCompleteCallBack
    });
    return dTable;
}