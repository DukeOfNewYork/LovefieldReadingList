
connect();
function connect() {
    this.readingListScheme.schemaBuilder.connect().then(function (db) {
        this.readingListScheme.readingListDataBase = db;
        this.readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
        this.readingListScheme.bookTable = db.getSchema().table('Book');
        retreieve();
    })
}

function UploadData(JSONData, table) {

    console.log(JSONData);
    var rows = JSONData.map(function (obj) {
        console.log(obj);
        return table.createRow(obj);
    });

    var query = this.readingListScheme.readingListDataBase.insertOrReplace().into(table).values(rows);

    var tx = this.readingListScheme.readingListDataBase.createTransaction();

    return tx.exec([query]);
}
