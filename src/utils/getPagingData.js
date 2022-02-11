const getPagingData = ({count: total, rows: data}, per_page, current_page) => {
  // cari firts item
  // misal: total 12, per page 5, page 3
  // 0 -> 4, 5 -> 9, 10 -> 11
  // page 1 -> (5 * 1) - 5 = 0
  // page 2 -> (5 * 2) - 5 = 5
  // page 3 -> (5 * 3) - 5 = 10

  return {
    total,
    per_page,
    current_page,
    first_item: per_page * current_page - per_page,
    data,
    last_page: Math.ceil(total / per_page),
  };
};

module.exports = getPagingData;
