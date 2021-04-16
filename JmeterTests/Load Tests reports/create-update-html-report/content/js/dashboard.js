/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6347833333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.1149, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.71395, 500, 1500, "Playlists Update Request"], "isController": false}, {"data": [0.04415, 500, 1500, "Update Controller"], "isController": true}, {"data": [0.7399, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.7177, 500, 1500, "Albums Update Request"], "isController": false}, {"data": [0.73645, 500, 1500, "Tracks Update Request"], "isController": false}, {"data": [0.7987, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [0.6979, 500, 1500, "Artists Update Request"], "isController": false}, {"data": [0.7835, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [0.7001, 500, 1500, "Genres Update Request"], "isController": false}, {"data": [0.8056, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.76455, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 100000, 0, 0.0, 499.7395200000038, 0, 1175, 660.0, 722.0, 729.0, 762.0, 6616.819956328988, 2335.8498788294846, 1876.1314503655794], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 10000, 0, 0.0, 2364.941800000005, 12, 3780, 2433.0, 3310.0, 3381.0, 3594.0, 744.3799315170463, 1313.8938223444247, 1048.2381457495906], "isController": true}, {"data": ["Playlists Update Request", 10000, 0, 0.0, 526.4208999999994, 1, 1110, 564.0, 712.0, 733.0, 960.9799999999996, 697.4473427256243, 304.3767817600084, 266.2351302047008], "isController": false}, {"data": ["Update Controller", 10000, 0, 0.0, 2632.453500000002, 329, 3837, 2830.0, 3326.0, 3376.0, 3558.99, 684.2285323297982, 1207.7214922596647, 976.5270858279165], "isController": true}, {"data": ["Tracks Create Request", 10000, 0, 0.0, 504.24050000000136, 0, 1159, 526.0, 716.0, 743.9499999999989, 1001.9899999999998, 776.940408670655, 250.29727075402064, 185.88906262139693], "isController": false}, {"data": ["Albums Update Request", 10000, 0, 0.0, 524.5012999999997, 0, 1151, 585.0, 717.0, 737.0, 984.9899999999998, 742.555877329769, 239.22003206913195, 181.9330063766986], "isController": false}, {"data": ["Tracks Update Request", 10000, 0, 0.0, 505.7097000000009, 1, 1167, 525.0, 713.0, 734.0, 958.0, 701.0164738871364, 225.83779683666316, 170.38629841395021], "isController": false}, {"data": ["Albums Create Request", 10000, 0, 0.0, 464.509699999999, 2, 1155, 453.0, 688.0, 739.0, 1010.9799999999996, 945.8948164964056, 304.7272201924896, 228.16017546348849], "isController": false}, {"data": ["Artists Update Request", 10000, 0, 0.0, 536.9134000000025, 1, 1171, 595.0, 718.0, 735.0, 964.9899999999998, 721.136511141559, 223.16456673216987, 175.9808301633374], "isController": false}, {"data": ["Genres Create Request", 10000, 0, 0.0, 465.9014999999995, 0, 1109, 466.0, 688.0, 762.0, 1035.9899999999998, 871.0042679209128, 326.532525204686, 269.6370634091107], "isController": false}, {"data": ["Genres Update Request", 10000, 0, 0.0, 538.9081000000018, 1, 1140, 584.0, 716.0, 734.0, 960.9799999999996, 699.4474365251452, 262.2172429093516, 219.18483226376162], "isController": false}, {"data": ["Artists Create Request", 10000, 0, 0.0, 447.8947999999996, 0, 1110, 442.0, 682.0, 739.9499999999989, 997.0, 926.2689885142645, 286.64533594618376, 222.52165153760654], "isController": false}, {"data": ["Playlists Create Request", 10000, 0, 0.0, 482.39530000000065, 0, 1175, 483.0, 702.0, 740.0, 1013.9899999999998, 819.4706219782021, 357.62962360689994, 309.70227607965256], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 100000, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
