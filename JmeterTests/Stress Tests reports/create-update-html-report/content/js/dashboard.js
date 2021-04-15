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

    var data = {"OkPercent": 41.9772, "KoPercent": 58.0228};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.2599941666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.02866, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.33164, 500, 1500, "Playlists Update Request"], "isController": false}, {"data": [0.05994, 500, 1500, "Update Controller"], "isController": true}, {"data": [0.3641, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.26187, 500, 1500, "Albums Update Request"], "isController": false}, {"data": [0.34811, 500, 1500, "Tracks Update Request"], "isController": false}, {"data": [0.20442, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [0.28855, 500, 1500, "Artists Update Request"], "isController": false}, {"data": [0.30467, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [0.31115, 500, 1500, "Genres Update Request"], "isController": false}, {"data": [0.27995, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.33687, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 500000, 290114, 58.0228, 710.8282179999844, 0, 11352, 1020.0, 2693.9000000000015, 2844.0, 3522.9900000000016, 2632.1469369706097, 3520.6798017105007, 367.9904847476956], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 50000, 32122, 64.244, 3900.2778000000044, 33, 24251, 4299.0, 8728.600000000006, 10305.0, 14109.980000000003, 275.91839437567944, 1991.6940695307458, 170.66860071090375], "isController": true}, {"data": ["Playlists Update Request", 50000, 28588, 57.176, 648.137360000007, 0, 7914, 437.0, 1867.0, 2750.0, 5606.0, 264.26781957907417, 327.4548488107287, 56.44159313689866], "isController": false}, {"data": ["Update Controller", 50000, 34643, 69.286, 3208.0062000000244, 6, 20223, 3863.0, 7224.9000000000015, 8498.850000000002, 11695.44000000009, 263.9163068607683, 1625.0063711045952, 205.7266426233413], "isController": true}, {"data": ["Tracks Create Request", 50000, 25124, 50.248, 670.7060399999959, 0, 11352, 542.5, 2166.0, 2833.0, 6044.980000000003, 264.2175461588053, 344.5076128506167, 31.451280100983947], "isController": false}, {"data": ["Albums Update Request", 50000, 32426, 64.852, 630.1492600000041, 0, 8831, 506.5, 1983.9000000000015, 2756.0, 5400.950000000008, 264.1268231353967, 337.5886073269441, 33.26541662869844], "isController": false}, {"data": ["Tracks Update Request", 50000, 27742, 55.484, 640.2852200000065, 0, 9422, 416.0, 1836.0, 2697.9500000000007, 5636.990000000002, 264.42294979665877, 307.0594823144015, 36.8862319845339], "isController": false}, {"data": ["Albums Create Request", 50000, 31814, 63.628, 1039.07624, 1, 10125, 587.0, 2895.0, 5241.0, 6815.970000000005, 288.03004729453374, 455.27811461291645, 25.26980989656841], "isController": false}, {"data": ["Artists Update Request", 50000, 30724, 61.448, 637.5381800000007, 0, 8955, 503.0, 1959.9000000000015, 2726.9000000000015, 5354.910000000014, 264.0654459801317, 327.83202145069635, 34.16455531213856], "isController": false}, {"data": ["Genres Create Request", 50000, 27998, 55.996, 707.0236, 0, 10204, 585.0, 1835.0, 2798.9500000000007, 6249.0, 276.0189238574197, 397.78866145312924, 37.60021427694083], "isController": false}, {"data": ["Genres Update Request", 50000, 29542, 59.084, 651.8961200000033, 0, 8786, 471.0, 1972.9000000000015, 2779.0, 5517.950000000008, 264.16729186259073, 326.86007723095884, 45.20335247280398], "isController": false}, {"data": ["Artists Create Request", 50000, 29722, 59.444, 752.6098200000047, 0, 10966, 665.0, 1734.9000000000015, 3145.9000000000015, 6567.990000000002, 280.3476310625175, 415.6623541316232, 27.314116379310345], "isController": false}, {"data": ["Playlists Create Request", 50000, 26434, 52.868, 730.8603400000007, 0, 10783, 617.0, 2318.0, 2964.0, 6502.930000000011, 268.1065777267779, 378.0422241887095, 47.75670408875936], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 6453, 2.2242980345657224, 1.2906], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 6, 0.0020681525193544607, 0.0012], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 283, 0.09754786049621873, 0.0566], "isController": false}, {"data": ["404", 35499, 12.236224380760666, 7.0998], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 247873, 85.43986157165804, 49.5746], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 500000, 290114, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 247873, "404", 35499, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 6453, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 283, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 6], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Playlists Update Request", 50000, 28588, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21786, "404", 6596, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 183, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 23, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Tracks Create Request", 50000, 25124, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 24802, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 297, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 24, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, null, null], "isController": false}, {"data": ["Albums Update Request", 50000, 32426, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 23993, "404", 8222, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 185, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 25, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1], "isController": false}, {"data": ["Tracks Update Request", 50000, 27742, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21019, "404", 6484, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 227, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 12, null, null], "isController": false}, {"data": ["Albums Create Request", 50000, 31814, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 28776, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 2974, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 62, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 2, null, null], "isController": false}, {"data": ["Artists Update Request", 50000, 30724, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 23228, "404", 7305, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 181, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 10, null, null], "isController": false}, {"data": ["Genres Create Request", 50000, 27998, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 27321, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 626, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 50, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, null, null], "isController": false}, {"data": ["Genres Update Request", 50000, 29542, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 22456, "404", 6892, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 184, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 10, null, null], "isController": false}, {"data": ["Artists Create Request", 50000, 29722, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 28595, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1098, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 29, null, null, null, null], "isController": false}, {"data": ["Playlists Create Request", 50000, 26434, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 25897, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 498, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 38, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
