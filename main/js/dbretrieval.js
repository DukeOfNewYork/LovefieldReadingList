// retreieve goes through the books and adds them to the select dropdown on the Logging Reading page
function retreieve() {
    var selectQueryBuilder = this.readingListScheme.readingListDataBase.getSchema().table('Book');
    var q1 = this.readingListScheme.readingListDataBase.select(selectQueryBuilder.id, selectQueryBuilder.bookId, selectQueryBuilder.currentPage).from(selectQueryBuilder);
    this.readingListScheme.readingListDataBase.select().from(this.readingListScheme.bookTable).exec().then(function (rows) {
        var myCell = [];
        var returnObj = {};
        var _select = $('<select>');
        for (i = 0; i < rows.length; i++) {
            myCell[i] = rows[i];

            returnObj[rows[i].title] = rows[i].title;

            _select.append(
                $('<option></option>').val(rows[i].title).html(rows[i].title)
            );
        }
        this.readingListScheme.books = returnObj;
        $('#mySelect').append(_select.html());
    });
}