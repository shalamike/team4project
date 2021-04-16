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

    var data = {"OkPercent": 0.8207457541434418, "KoPercent": 99.17925424585655};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [9.8598897207057E-4, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [7.984323276862129E-4, 500, 1500, "Create Controller"], "isController": true}, {"data": [0.0012804936864020567, 500, 1500, "Albums Get Request"], "isController": false}, {"data": [9.47007946133533E-4, 500, 1500, "Playlists Update Request"], "isController": false}, {"data": [7.257623234879406E-4, 500, 1500, "Update Controller"], "isController": true}, {"data": [8.455042160287899E-4, 500, 1500, "Playlists Delete Request"], "isController": false}, {"data": [0.0010707489469516333, 500, 1500, "Tracks Create Request"], "isController": false}, {"data": [0.0011456272689724135, 500, 1500, "Albums Create Request"], "isController": false}, {"data": [6.778421186344164E-4, 500, 1500, "Delete Controller"], "isController": true}, {"data": [9.530345449110028E-4, 500, 1500, "Genres Update Request"], "isController": false}, {"data": [0.0011277598578391817, 500, 1500, "Artists Create Request"], "isController": false}, {"data": [0.0012481375532166382, 500, 1500, "Artists Get Request"], "isController": false}, {"data": [8.439626315444024E-4, 500, 1500, "Genres Delete Request"], "isController": false}, {"data": [0.00118068304821421, 500, 1500, "Playlists Get Request"], "isController": false}, {"data": [0.0012125269495643042, 500, 1500, "Genres Get Request"], "isController": false}, {"data": [0.0011661760073001424, 500, 1500, "Tracks Get Request"], "isController": false}, {"data": [8.627557259332678E-4, 500, 1500, "Albums Delete Request"], "isController": false}, {"data": [9.87954906097965E-4, 500, 1500, "Albums Update Request"], "isController": false}, {"data": [9.38739980493431E-4, 500, 1500, "Tracks Update Request"], "isController": false}, {"data": [8.50068661494459E-4, 500, 1500, "Artists Delete Request"], "isController": false}, {"data": [8.366258136295544E-4, 500, 1500, "Tracks Delete Request"], "isController": false}, {"data": [9.716042920701387E-4, 500, 1500, "Artists Update Request"], "isController": false}, {"data": [0.0011000776909467196, 500, 1500, "Genres Create Request"], "isController": false}, {"data": [7.973667343812804E-4, 500, 1500, "Get Controller"], "isController": true}, {"data": [0.0010843519092105678, 500, 1500, "Playlists Create Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 18356720, 18206058, 99.17925424585655, 7581.621080508047, 0, 473773, 4093.0, 383643.5, 394579.4, 404943.75000000006, 1241.4054002803941, 5178.653778495188, 4.551205699023273], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Create Controller", 918049, 916323, 99.81199260605915, 38026.06333975748, 2, 1342248, 20479.0, 20644.0, 393717.10000000003, 416395.56000000006, 62.096718390652605, 784.9533525072435, 1.3172893802346075], "isController": true}, {"data": ["Albums Get Request", 922691, 905701, 98.15864682759451, 8038.845489985333, 0, 472952, 4093.0, 4124.0, 4145.0, 394974.6000000001, 62.39859790802044, 455.6293735278923, 0.2281415646452263], "isController": false}, {"data": ["Playlists Update Request", 916043, 914453, 99.82642736203431, 7411.341859498026, 0, 443276, 4093.0, 4125.0, 4145.0, 360579.45000000024, 62.08353543986797, 157.028924478505, 0.34692791593558714], "isController": false}, {"data": ["Update Controller", 915589, 914271, 99.85604894772655, 36608.592504935965, 4, 1372698, 20479.0, 20630.0, 365627.5000000001, 387873.5100000004, 62.05057100968728, 784.7978368793783, 1.2755911010967482], "isController": true}, {"data": ["Playlists Delete Request", 913656, 912339, 99.85585384433529, 7374.01421432163, 0, 441915, 4093.0, 4125.0, 4143.0, 361622.47000000026, 61.91989658601421, 156.64618833067183, 0.18629688318235751], "isController": false}, {"data": ["Tracks Create Request", 918049, 906012, 98.68884994156085, 7684.244904139199, 0, 470022, 4093.0, 4125.0, 4146.0, 389614.6700000002, 62.0975164416045, 156.98806526967283, 0.2220386654440828], "isController": false}, {"data": ["Albums Create Request", 920020, 907328, 98.62046477250495, 7685.371754961872, 0, 468941, 4093.0, 4125.0, 4147.0, 390754.72000000003, 62.23820356307323, 157.25404209635462, 0.23430468493727508], "isController": false}, {"data": ["Delete Controller", 913192, 912094, 99.87976241578988, 36626.09550017843, 5, 1407377, 20479.0, 20629.0, 366149.15, 388028.9000000002, 61.8878256390794, 782.9178616799511, 0.9112604917793922], "isController": true}, {"data": ["Genres Update Request", 916546, 914910, 99.82150377613344, 7398.767166078032, 0, 457270, 4093.0, 4125.0, 4145.0, 360571.7000000002, 62.115011302805954, 157.08477946939973, 0.2868132994110789], "isController": false}, {"data": ["Artists Create Request", 919522, 906789, 98.61525879750566, 7731.038416699048, 0, 466102, 4093.0, 4125.0, 4147.0, 390085.7100000002, 62.20688371196879, 157.157312645907, 0.23357624923587827], "isController": false}, {"data": ["Artists Get Request", 922174, 907012, 98.35584173919456, 7819.055366991375, 0, 473472, 4093.0, 4125.0, 4145.0, 393838.98, 62.364381373475254, 385.2758503378969, 0.2055958523085007], "isController": false}, {"data": ["Genres Delete Request", 914140, 912763, 99.84936661780472, 7355.097256437998, 0, 462161, 4093.0, 4125.0, 4145.0, 360630.9600000002, 61.95994570862612, 156.76233095635592, 0.18217201556301882], "isController": false}, {"data": ["Playlists Get Request", 921077, 907387, 98.51369646620206, 7807.92318448959, 0, 473773, 4093.0, 4124.0, 4145.0, 394055.7400000002, 62.290893224074814, 903.5572625303068, 0.18999173598795244], "isController": false}, {"data": ["Genres Get Request", 921629, 907175, 98.43168997503334, 7870.289519969472, 0, 473525, 4093.0, 4126.0, 4148.0, 393471.6600000002, 62.34907074664992, 658.0183345999562, 0.1960790565323412], "isController": false}, {"data": ["Tracks Get Request", 920530, 907280, 98.56061182145069, 7727.508614602742, 0, 469039, 4093.0, 4125.0, 4148.950000000001, 389993.89, 62.26413703264273, 425.24469264939086, 0.18125950725223353], "isController": false}, {"data": ["Albums Delete Request", 915091, 913671, 99.84482417595628, 7388.805971209598, 0, 460329, 4093.0, 4125.0, 4145.0, 359837.56000000006, 62.02430731499548, 156.89225172594703, 0.1850453393054768], "isController": false}, {"data": ["Albums Update Request", 917552, 915773, 99.80611453083858, 7315.280348143841, 0, 447462, 4093.0, 4125.0, 4145.0, 360506.99, 62.11856370522225, 157.11484930338318, 0.21910177086095647], "isController": false}, {"data": ["Tracks Update Request", 915589, 914083, 99.83551571720498, 7411.5546604426445, 0, 444340, 4093.0, 4125.0, 4144.0, 360682.6500000001, 62.05074342509038, 156.94383056621035, 0.218573138368077], "isController": false}, {"data": ["Artists Delete Request", 914632, 913246, 99.84846364439468, 7408.428565805491, 0, 446665, 4093.0, 4125.0, 4146.0, 361472.0, 61.99329742104434, 156.81083926833912, 0.18632193355470794], "isController": false}, {"data": ["Tracks Delete Request", 913192, 911887, 99.85709467450438, 7435.352323498062, 0, 459851, 4093.0, 4124.0, 4143.0, 359627.3500000001, 61.88796404773873, 156.5612622229927, 0.18410781736648954], "isController": false}, {"data": ["Artists Update Request", 917040, 915340, 99.81462095437494, 7416.882804458054, 0, 459242, 4093.0, 4125.0, 4144.0, 361036.83, 62.15477476959681, 157.18193690420944, 0.2222307199571022], "isController": false}, {"data": ["Genres Create Request", 919026, 906668, 98.65531551882101, 7642.190230744203, 0, 469453, 4093.0, 4125.0, 4146.0, 390042.4600000001, 62.164055568358535, 157.17466000480945, 0.2909155147800838], "isController": false}, {"data": ["Get Controller", 920530, 917818, 99.70538711394522, 38825.421843938326, 3, 1174991, 20479.0, 20650.0, 397259.0, 417580.88, 62.263644289686624, 2770.586924460001, 0.9874888258409715], "isController": true}, {"data": ["Playlists Create Request", 918521, 906241, 98.66306812800143, 7698.746623103927, 0, 468941, 4093.0, 4126.0, 4147.0, 391214.73000000004, 62.14354539866152, 157.16758085328496, 0.3568444167381453], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 17638409, 96.88208727007242, 96.08693165227776], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection timed out: connect", 106, 5.822237850719798E-4, 5.774452080763884E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: An established connection was aborted by the software in your host machine", 128, 7.03062683860504E-4, 6.97292326733752E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1609, 0.008837717643215242, 0.008765182450895368], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 1579, 0.008672937326685436, 0.008601754561817145], "isController": false}, {"data": ["500", 16367, 0.08989864802144429, 0.08916080868477592], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:8090 failed to respond", 67, 3.680093735832326E-4, 3.649889522746983E-4], "isController": false}, {"data": ["404", 118648, 0.651695166520946, 0.6463464061117672], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 429145, 2.357154964572781, 2.3378087152824687], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 18356720, 18206058, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 17638409, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 429145, "404", 118648, "500", 16367, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1609], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Albums Get Request", 922691, 905701, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 881780, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 22067, "500", 1683, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 88, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 78], "isController": false}, {"data": ["Playlists Update Request", 916043, 914453, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 880876, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21477, "404", 11929, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 83, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 60], "isController": false}, {"data": [], "isController": false}, {"data": ["Playlists Delete Request", 913656, 912339, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 879038, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21261, "404", 11870, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 80, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 68], "isController": false}, {"data": ["Tracks Create Request", 918049, 906012, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 882416, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21730, "500", 1683, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 87, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 83], "isController": false}, {"data": ["Albums Create Request", 920020, 907328, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 883863, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21616, "500", 1667, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 86, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 80], "isController": false}, {"data": [], "isController": false}, {"data": ["Genres Update Request", 916546, 914910, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 881323, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21375, "404", 12006, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 93, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 90], "isController": false}, {"data": ["Artists Create Request", 919522, 906789, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 883197, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21774, "500", 1639, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 89, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 74], "isController": false}, {"data": ["Artists Get Request", 922174, 907012, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 884124, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21122, "500", 1575, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 93, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 78], "isController": false}, {"data": ["Genres Delete Request", 914140, 912763, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 879622, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21254, "404", 11696, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 100, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 66], "isController": false}, {"data": ["Playlists Get Request", 921077, 907387, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 884346, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21243, "500", 1612, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 88, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 77], "isController": false}, {"data": ["Genres Get Request", 921629, 907175, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 884289, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21107, "500", 1589, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 91, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 80], "isController": false}, {"data": ["Tracks Get Request", 920530, 907280, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 884556, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 20957, "500", 1583, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 87, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 72], "isController": false}, {"data": ["Albums Delete Request", 915091, 913671, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 880141, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21476, "404", 11859, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 94, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 75], "isController": false}, {"data": ["Albums Update Request", 917552, 915773, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 881968, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 22038, "404", 11611, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 77, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 60], "isController": false}, {"data": ["Tracks Update Request", 915589, 914083, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 880627, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21344, "404", 11940, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 83, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 65], "isController": false}, {"data": ["Artists Delete Request", 914632, 913246, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 879719, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21409, "404", 11924, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 88, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 83], "isController": false}, {"data": ["Tracks Delete Request", 913192, 911887, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 878740, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21066, "404", 11902, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 72, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 72], "isController": false}, {"data": ["Artists Update Request", 917040, 915340, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 881782, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21478, "404", 11911, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 77, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 64], "isController": false}, {"data": ["Genres Create Request", 919026, 906668, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 883206, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21744, "500", 1535, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 91, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 71], "isController": false}, {"data": [], "isController": false}, {"data": ["Playlists Create Request", 918521, 906241, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:8090 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 882796, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 21607, "500", 1676, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset by peer", 73, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 72], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
