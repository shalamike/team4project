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

    var data = {"OkPercent": 41.3296, "KoPercent": 58.6704};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.38675166666666666, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.33358, 500, 1500, "Albums Get Request"], "isController": false}, {"data": [0.38308, 500, 1500, "Genres Get Request"], "isController": false}, {"data": [0.49376, 500, 1500, "Tracks Get Request"], "isController": false}, {"data": [0.35559, 500, 1500, "Artists Get Request"], "isController": false}, {"data": [0.33036, 500, 1500, "Get Controller"], "isController": true}, {"data": [0.42414, 500, 1500, "Playlists Get Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 250000, 146676, 58.6704, 500.28230000000207, 0, 5505, 97.0, 1714.9000000000015, 2203.0, 3046.0, 1930.6361059841997, 2777.873045954931, 144.79331876829275], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Albums Get Request", 50000, 32516, 65.032, 494.9461600000004, 0, 4273, 574.0, 1170.0, 1477.9000000000015, 2965.0, 386.1540600237871, 605.1042266009947, 24.395131900573052], "isController": false}, {"data": ["Genres Get Request", 50000, 30347, 60.694, 504.37195999999693, 0, 5463, 534.0, 1606.4000000000233, 2243.0, 3572.970000000005, 386.36890503052314, 571.6740051604397, 27.43675774911135], "isController": false}, {"data": ["Tracks Get Request", 50000, 24363, 48.726, 485.25748000000254, 0, 5462, 374.0, 2056.0, 2470.0, 3700.0, 386.39876352395675, 478.552370616789, 35.79354382003478], "isController": false}, {"data": ["Artists Get Request", 50000, 31414, 62.828, 513.21316, 0, 5505, 615.0, 1213.9000000000015, 1619.0, 2924.0, 386.3450215580522, 588.2486430838445, 26.08580457316602], "isController": false}, {"data": ["Get Controller", 50000, 32516, 65.032, 2501.411519999999, 0, 11996, 3396.0, 5666.0, 6302.950000000001, 7380.980000000003, 385.85010495122856, 2775.8794187071708, 144.68940332622083], "isController": true}, {"data": ["Playlists Get Request", 50000, 28036, 56.072, 503.62274000000383, 0, 5505, 509.0, 1973.0, 2461.0, 3698.9900000000016, 386.36890503052314, 535.6964722104166, 31.160289969863225], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 146676, 100.0, 58.6704], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 250000, 146676, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 146676, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Albums Get Request", 50000, 32516, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 32516, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Genres Get Request", 50000, 30347, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 30347, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Tracks Get Request", 50000, 24363, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 24363, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Artists Get Request", 50000, 31414, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 31414, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Playlists Get Request", 50000, 28036, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 28036, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
