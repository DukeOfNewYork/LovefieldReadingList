
this.readingListScheme.schemaBuilder = lf.schema.create('SDGReading', 5);

this.readingListScheme.schemaBuilder.createTable('readingRecordsTable').
addColumn('id', lf.Type.INTEGER).
addColumn('bookId', lf.Type.INTEGER).
addColumn('currentPage', lf.Type.INTEGER).
addForeignKey('fk_Book', {
    local: 'bookId',
    ref: 'Book.id',
    action: lf.ConstraintAction.CASCADE
}).
addPrimaryKey(['id']);

this.readingListScheme.schemaBuilder.createTable('Book').
addColumn('id', lf.Type.INTEGER).
addColumn('book', lf.Type.STRING).
addColumn('author', lf.Type.STRING).
addColumn('description', lf.Type.STRING).
addColumn('length', lf.Type.INTEGER).
addPrimaryKey(['id']);
