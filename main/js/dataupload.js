// connects to the database and allows a function to be operated while the connection is open
let connect = function connect() {
    createSchemes();
    return new Promise((resolve, reject) => {
        _readingListScheme.schemaBuilder.connect().then(function (db) {
            _readingListScheme.readingListDataBase = db;
            _readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
            _readingListScheme.bookTable = db.getSchema().table('Book');
            _readingListScheme.connect = true;
            return resolve(_readingListScheme.connect);
        })
    });
};

//uploads data to the database, with param.tab for the table
//param.JSONData needs to be placed inside an array so that it can use map
let UploadData = function UploadData(param) {
    param.tab = _readingListScheme[param.tab];

    let rows = param.JSONData.map(function (obj) {
        return param.tab.createRow(obj);
    });

    let query = _readingListScheme.readingListDataBase.insertOrReplace().into(param.tab).values(rows);
    let tx = _readingListScheme.readingListDataBase.createTransaction();
    return tx.exec([query]);
};
