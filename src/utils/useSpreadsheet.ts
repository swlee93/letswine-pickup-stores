import { useEffect, useMemo, useReducer, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import {
  HEADERS,
  API_KEY,
  SPREADSHEET_ID,
  SPREADSHEET_RANGE,
  STORAGE_KEY,
  REFRESH_DELAY_TIME,
  SORT_OPTIONS,
} from '../constants/spreadsheet';
import { filterBy, getUniqueValuesFromObject } from './common';

const useSpreadsheet = () => {
  // 원본데이터
  const [originalData, setOriginalData] = useReducer((state: any, response: any) => {
    let result: any = {};
    const values = response?.result?.values;
    if (Array.isArray(values)) {
      result = { values, saved: Date.now() };
      reactLocalStorage.setObject(STORAGE_KEY, result);
    }

    return result;
  }, reactLocalStorage.getObject(STORAGE_KEY));

  const onGapiLoaded = (e: any) => {
    if (originalData?.saved && originalData?.saved > Date.now() - REFRESH_DELAY_TIME) {
      // 갱신하지 않음
    } else {
      // 데이터 갱신 조건
      window.getPublicValues({ spreadsheetId: SPREADSHEET_ID, range: SPREADSHEET_RANGE }, setOriginalData);
    }
  };
  useEffect(() => {
    window.initOAuthClient({ apiKey: API_KEY } as any);
    document.addEventListener('gapi-loaded', onGapiLoaded);
    return () => {
      document.removeEventListener('gapi-loaded', onGapiLoaded);
    };
  }, []);

  // 칼럼 매핑 데이터
  const [headers] = useState(HEADERS);
  const dataSource = useMemo(() => {
    let results: any[] = [];
    originalData?.values?.forEach((row: any[], index: number) => {
      if (index === 0) {
      } else {
        let datum: any = {};
        headers.forEach(({ key, defaultValue }, colNum) => {
          const rowValue = row[colNum] || defaultValue;
          datum[key] = rowValue || defaultValue;
        });
        datum.NO = index;
        results.push(datum);
      }
    });
    return results;
  }, [originalData]);

  // 정렬 기능
  const [sortKey, setSortKey] = useState('distance');
  const [sortOptions] = useState(SORT_OPTIONS);

  // 더보기 기능
  const [displayLength, setDisplayLength] = useState(12);
  const onLoadMore = () => {
    setDisplayLength(displayLength + 12);
  };

  // 필터 기능
  const [locationFilter, setLocationFilter] = useState('서울');
  const [locationDetailFilter, setLocationDetailFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const locations = useMemo(() => {
    return getUniqueValuesFromObject(dataSource, 'location');
  }, [dataSource]);

  const locationDetails = useMemo(
    () => getUniqueValuesFromObject(filterBy(dataSource, 'location', locationFilter), 'location_detail'),
    [dataSource, locationFilter],
  );

  const brands = useMemo(() => {
    return getUniqueValuesFromObject(
      filterBy(filterBy(dataSource, 'location', locationFilter), 'location_detail', locationDetailFilter),
      'brand_name',
    );
  }, [dataSource, locationFilter]);

  const [searchTrigger, onSearchFilter] = useReducer(() => Math.random(), 0);

  // 화면 표시 데이터
  const displayData = useMemo(() => {
    let filtered = dataSource;
    if (searchTrigger) {
      if (locationFilter) {
        filtered = filterBy(filtered, 'location', locationFilter);
      }
      if (locationDetailFilter) {
        filtered = filterBy(filtered, 'locationDetail', locationDetailFilter);
      }
      if (brandFilter) {
        filtered = filterBy(filtered, 'brand_name', brandFilter);
      }
    }
    return filtered
      .sort((a: any, b: any) => {
        const aSortValue = String(a[sortKey]);
        const bSortValue = String(b[sortKey]);
        return aSortValue.localeCompare(bSortValue, 'ko-KR', { numeric: true });
      })
      .slice(0, displayLength);
  }, [dataSource, sortKey, displayLength, searchTrigger]);

  return {
    displayData,
    headers,
    locations,
    locationDetails,
    brands,
    sortKey,
    setSortKey,
    sortOptions,
    locationFilter,
    setLocationFilter,
    locationDetailFilter,
    setLocationDetailFilter,
    brandFilter,
    setBrandFilter,
    onLoadMore,
    onSearchFilter,
  };
};

export default useSpreadsheet;
