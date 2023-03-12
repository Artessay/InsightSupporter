import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
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
            <Space wrap
                // style={{
                //     float: "right"
                // }}
            >
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
