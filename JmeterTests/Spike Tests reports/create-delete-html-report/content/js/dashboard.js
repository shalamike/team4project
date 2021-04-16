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

    var data = {"OkPercent": 50.652, "KoPercent": 49.348};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.33024027777777776, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.3870166666666667, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.20223333333333332, 500, 1500, "Playlists Update Request"], "isController": false}, {"data": [0.0022, 500, 1500, "Update Controller"], "isController": true}, {"data": [0.5076666666666667, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.35515, 500, 1500, "Albums Update Request"], "isController": false}, {"data": [0.3487166666666667, 500, 1500, "Tracks Update Request"], "isController": false}, {"data": [0.404, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [0.15848333333333334, 500, 1500, "Artists Update Request"], "isController": false}, {"data": [0.4898666666666667, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [0.12846666666666667, 500, 1500, "Genres Update Request"], "isController": false}, {"data": [0.48785, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.49123333333333336, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 300000, 148044, 49.348, 981.406119999996, 0, 23913, 1004.5, 2863.0, 3548.0, 4106.990000000002, 1669.0775564704575, 2081.121868958287, 255.05332789724045], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 30000, 15465, 51.55, 3732.5433333333435, 4, 24049, 3232.5, 8698.500000000007, 9855.800000000003, 12079.970000000005, 213.82294035052706, 1404.4059302678845, 152.2619863906153], "isController": true}, {"data": ["Playlists Update Request", 30000, 14861, 49.53666666666667, 1335.578700000005, 0, 5493, 1134.0, 3009.9000000000015, 3422.0, 4142.980000000003, 195.00653271884607, 236.4987938033424, 42.894137148906985], "isController": false}, {"data": ["Update Controller", 30000, 15465, 51.55, 6081.518066666629, 9, 18084, 6996.5, 9802.0, 11143.0, 13514.94000000001, 203.20522372895132, 1199.0359909789581, 165.81865748870518], "isController": true}, {"data": ["Tracks Create Request", 30000, 13295, 44.31666666666667, 701.0952000000009, 0, 5712, 361.5, 2991.800000000003, 3765.9500000000007, 4410.0, 203.28370952113133, 241.2242118203548, 27.082822918290113], "isController": false}, {"data": ["Albums Update Request", 30000, 15465, 51.55, 879.1981333333332, 0, 5509, 577.0, 2983.0, 3609.0, 4673.980000000003, 204.6273054676416, 242.69541134990928, 28.108311417606814], "isController": false}, {"data": ["Tracks Update Request", 30000, 13295, 44.31666666666667, 988.0442333333339, 0, 5456, 849.0, 2432.0, 3172.9500000000007, 4151.0, 196.17716105491, 222.75689935662064, 27.944548941705957], "isController": false}, {"data": ["Albums Create Request", 30000, 15465, 51.55, 828.5228999999968, 1, 23913, 258.0, 1486.0, 2125.0, 4092.0, 216.45021645021646, 291.43986601506134, 25.29582234172078], "isController": false}, {"data": ["Artists Update Request", 30000, 15225, 50.75, 1384.2792999999858, 0, 5480, 944.0, 3379.0, 3919.0, 4895.0, 199.31171022734821, 233.40316726031105, 27.48767355690017], "isController": false}, {"data": ["Genres Create Request", 30000, 15176, 50.586666666666666, 755.5821333333342, 0, 5402, 262.0, 2386.800000000003, 3059.7500000000036, 4070.9600000000064, 213.30299690710655, 288.3308262824842, 32.6287483557894], "isController": false}, {"data": ["Genres Update Request", 30000, 15176, 50.586666666666666, 1494.4175999999968, 0, 5627, 1449.0, 3225.9000000000015, 3588.9000000000015, 4652.930000000011, 193.83977204442806, 231.69117730200884, 34.567688848397914], "isController": false}, {"data": ["Artists Create Request", 30000, 15225, 50.75, 712.297800000003, 0, 5422, 262.0, 2020.0, 2794.9500000000007, 4003.950000000008, 214.37146287086264, 283.53087886940494, 25.363451742304065], "isController": false}, {"data": ["Playlists Create Request", 30000, 14861, 49.53666666666667, 735.045199999998, 0, 5702, 273.0, 2189.0, 2882.850000000002, 4208.0, 208.7203356222997, 283.9912888611175, 39.80629040695247], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 6802, 4.594579989732782, 2.267333333333333], "isController": false}, {"data": ["404", 9567, 6.462267974385993, 3.189], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 131675, 88.94315203588123, 43.891666666666666], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 300000, 148044, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 131675, "404", 9567, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 6802, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Playlists Update Request", 30000, 14861, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 12735, "404", 2126, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Tracks Create Request", 30000, 13295, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13295, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Albums Update Request", 30000, 15465, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13210, "404", 2255, null, null, null, null, null, null], "isController": false}, {"data": ["Tracks Update Request", 30000, 13295, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 12480, "404", 815, null, null, null, null, null, null], "isController": false}, {"data": ["Albums Create Request", 30000, 15465, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13556, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1909, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Update Request", 30000, 15225, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13078, "404", 2147, null, null, null, null, null, null], "isController": false}, {"data": ["Genres Create Request", 30000, 15176, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13469, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1707, null, null, null, null, null, null], "isController": false}, {"data": ["Genres Update Request", 30000, 15176, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 12952, "404", 2224, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Create Request", 30000, 15225, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13518, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1707, null, null, null, null, null, null], "isController": false}, {"data": ["Playlists Create Request", 30000, 14861, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13382, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1479, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
