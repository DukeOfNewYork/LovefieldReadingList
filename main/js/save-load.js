// const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
// let csvContent = "data:text/csv;charset=utf-8,";
// rows.forEach(function(rowArray){
//     let row = rowArray.join(",");
//     csvContent += row + "\r\n";
// });
// var encodedUri = encodeURI(csvContent);
// window.open(encodedUri);

let savecsv = function () {
    return new Promise((resolve, reject) => {
        let csvContent = "data:text/csv;charset=utf-8," + '\r\n';
        retreieveReadingLogs().then(function (rows) {
            for (let row in rows) {
                Object.entries(rows[row]).forEach(function
                    ([key, value]) {
                    csvContent += value + ',';
                });
                csvContent += '\r\n';
            }
            return resolve(csvContent)
        });
        // for (let row in rows) {
        //     let obj = rows[row];
        //     for (let key in obj) {
        //         csvContent += obj[key] + ',';
        //     }
        //     csvContent += '\r\n';
        // }
        // rows.forEach(function(rowArray){
        //     let row = rowArray.join(",");
        //     csvContent += row + "\r\n";
        // });
        // let encodedUri = encodeURI(csvContent);
        // window.open(encodedUri);
    })
};

let loadCSV = function (csv) {

};

let handleFileSelect = function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    // read the file metadata
    var output = ''
    output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
    output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
    output += ' - FileSize: ' + file.size + ' bytes<br />\n';
    output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';
    // read the file contents
    printTable(file);
    // post the results
    $('#list').append(output);
};

function printTable(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event){
        let books = [];
        let check = 1;
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);
        var html = '';
        let rows = [];
        let loadedLogs = [];
        for(var row in data) {
            html += '<tr>\r\n';
            for(var item in data[row]) {
                rows.push(data[row][item]);
                html += '<td>' + data[row][item] + '</td>\r\n';
            }
            html += '</tr>\r\n';
        }
        for (let i = 0, counts = rows.length / 5 - 1; i < counts; i++){
            check = rows.shift();
            loadedLogs.push({'id':parseInt(rows.shift()),'bookTitle':rows.shift(),'currentPage':parseInt(rows.shift()),'dateRead': new Date(rows.shift())});
        }
        // console.log(loadedLogs);
        books = bookStats(loadedLogs);
        for (let book in books){
            let bookInput = [{
                'title': books[book].title,
                'author': 'undefined',
                'description': 'undefined',
                'length': 0
            }];
            UploadData({'JSONData': bookInput, 'tab': 'bookTable'});
        }
        for (let log in loadedLogs){
            UploadData({'JSONData': [loadedLogs[log]], 'tab': 'readingRecordsTable'});
        }
        $('#contents').html(html);
        readingLogCurrentPage();
        retreieveBooks();
        displayReadingLogs().then(function (htmlData) {
            $('#history-all').html(htmlData.history);
        });
    };
    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
}