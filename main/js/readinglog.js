//Retrieves all reading logs from the database and displays them on the history ID
let readingLogCurrentPage = function displayReadingLogs() {
    retreieveReadingLogs().then(function (rows) {
        readingListScheme.numberOfReadingLogs = rows.length;
        let history = $('<table></table>').addClass('history');
        let bookInformation = {};
        let currentBook = "";
        let currentPage = 0;
        let row;
        for (i = 0; i < rows.length; i++) {
            if (currentBook !== rows[i].bookTitle) {
                currentPage = 0;
                currentBook = rows[i].bookTitle;
                bookInformation[currentBook] = {'title': currentBook};
                // row = $('<tr></tr>').text('Book: ' + currentBook);
            }
            if (currentPage < parseInt(rows[i].currentPage)) {
                currentPage = rows[i].currentPage;
                bookInformation[currentBook]['highestPageCount'] = currentPage;
            }
            // row.append($('<tr></tr>').text(' page: ' + rows[i].currentPage + ' Date: ' + rows[i].dateRead));
            // history.append(row);

        }
        for (let key in bookInformation) {
            let obj = bookInformation[key];
            for (let prop in obj) {
                row = $('<tr></tr>').text(prop + ': ' + obj[prop]);
                history.append(row);
            }
        }
        console.log(bookInformation);
        $('#history').html(history);
    })
};

//Retrieves all reading logs from the database and displays them on the history ID
let displayReadingLogs = function displayReadingLogs() {
    retreieveReadingLogs().then(function (rows) {
        readingListScheme.numberOfReadingLogs = rows.length;
        let history = $('<table></table>').addClass('history');
        let bookInformation = {};
        let currentBook = "";
        let row;
        for (i = 0; i < rows.length; i++) {
            if (currentBook !== rows[i].bookTitle) {
                currentBook = rows[i].bookTitle;
                bookInformation[currentBook] = {'title': currentBook};
                row = $('<tr></tr>').text('Book: ' + currentBook);
            }
            row.append($('<tr></tr>').text(' page: ' + rows[i].currentPage + ' Date: ' + rows[i].dateRead));
            history.append(row);

        }
        $('#history').html(history);
    })
};

