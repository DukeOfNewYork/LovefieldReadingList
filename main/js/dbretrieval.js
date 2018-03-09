// retreieve goes through the books and adds them to the select dropdown on the Logging Reading page
function retreieve() {
    var selectQueryBuilder = readingListScheme.readingListDataBase.getSchema().table('Book');
    var q1 = readingListScheme.readingListDataBase.select(selectQueryBuilder.id, selectQueryBuilder.bookId, selectQueryBuilder.currentPage).from(selectQueryBuilder);
    readingListScheme.readingListDataBase.select().from(readingListScheme.bookTable).exec().then(function (rows) {
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
        readingListScheme.books = returnObj;
        $('#mySelect').append(_select.html());
    });
}