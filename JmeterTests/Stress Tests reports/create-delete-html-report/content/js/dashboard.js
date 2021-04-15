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

    var data = {"OkPercent": 37.1888, "KoPercent": 62.8112};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.21165166666666665, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.02538, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.19824, 500, 1500, "Albums Delete Request"], "isController": false}, {"data": [0.26894, 500, 1500, "Playlists Delete Request"], "isController": false}, {"data": [0.2983, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.19165, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [0.23128, 500, 1500, "Artists Delete Request"], "isController": false}, {"data": [0.28996, 500, 1500, "Tracks Delete Request"], "isController": false}, {"data": [0.03064, 500, 1500, "Delete Controller"], "isController": true}, {"data": [0.2535, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [0.22533, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.25225, 500, 1500, "Genres Delete Request"], "isController": false}, {"data": [0.27435, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 500000, 314056, 62.8112, 717.2803700000217, 0, 8843, 851.0, 2546.0, 2857.850000000002, 3712.0, 2368.983374474678, 3264.2973097454646, 261.7109952809851], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 50000, 34152, 68.304, 3649.9975000000186, 35, 19818, 3546.0, 6561.0, 7359.950000000001, 9132.970000000005, 256.95183180960896, 1971.3199549354665, 140.87959811288152], "isController": true}, {"data": ["Albums Delete Request", 50000, 34403, 68.806, 724.6960400000029, 1, 6980, 506.0, 1914.0, 2432.9500000000007, 3268.850000000024, 238.1757641869394, 318.99073150178157, 23.447841107886475], "isController": false}, {"data": ["Playlists Delete Request", 50000, 31086, 62.172, 693.5455199999924, 0, 7152, 578.0, 1870.9000000000015, 2417.9500000000007, 3536.0, 237.67986423726154, 276.6673465301117, 28.19259671045126], "isController": false}, {"data": ["Tracks Create Request", 50000, 27772, 55.544, 702.5838200000052, 0, 6682, 499.0, 1901.0, 2403.0, 3367.980000000003, 239.742612331401, 336.9001883328059, 25.50009185138835], "isController": false}, {"data": ["Albums Create Request", 50000, 33905, 67.81, 835.361779999998, 1, 8437, 452.0, 1405.0, 1752.0, 2698.9400000000096, 264.1058959000201, 436.7910046274654, 20.506713778206507], "isController": false}, {"data": ["Artists Delete Request", 50000, 32966, 65.932, 713.2403200000015, 0, 6950, 507.0, 1940.9000000000015, 2451.9500000000007, 3437.980000000003, 237.7533261690331, 303.82808209295445, 25.051650052662364], "isController": false}, {"data": ["Tracks Delete Request", 50000, 30190, 60.38, 673.7619999999952, 0, 6982, 570.0, 1770.0, 2349.0, 3623.9900000000016, 237.83588372679316, 263.6418853815363, 29.205377863246742], "isController": false}, {"data": ["Delete Controller", 50000, 36330, 72.66, 3522.808460000003, 14, 12358, 4002.0, 6907.0, 7599.0, 8833.960000000006, 237.51615109827466, 1450.5998507507886, 132.16996778241858], "isController": true}, {"data": ["Genres Create Request", 50000, 30562, 61.124, 668.2296800000049, 0, 7110, 572.0, 1764.0, 2128.800000000003, 3401.970000000005, 244.02623770107763, 374.6467338918281, 29.368205013153016], "isController": false}, {"data": ["Artists Create Request", 50000, 32038, 64.076, 750.446319999999, 0, 8661, 551.0, 1932.0, 2508.0, 3667.0, 249.08213234231854, 391.25633563755065, 21.496235590598644], "isController": false}, {"data": ["Genres Delete Request", 50000, 31986, 63.972, 717.562800000006, 0, 8843, 561.0, 1914.9000000000015, 2467.9500000000007, 3528.900000000016, 237.7374997622625, 289.472829352617, 26.44573374113239], "isController": false}, {"data": ["Playlists Create Request", 50000, 29148, 58.296, 693.3754199999988, 0, 8684, 512.0, 1825.0, 2297.9500000000007, 3376.970000000005, 241.03936172777017, 363.1915852405573, 37.990646919516955], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 2604, 0.8291514889064371, 0.5208], "isController": false}, {"data": ["404", 43916, 13.983493389713937, 8.7832], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 267536, 85.18735512137962, 53.5072], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 500000, 314056, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 267536, "404", 43916, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 2604, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Albums Delete Request", 50000, 34403, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 26284, "404", 8087, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 32, null, null, null, null], "isController": false}, {"data": ["Playlists Delete Request", 50000, 31086, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21874, "404", 9206, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 6, null, null, null, null], "isController": false}, {"data": ["Tracks Create Request", 50000, 27772, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 27755, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 17, null, null, null, null, null, null], "isController": false}, {"data": ["Albums Create Request", 50000, 33905, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 32268, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1637, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Delete Request", 50000, 32966, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 24767, "404", 8183, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 16, null, null, null, null], "isController": false}, {"data": ["Tracks Delete Request", 50000, 30190, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 20472, "404", 9709, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 9, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Genres Create Request", 50000, 30562, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 30410, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 152, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Create Request", 50000, 32038, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 31369, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 669, null, null, null, null, null, null], "isController": false}, {"data": ["Genres Delete Request", 50000, 31986, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 23248, "404", 8731, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 7, null, null, null, null], "isController": false}, {"data": ["Playlists Create Request", 50000, 29148, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 29089, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 59, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
