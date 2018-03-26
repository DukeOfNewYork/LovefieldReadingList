//Retrieves all reading logs from the database and finds the highest page read then displays them on the history ID
let readingLogCurrentPage = function readingLogCurrentPage() {
    retreieveReadingLogs().then(function (rows) {
        let history = $('<table></table>').addClass('history'),
            bookInformation = {},
            currentBook = rows[0].bookTitle,
            currentPage = 0,
            row;

        for (let i = 0; i < _readingListScheme.numberOfReadingLogs; i++) {
            if (currentBook !== rows[i].bookTitle) {
                currentBook = rows[i].bookTitle;
            }
            bookInformation[currentBook] = bookInformation[currentBook] || {};
            bookInformation[currentBook]['highestPageCount'] = bookInformation[currentBook]['highestPageCount'] || 0;
            currentPage = bookInformation[currentBook]['highestPageCount'];
            if (rows[i].currentPage > currentPage) {
                currentPage = rows[i].currentPage;
            }
            bookInformation[currentBook] = {'title': currentBook, 'highestPageCount': currentPage};
        }
        console.log(bookInformation);
        for (let key in bookInformation) {
            let obj = bookInformation[key];
            for (let prop in obj) {
                row = $('<tr></tr>').text(`${prop}: ${obj[prop]}`);
                history.append(row);
            }
        }
        $('#history').html(history);
    })
};

//Retrieves all reading logs from the database and sorts them before displaying them on the history ID
let displayReadingLogs = function displayReadingLogs() {
    retreieveReadingLogs().then(function (rows) {
        let history = $('<table></table>').addClass('history'),
            currentBook = "",
            row;
        for (let i = 0; i < _readingListScheme.numberOfReadingLogs; i++) {
            if (currentBook !== rows[i].bookTitle) {
                currentBook = rows[i].bookTitle;
                row = $('<tr></tr>').text(`Book:  ${currentBook}`);
            }
            row.append($('<tr></tr>').text(` page: ${rows[i].currentPage} Date: ${rows[i].dateRead.toDateString()}`));
            history.append(row);

        }
        $('#history').html(history);
    })
};

