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

    var data = {"OkPercent": 52.398, "KoPercent": 47.602};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.36015416666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.3077666666666667, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.30765, 500, 1500, "Playlists Update Request"], "isController": false}, {"data": [0.0058, 500, 1500, "Update Controller"], "isController": true}, {"data": [0.51915, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.36415, 500, 1500, "Albums Update Request"], "isController": false}, {"data": [0.35675, 500, 1500, "Tracks Update Request"], "isController": false}, {"data": [0.37321666666666664, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [0.26156666666666667, 500, 1500, "Artists Update Request"], "isController": false}, {"data": [0.50395, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [0.3100333333333333, 500, 1500, "Genres Update Request"], "isController": false}, {"data": [0.47733333333333333, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.5344833333333333, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 300000, 142806, 47.602, 840.7008666666754, 0, 13855, 680.5, 2339.0, 2970.9500000000007, 3311.9900000000016, 1767.107069017312, 2145.7051682175484, 279.19996597398523], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 30000, 15372, 51.24, 3465.617433333323, 6, 17870, 3957.0, 7986.700000000004, 9370.0, 14423.900000000016, 230.9593280623282, 1475.1250638746892, 171.37106208331087], "isController": true}, {"data": ["Playlists Update Request", 30000, 13531, 45.10333333333333, 1112.1486333333298, 0, 5685, 1192.5, 2916.9000000000015, 3817.0, 5070.0, 197.5802999268953, 230.47939438139255, 45.335732407532426], "isController": false}, {"data": ["Update Controller", 30000, 15372, 51.24, 4941.392100000003, 10, 17356, 4738.0, 10277.900000000001, 11454.95, 13451.0, 206.48500574716599, 1188.4299622218475, 173.03166555107407], "isController": true}, {"data": ["Tracks Create Request", 30000, 13467, 44.89, 599.2628333333366, 0, 5011, 402.0, 2194.0, 2749.0, 3448.9600000000064, 206.6172621835312, 247.4131343903241, 27.243515069716107], "isController": false}, {"data": ["Albums Update Request", 30000, 15372, 51.24, 788.7133999999987, 0, 5557, 544.0, 2194.9000000000015, 2787.9500000000007, 3652.9900000000016, 201.1775593138504, 238.91963511839296, 27.509760778925976], "isController": false}, {"data": ["Tracks Update Request", 30000, 13467, 44.89, 993.3997333333282, 0, 5637, 951.0, 2775.0, 3412.9500000000007, 5015.0, 193.4610176049526, 210.9333625036274, 28.593179441139487], "isController": false}, {"data": ["Albums Create Request", 30000, 15372, 51.24, 1045.7291333333376, 1, 13855, 596.0, 2419.9000000000015, 4088.0, 4152.0, 235.77676655742343, 318.73643362589297, 27.730755458232146], "isController": false}, {"data": ["Artists Update Request", 30000, 15076, 50.25333333333333, 1004.7213999999994, 0, 5592, 838.0, 2328.9000000000015, 3118.0, 4203.990000000002, 202.44007773698985, 233.80274433884756, 28.248008706610342], "isController": false}, {"data": ["Genres Create Request", 30000, 13957, 46.52333333333333, 582.2841999999996, 0, 5704, 319.0, 2160.0, 2466.0, 3228.9900000000016, 218.66526720895655, 275.85619268008907, 36.199572315792736], "isController": false}, {"data": ["Genres Update Request", 30000, 13957, 46.52333333333333, 1042.4081000000012, 1, 5590, 1077.0, 2505.0, 3576.0, 5011.0, 196.80519565716534, 227.54088192303277, 36.30119241397973], "isController": false}, {"data": ["Artists Create Request", 30000, 15076, 50.25333333333333, 708.060766666663, 0, 7435, 402.0, 1928.9000000000015, 2643.0, 4085.0, 226.96151489245804, 297.7194711938554, 27.123851480167342], "isController": false}, {"data": ["Playlists Create Request", 30000, 13531, 45.10333333333333, 530.2804666666664, 0, 5460, 407.0, 2140.9000000000015, 2712.850000000002, 3130.980000000003, 211.9137934688169, 267.9303351063454, 43.96592442756786], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 5146, 3.6034900494376987, 1.7153333333333334], "isController": false}, {"data": ["404", 9253, 6.479419632228338, 3.0843333333333334], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 128407, 89.91709031833396, 42.80233333333333], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 300000, 142806, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 128407, "404", 9253, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 5146, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Playlists Update Request", 30000, 13531, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 11970, "404", 1561, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Tracks Create Request", 30000, 13467, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13467, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Albums Update Request", 30000, 15372, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13244, "404", 2128, null, null, null, null, null, null], "isController": false}, {"data": ["Tracks Update Request", 30000, 13467, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 11760, "404", 1707, null, null, null, null, null, null], "isController": false}, {"data": ["Albums Create Request", 30000, 15372, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 12270, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 3102, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Update Request", 30000, 15076, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 12833, "404", 2243, null, null, null, null, null, null], "isController": false}, {"data": ["Genres Create Request", 30000, 13957, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13545, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 412, null, null, null, null, null, null], "isController": false}, {"data": ["Genres Update Request", 30000, 13957, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 12343, "404", 1614, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Create Request", 30000, 15076, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13445, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1631, null, null, null, null, null, null], "isController": false}, {"data": ["Playlists Create Request", 30000, 13531, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13530, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 1, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
