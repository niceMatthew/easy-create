let datas = {
    entry: {},
    message: "",
    status: true,
    statusCode: null
};

module.exports = function exportData(value) {
    datas.entry.values = value;
    return datas;
}