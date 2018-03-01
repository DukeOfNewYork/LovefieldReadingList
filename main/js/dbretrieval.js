// $('#display').html("Test");
function retreieve() {


    var selectQueryBuilder = this.readingListScheme.readingListDataBase.getSchema().table('Book');
    console.log(selectQueryBuilder);
    var q1 = this.readingListScheme.readingListDataBase.select(selectQueryBuilder.id, selectQueryBuilder.bookId, selectQueryBuilder.currentPage).from(selectQueryBuilder);
    console.log(q1);
    this.readingListScheme.readingListDataBase.select().from(this.readingListScheme.bookTable).exec().then(function (rows) {
        var myCell = [];
        for (i = 0; i < rows.length; i++) {
            myCell[i] = rows[i];
            console.log(rows[i])
        }
        console.log(myCell);
    });
}