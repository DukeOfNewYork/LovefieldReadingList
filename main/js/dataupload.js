function connect(action, param) {
    this.readingListScheme.schemaBuilder.connect().then(function (db) {
        this.readingListScheme.readingListDataBase = db;
        this.readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
        this.readingListScheme.bookTable = db.getSchema().table('Book');
        if (param.tab === 'bookTable'){
            param.tab = this.readingListScheme.bookTable;
        }
        if (action) {
            action(param);
        }
    });
}

function UploadData(param) {

    var rows = param.JSONData.map(function (obj) {
        console.log(obj);
        return param.tab.createRow(obj);
    });
    console.log(param);
    var query = this.readingListScheme.readingListDataBase.insertOrReplace().into(param.tab).values(rows);

    var tx = this.readingListScheme.readingListDataBase.createTransaction();

    return tx.exec([query]);
}
