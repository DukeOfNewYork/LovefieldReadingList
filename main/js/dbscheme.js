function createSchemes() {
    _readingListScheme.schemaBuilder = lf.schema.create('SDGReading', 4);

    _readingListScheme.schemaBuilder.createTable('readingRecordsTable').
    addColumn('id', lf.Type.INTEGER).
    addColumn('bookTitle', lf.Type.STRING).
    addColumn('currentPage', lf.Type.INTEGER).
    addColumn('dateRead', lf.Type.DATE_TIME).
    addForeignKey('fk_Book', {
        local: 'bookTitle',
        ref: 'Book.title',
        action: lf.ConstraintAction.CASCADE
    }).
    addPrimaryKey(['id']);

    _readingListScheme.schemaBuilder.createTable('Book').
    addColumn('title', lf.Type.STRING).
    addColumn('author', lf.Type.STRING).
    addColumn('description', lf.Type.STRING).
    addColumn('length', lf.Type.INTEGER).
    addPrimaryKey(['title']);
}

let connect = function connect() {
    createSchemes();
    return new Promise((resolve, reject) => {
        _readingListScheme.schemaBuilder.connect().then(function (db) {
            _readingListScheme.readingListDataBase = db;
            _readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
            _readingListScheme.bookTable = db.getSchema().table('Book');
            _readingListScheme.connect = true;
            return resolve(_readingListScheme.connect); // Yay! Everything went well!
        })
    });
};