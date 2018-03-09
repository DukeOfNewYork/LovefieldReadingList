// connects to the database and allows a function to be operated while the connection is open
function connect(action, param) {
    readingListScheme.schemaBuilder.connect().then(function (db) {
        readingListScheme.readingListDataBase = db;
        readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
        readingListScheme.bookTable = db.getSchema().table('Book');
        if (param.tab === 'bookTable'){
            param.tab = readingListScheme.bookTable;
        } else if (param.tab === 'readingRecordsTable'){
            param.tab = readingListScheme.readingRecordsTable;
        }
        if (action) {
            action(param);
        }
    });
}

//uploads data to the database, with param.tab for the table
function UploadData(param) {

    var rows = param.JSONData.map(function (obj) {
        console.log(obj);
        return param.tab.createRow(obj);
    });
    console.log(param);
    var query = readingListScheme.readingListDataBase.insertOrReplace().into(param.tab).values(rows);

    var tx = readingListScheme.readingListDataBase.createTransaction();

    return tx.exec([query]);
}
