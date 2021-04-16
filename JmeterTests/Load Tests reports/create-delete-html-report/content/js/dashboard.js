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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6647916666666667, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.1691, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.73465, 500, 1500, "Albums Delete Request"], "isController": false}, {"data": [0.76415, 500, 1500, "Playlists Delete Request"], "isController": false}, {"data": [0.7502, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.8169, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [0.74055, 500, 1500, "Artists Delete Request"], "isController": false}, {"data": [0.7737, 500, 1500, "Tracks Delete Request"], "isController": false}, {"data": [0.09375, 500, 1500, "Delete Controller"], "isController": true}, {"data": [0.79675, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [0.81835, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.7457, 500, 1500, "Genres Delete Request"], "isController": false}, {"data": [0.7737, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 100000, 0, 0.0, 432.2137700000005, 0, 2402, 586.0, 627.0, 637.0, 666.0, 6860.592755214051, 2102.3964908068056, 1689.018978114709], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 10000, 0, 0.0, 2081.1111000000055, 9, 4722, 2212.0, 2982.0, 3044.0, 3414.0, 765.8727119552731, 1355.983619897373, 1078.5043463276404], "isController": true}, {"data": ["Albums Delete Request", 10000, 0, 0.0, 450.02390000000076, 1, 907, 519.0, 646.0, 686.0, 768.0, 745.5453664355476, 192.93898643107434, 156.5354040855886], "isController": false}, {"data": ["Playlists Delete Request", 10000, 0, 0.0, 449.7230999999994, 1, 925, 484.0, 635.0, 689.0, 776.9899999999998, 695.6037840845854, 180.01465115470228, 148.08752434613245], "isController": false}, {"data": ["Tracks Create Request", 10000, 0, 0.0, 440.8294999999993, 0, 988, 500.0, 650.0, 691.0, 779.0, 779.666302822392, 252.0210412443474, 186.54125409324809], "isController": false}, {"data": ["Albums Create Request", 10000, 0, 0.0, 419.8967999999992, 1, 2402, 405.0, 686.0, 779.0, 1053.9899999999998, 943.8414346389807, 305.0893699858424, 227.66487730061348], "isController": false}, {"data": ["Artists Delete Request", 10000, 0, 0.0, 448.72830000000135, 1, 1050, 510.0, 634.0, 676.0, 775.0, 723.2749891508752, 187.17565637205266, 152.5658180240127], "isController": false}, {"data": ["Tracks Delete Request", 10000, 0, 0.0, 434.5889000000009, 1, 937, 461.0, 629.0, 676.0, 773.0, 698.0802792321117, 180.65554101221642, 146.56958987783597], "isController": false}, {"data": ["Delete Controller", 10000, 0, 0.0, 2241.0265999999965, 128, 3285, 2394.0, 2953.0, 2990.0, 3054.0, 692.2810661128418, 895.7738404292143, 729.4641311872621], "isController": true}, {"data": ["Genres Create Request", 10000, 0, 0.0, 408.55700000000047, 0, 1064, 425.5, 640.8999999999996, 694.0, 809.9899999999998, 858.885167053165, 322.9206926908872, 265.88534956626296], "isController": false}, {"data": ["Artists Create Request", 10000, 0, 0.0, 391.1573999999988, 0, 896, 370.0, 653.0, 694.0, 776.0, 906.0433088701641, 281.3689181842892, 217.66274802935578], "isController": false}, {"data": ["Genres Delete Request", 10000, 0, 0.0, 457.9624000000013, 1, 928, 505.0, 634.0, 682.0, 781.9899999999998, 704.1261794113504, 182.2201538515702, 147.83899274750036], "isController": false}, {"data": ["Playlists Create Request", 10000, 0, 0.0, 420.67039999999895, 0, 947, 445.0, 632.0, 687.0, 775.0, 817.0602173380178, 357.4638450853828, 308.79131260723915], "isController": false}]}, function(index, item){
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
