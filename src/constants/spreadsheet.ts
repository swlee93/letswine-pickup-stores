export const API_KEY = 'AIzaSyB1NLS1bALxgSVtZChVB33T_TC_zVUMCjQ';
export const SPREADSHEET_ID = '1ScGRhAEGAbgwi46GsPPbWIhwxEw1jBUpyQF2XtxuBEY';
export const SPREADSHEET_RANGE = 'A:Z';
export const STORAGE_KEY = 'stores';
export const REFRESH_DELAY_TIME = 60000;

export const SORT_OPTIONS = [
  { label: '거리 순', value: 'distance' },
  { label: '가나다 순', value: 'store_name' },
  { label: '최근 순', value: 'recent' },
];

export const HEADERS = [
  { key: 'NO' },
  { key: 'brand_name' },
  { key: 'pickup' },
  { key: 'location' },
  { key: 'location_detail' },
  { key: 'store_name' },
  { key: 'address' },
  { key: 'address_detail' },
  { key: 'zip_code' },
  { key: 'phone_number' },
  { key: 'business_hours' },
  { key: 'delivery' },
  {
    key: 'thumnail',
    defaultValue: 'https://cdn.daily.hankooki.com/news/photo/202108/20210825_1_bodyFimg_733490.jpg',
  },
  {
    key: 'description',
    defaultValue:
      '건강한 브런치가 있는 파주 디저트 성지건강한 브런치가 있는 파주 디저트 성지 디저트 성지 디저트 성지 디저트 성지',
  },
];
