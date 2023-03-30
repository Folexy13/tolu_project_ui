const handleDateFmt = (date) => {
  let formattedDate;
  formattedDate = new Date(date).toISOString().slice(0, 10);
  return formattedDate;
};

const handleGreaterTimer = (start, stop) => {
  if (new Date(start).getTime() > new Date(stop).getTime() && (start || stop)) {
    alert("Start time can't be greater than stop time");
    return;
  } else return 1 + 1 === 2;
};

const handelFiterFn = (name, stockItem, tDate, arr) => {
  let filteredRecord = arr;
  const checkTime = handleGreaterTimer(tDate.fromDate, tDate.toDate);
  if (checkTime) {
    if (stockItem && name && (tDate.fromDate || tDate.fromDate)) {
      filteredRecord = filteredRecord.filter(
        (record) =>
          record.stockItem.description
            ?.toLowerCase()
            ?.includes(stockItem?.toLowerCase()) &&
          (record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
            record.collectorName
              ?.toLowerCase()
              ?.includes(name?.toLowerCase())) &&
          handleDateFmt(record.createdAt) >= tDate.fromDate &&
          handleDateFmt(record.createdAt) <= tDate.toDate
      );
    } else if (stockItem && name) {
      filteredRecord = filteredRecord.filter(
        (record) =>
          record.stockItem.itemDescription
            ?.toLowerCase()
            ?.includes(stockItem?.toLowerCase()) &&
          (record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
            record.collectorName?.toLowerCase()?.includes(name?.toLowerCase()))
      );
    } else if (stockItem && (tDate.fromDate || tDate.fromDate)) {
      filteredRecord = filteredRecord.filter(
        (record) =>
          record.stockItem.itemDescription
            ?.toLowerCase()
            ?.includes(stockItem?.toLowerCase()) &&
          handleDateFmt(record.createdAt) >= tDate.fromDate &&
          handleDateFmt(record.createdAt) <= tDate.toDate
      );
    } else if (name && (tDate.fromDate || tDate.fromDate)) {
      filteredRecord = filteredRecord.filter(
        (record) =>
          (record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
            record.collectorName
              ?.toLowerCase()
              ?.includes(name?.toLowerCase())) &&
          handleDateFmt(record.createdAt) >= tDate.fromDate &&
          handleDateFmt(record.createdAt) <= tDate.toDate
      );
    } else if (stockItem) {
      filteredRecord = filteredRecord.filter((record) =>
        record.stockItem.itemDescription
          ?.toLowerCase()
          ?.includes(stockItem?.toLowerCase())
      );
    } else if (name) {
      filteredRecord = filteredRecord.filter(
        (record) =>
          record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
          record.collectorName?.toLowerCase()?.includes(name?.toLowerCase())
      );
    } else if (tDate.fromDate || tDate.fromDate) {
      filteredRecord = filteredRecord.filter(
        (record) =>
          handleDateFmt(record.createdAt) >= tDate.fromDate &&
          handleDateFmt(record.createdAt) <= tDate.toDate
      );
    }
  }

  return filteredRecord;
  // setName("");
  // setStockName("");
};

module.exports = {
  handelFiterFn,
  handleGreaterTimer,
  handleDateFmt,
};
