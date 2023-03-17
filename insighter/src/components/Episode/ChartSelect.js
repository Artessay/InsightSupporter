import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
const items = [
    {
        label: 'Bar Chart',
        key: '1',
    },
    {
        label: 'Stacked Bar Chart',
        key: '2',
    },
    {
        label: 'Pie Chart',
        key: '3',
    },
    {
        label: 'Shot Chart',
        key: '4',
    },
];
const ChartSelect = () => (
  <Space
    
  >
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        width: 100,
      }}
    >
      Chart Type
    </div>
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ['1'],
      }}
      style={{
        color: 'black'
      }}
    >
      <Typography.Link>
        <Space>
          Bar Chart
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  </Space>
  
);
export default ChartSelect;