import { useMemo, useState } from 'react';
import { List, Card, Select, Button, Space, AutoComplete, Row, Col } from 'antd';

import Text from 'antd/lib/typography/Text';

import { DownOutlined, SearchOutlined } from '@ant-design/icons';

import useSpreadsheet from '../../utils/useSpreadsheet';
import { valuesToSelectOptions } from '../../utils/common';

const PickupStores = () => {
  // 스프레드시트 데이터 불러오기
  const {
    displayData,
    locations,
    locationDetails,
    brands,
    locationFilter,
    setLocationFilter,
    setLocationDetailFilter,
    locationDetailFilter,
    brandFilter,
    setBrandFilter,
    sortOptions,
    sortKey,
    setSortKey,
    onLoadMore,
    onSearchFilter,
  } = useSpreadsheet();

  return (
    <Space direction='vertical' style={{ width: '100%', padding: '16px' }}>
      <Row wrap={true} gutter={[8, 8]}>
        <Col flex={'0 1 250px'}>
          <Select
            placeholder='지역'
            style={{ width: '100%' }}
            options={valuesToSelectOptions(locations)}
            value={locationFilter}
            onChange={setLocationFilter}
          />
        </Col>
        <Col flex={'0 1 250px'}>
          <Select
            placeholder='상세 지역 선택'
            style={{ width: '100%' }}
            options={valuesToSelectOptions(locationDetails)}
            value={locationDetailFilter}
            onChange={setLocationDetailFilter}
          />
        </Col>
        <Col flex={'1 1 250px'}>
          <AutoComplete
            placeholder='제휴 매장 이름을 입력하세요.'
            style={{ width: '100%' }}
            options={valuesToSelectOptions(brands)}
            value={brandFilter}
            onChange={setBrandFilter}
          />
        </Col>
        <Col flex={'1 1 0px'}>
          <Button onClick={onSearchFilter} icon={<SearchOutlined />}>
            조회하기
          </Button>
        </Col>
      </Row>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Select options={sortOptions} value={sortKey} onChange={setSortKey} />
        <List
          style={{ width: '100%' }}
          grid={{
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={displayData}
          loadMore={
            <Button type='text' icon={<DownOutlined />} block style={{ direction: 'rtl' }} onClick={onLoadMore}>
              더보기
            </Button>
          }
          renderItem={({ NO, location, store_name, thumnail, description }: any) => {
            return (
              <List.Item key={NO}>
                <Card
                  style={{ width: 'fit-content' }}
                  hoverable
                  cover={<img style={{ height: 230, objectFit: 'cover' }} alt={store_name} src={thumnail} />}
                >
                  <Space direction='vertical'>
                    <Text strong>{store_name}</Text>
                    <Text type='secondary'>{location}</Text>
                    <Text>{description}</Text>
                  </Space>
                </Card>
              </List.Item>
            );
          }}
        />
      </Space>
    </Space>
  );
};
export default PickupStores;
