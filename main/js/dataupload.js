//uploads data to the database, with param.tab for the table
//param.JSONData needs to be placed inside an array so that it can use map
let UploadData = function UploadData(param) {
    param.tab = _readingListScheme[param.tab];

    let rows = param.JSONData.map(function (obj) {
        return param.tab.createRow(obj);
    });

    let query = _readingListScheme.readingListDataBase.insertOrReplace().into(param.tab).values(rows);
    let tx = _readingListScheme.readingListDataBase.createTransaction();
    return tx.exec([query]);
};