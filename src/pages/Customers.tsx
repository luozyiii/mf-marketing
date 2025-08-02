import React from 'react';
import { Table, Button, Space, Avatar, Card } from 'antd';
import { PlusOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

const columns = [
  {
    title: '客户',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: any) => (
      <Space>
        <Avatar icon={<UserOutlined />} />
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{record.email}</div>
        </div>
      </Space>
    ),
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '注册时间',
    dataIndex: 'registerDate',
    key: 'registerDate',
  },
  {
    title: '最后活跃',
    dataIndex: 'lastActive',
    key: 'lastActive',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />}>编辑</Button>
        <Button type="link">查看详情</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    registerDate: '2024-01-15',
    lastActive: '2024-03-20',
  },
  {
    key: '2',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138002',
    registerDate: '2024-02-10',
    lastActive: '2024-03-19',
  },
  {
    key: '3',
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138003',
    registerDate: '2024-03-01',
    lastActive: '2024-03-18',
  },
];

export const Customers: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Card
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            新增客户
          </Button>
        }
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>
    </div>
  );
};
