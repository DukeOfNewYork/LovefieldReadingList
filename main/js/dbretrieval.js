// retreieve goes through the books and adds them to the select dropdown on the Reading entry page
let retreieveBooks = function retreieveBooks() {
    _readingListScheme.readingListDataBase.select().from(_readingListScheme.bookTable).exec().then(function (rows) {
        let myCell = [],
            returnObj = {},
            _select = $('<select>');
        for (i = 0; i < rows.length; i++) {
            myCell[i] = rows[i];
            returnObj[rows[i].title] = rows[i].title;
            _select.append(
                $('<option></option>').val(rows[i].title).html(rows[i].title)
            );
        }
        _readingListScheme.books = returnObj;
        $('#mySelect').append(_select.html());
    });
};

//Finds the biggest number in all of the reading log ID's to make sure nothing is overwritten
let getReadingList = function getReadingList() {
    let selectQueryBuilder = _readingListScheme.readingListDataBase.select().from(_readingListScheme.readingRecordsTable).exec().then(function (rows) {
        let highestID = 0;
        for (let Key in rows) {
            let keyID = rows[Key].id;
            if (keyID > highestID) {
                highestID = keyID;
            }
        }
        _readingListScheme.numberOfReadingLogs = highestID;
    });
};

let retreieveReadingLogs = function retreieveReadingLogs() {
    return new Promise((resolve, reject) => {
        let selectQueryBuilder = _readingListScheme.readingListDataBase.select().from(_readingListScheme.readingRecordsTable).exec().then(function (rows) {
            {
                _readingListScheme.numberOfReadingLogs = rows.length;
                rows.sort(function(a,b) {return (a.dateRead > b.dateRead) ? 1 : ((b.dateRead < a.dateRead) ? -1 : 0);});
                rows.sort(function(a,b) {return (a.bookTitle > b.bookTitle) ? 1 : ((b.bookTitle < a.bookTitle) ? -1 : 0);});
                return resolve(rows);
            }
        });
    })
};