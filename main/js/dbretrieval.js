// retreieve goes through the books and adds them to the select dropdown on the Logging Reading page
function retreieveBooks() {
    // var selectQueryBuilder = readingListScheme.readingListDataBase.getSchema().table('Book');
    // var q1 = readingListScheme.readingListDataBase.select(selectQueryBuilder.id, selectQueryBuilder.bookId, selectQueryBuilder.currentPage).from(selectQueryBuilder);
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
    retreieveReading()
}

function retreieveReading() {

    var selectQueryBuilder = readingListScheme.readingListDataBase.select().from(readingListScheme.readingRecordsTable).exec().then(function (rows) {
        readingListScheme.numberOfReadingLogs = rows.length;
        var history = $('<table></table>').addClass('history');
        for (i = 0; i < rows.length; i++) {
            var row = $('<tr></tr>').text('Book: ' + rows[i].bookTitle + ' page: ' + rows[i].currentPage);
            history.append(row);
        }
        $('#history').html(history);
    });
    console.log(selectQueryBuilder);
}