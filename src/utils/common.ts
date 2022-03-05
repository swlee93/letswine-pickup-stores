export const filterBy = (dataSource: any[] = [], filterKey: string = '', filterValue: string = '') => {
  if (filterKey && filterKey) {
    return dataSource.filter((data: any) => String(data[filterKey]).includes(filterValue));
  } else {
    return dataSource;
  }
};

export const getUniqueValuesFromObject = (dataSource: any[] = [], objectKey: string = '') => {
  return Object.keys(
    dataSource.reduce((acc, item) => {
      if (item[objectKey]) {
        acc[item[objectKey]] = item[objectKey];
      }
      return acc;
    }, {}),
  );
};

export const valuesToSelectOptions = (values: any[]) => {
  return values.map((value) => {
    if (value) {
      return { value, label: value };
    } else {
      return { value, label: '전체' };
    }
  });
};
