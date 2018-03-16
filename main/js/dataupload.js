// connects to the database and allows a function to be operated while the connection is open
let connect = function connect() {
    createSchemes();
    return new Promise((resolve, reject) => {
        readingListScheme.schemaBuilder.connect().then(function (db) {
            readingListScheme.readingListDataBase = db;
            readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
            readingListScheme.bookTable = db.getSchema().table('Book');
            readingListScheme.connect = true;
            return resolve(readingListScheme.connect); // Yay! Everything went well!
        })
    });
};

//uploads data to the database, with param.tab for the table
//param.JSONData needs to be placed inside an array so that it can use map
function UploadData(param) {

    if (param.tab === 'bookTable') {
        param.tab = readingListScheme.bookTable;
    } else if (param.tab === 'readingRecordsTable') {
        param.tab = readingListScheme.readingRecordsTable;
    }

    var rows = param.JSONData.map(function (obj) {
        return param.tab.createRow(obj);
    });

    var query = readingListScheme.readingListDataBase.insertOrReplace().into(param.tab).values(rows);
    var tx = readingListScheme.readingListDataBase.createTransaction();
    return tx.exec([query]);
}
