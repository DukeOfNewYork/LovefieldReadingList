var schemaBuilder = lf.schema.create('SDGReading', 3);

schemaBuilder.createTable('ReadingRecord').
addColumn('id', lf.Type.INTEGER).
addColumn('bookId', lf.Type.INTEGER).
addColumn('currentPage', lf.Type.INTEGER).
addForeignKey('fk_Book', {
    local: 'bookId',
    ref: 'Book.id',
    action: lf.ConstraintAction.CASCADE
}).
addPrimaryKey(['id']);

schemaBuilder.createTable('Book').
addColumn('id', lf.Type.INTEGER).
addColumn('book', lf.Type.STRING).
addColumn('author', lf.Type.STRING).
addColumn('description', lf.Type.STRING).
addColumn('length', lf.Type.INTEGER).
addPrimaryKey(['id']);

var todoDb;
var ReadingRecord;
var bookDB;
schemaBuilder.connect().then(function (db) {
    todoDb = db;
    ReadingRecord = db.getSchema().table('ReadingRecord');
    bookDB = db.getSchema().table('Book');
    var row = RRrawJSON.map(function (obj) {
        return ReadingRecord.createRow(obj);
    });

    var bookRow = BLrawJSON.map(function (obj) {
        return bookDB.createRow(obj);
    });
    var q1 = todoDb.insertOrReplace().into(ReadingRecord).values(row);
    var q2 = todoDb.insertOrReplace().into(bookDB).values(bookRow);

    var tx = todoDb.createTransaction();

    db.select().from(bookDB).exec().then(function(rows) {
        var myCell = [];
        for (i = 0; i < rows.length; i++) {
            myCell[i] = rows[i];
            console.log(rows[i])
        }
        console.log(myCell);
    });

    return tx.exec([q2, q1]);
}).then(function (results) {

    // var selectQueryBuilder = todoDb.getSchema().table('Book');
    // console.log(selectQueryBuilder);
    // var q1 = todoDb.
    // select(selectQueryBuilder.id, selectQueryBuilder.bookId, selectQueryBuilder.currentPage).
    // from(selectQueryBuilder);
    // console.log(q1);
    // readingListDB.select().from(bookTable).exec().then(function(rows) {
    //     var myCell = [];
    //     for (i = 0; i < rows.length; i++) {
    //         myCell[i] = rows[i];
    //         console.log(rows[i])
    //     }
    //     console.log(myCell);
    // });
    results[0].forEach(function (row) {
        console.log(row['book'], 'before', row['author']);
    });
    results[1].forEach(function (row) {
        console.log(row['bookId'], 'ID and page', row['currentPage']);
    });
});
