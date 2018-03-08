createSchemes();
connect();

function connect() {
    this.readingListScheme.schemaBuilder.connect().then(function (db) {


        this.readingListScheme.readingListDataBase = db;
        this.readingListScheme.readingRecordsTable = db.getSchema().table('readingRecordsTable');
        this.readingListScheme.bookTable = db.getSchema().table('Book');
        // if(param.tab === 'bookTable'){
        //     param.tab = this.readingListScheme.bookTable
        // }
        // var testo = func(param);
    })
}

function createSchemes() {

    this.readingListScheme.schemaBuilder = lf.schema.create('SDGReading', 2);

    this.readingListScheme.schemaBuilder.createTable('readingRecordsTable').
    addColumn('id', lf.Type.INTEGER).
    addColumn('bookTitle', lf.Type.STRING).
    addColumn('currentPage', lf.Type.INTEGER).
    addForeignKey('fk_Book', {
        local: 'bookTitle',
        ref: 'Book.title',
        action: lf.ConstraintAction.CASCADE
    }).
    addPrimaryKey(['id']);

    this.readingListScheme.schemaBuilder.createTable('Book').
    addColumn('title', lf.Type.STRING).
    addColumn('author', lf.Type.STRING).
    addColumn('description', lf.Type.STRING).
    addColumn('length', lf.Type.INTEGER).
    addPrimaryKey(['title']);
}
