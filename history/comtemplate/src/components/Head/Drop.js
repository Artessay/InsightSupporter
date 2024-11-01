import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
// const handleButtonClick = (e) => {
//   message.info('Click on left button.');
//   console.log('click left button', e);
// };
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: 'Mar 17',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Mar 18',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: 'Mar 19',
    key: '3',
    icon: <UserOutlined />,
  },
  {
    label: 'Mar 20',
    key: '4',
    icon: <UserOutlined />,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

export default class Drop extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }
    render() {
        return(
            <Space wrap>
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            MAR 17
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>
        )
    }
}
