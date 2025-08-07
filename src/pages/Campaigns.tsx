import React from 'react';
import { Table, Button, Space, Tag, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const color =
        status === '进行中' ? 'green' : status === '已结束' ? 'red' : 'blue';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '开始时间',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: '结束时间',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />}>
          编辑
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />}>
          删除
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '春季促销活动',
    status: '进行中',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
  {
    key: '2',
    name: '新用户注册优惠',
    status: '已结束',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
  },
  {
    key: '3',
    name: '会员专享活动',
    status: '未开始',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
  },
];

export const Campaigns: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Card
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            新建活动
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
            showTotal: total => `共 ${total} 条记录`,
          }}
        />
      </Card>
    </div>
  );
};
