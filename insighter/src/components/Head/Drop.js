import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
// const handleButtonClick = (e) => {
//   message.info('Click on left button.');
//   console.log('click left button', e);
// };
const handleMenuClick = (e) => {
  // message.info('Click on menu item.');
  // console.log('click', e);
};
const items = [
  {
    label: 'Mar 6',
    key: '0',
    // icon: <UserOutlined />,
  },
  {
    label: 'Mar 7',
    key: '1',
    // icon: <UserOutlined />,
  },
  {
    label: 'Mar 8',
    key: '2',
    // icon: <UserOutlined />,
  },
  {
    label: 'Mar 9',
    key: '3',
    // icon: <UserOutlined />,
  },
  {
    label: 'More...',
    key: '4',
    // icon: <UserOutlined />,
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
            <Space wrap  className="DataSelect">
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>
        )
    }
}
