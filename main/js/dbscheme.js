function createSchemes() {
    readingListScheme.schemaBuilder = lf.schema.create('SDGReading', 2);

    readingListScheme.schemaBuilder.createTable('readingRecordsTable').
    addColumn('id', lf.Type.INTEGER).
    addColumn('bookTitle', lf.Type.STRING).
    addColumn('currentPage', lf.Type.INTEGER).
    addForeignKey('fk_Book', {
        local: 'bookTitle',
        ref: 'Book.title',
        action: lf.ConstraintAction.CASCADE
    }).
    addPrimaryKey(['id']);

    readingListScheme.schemaBuilder.createTable('Book').
    addColumn('title', lf.Type.STRING).
    addColumn('author', lf.Type.STRING).
    addColumn('description', lf.Type.STRING).
    addColumn('length', lf.Type.INTEGER).
    addPrimaryKey(['title']);
}