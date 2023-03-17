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
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['1'],
    }}
  >
    <Typography.Link>
      <Space>
        Chart Type
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);
export default ChartSelect;