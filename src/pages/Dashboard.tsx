import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Tabs, Space, Tag, Table, Alert, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, EyeOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { Line, Column, Pie } from '@ant-design/charts';
import { useNavigate } from 'react-router-dom';
import dashboardData from './dashboardData.json';
import { AuthUtils } from '../utils/authUtils';
import { currentConfig } from '../config/deployment';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
  const [data] = useState(dashboardData);
  const navigate = useNavigate();

  // 格式化数字显示
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toLocaleString();
  };

  // 格式化货币显示
  const formatCurrency = (num: number) => {
    if (num >= 10000) {
      return '¥' + (num / 10000).toFixed(1) + '万';
    }
    return '¥' + num.toLocaleString();
  };

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  };

  // 获取趋势颜色
  const getTrendColor = (trend: string) => {
    return trend === 'up' ? '#52c41a' : '#ff4d4f';
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* 调试信息 - 仅在生产环境显示 */}
      {process.env.NODE_ENV === 'production' && (
        <Alert
          message="调试信息"
          description={
            <div>
              <p><strong>环境:</strong> {process.env.NODE_ENV}</p>
              <p><strong>当前URL:</strong> {window.location.href}</p>
              <p><strong>主应用URL:</strong> {currentConfig.shellUrl}</p>
              <p><strong>Token:</strong> {AuthUtils.getToken() ? '已设置' : '未设置'}</p>
              <p><strong>是否在iframe:</strong> {window.parent !== window ? '是' : '否'}</p>
              <Button
                size="small"
                onClick={() => navigate('/debug')}
                style={{ marginTop: '8px', marginRight: '8px' }}
              >
                访问调试页面
              </Button>
              <Button
                size="small"
                onClick={() => {
                  AuthUtils.setToken('test-token-' + Date.now());
                  window.location.reload();
                }}
                style={{ marginTop: '8px' }}
              >
                设置测试Token
              </Button>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      {/* 今日数据概览 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginTop: 0,marginBottom: 16 }}>今日数据概览</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="活跃用户"
                value={data.todayData.activeUsers.value}
                formatter={(value) => formatNumber(Number(value))}
                valueStyle={{ color: getTrendColor(data.todayData.activeUsers.trend) }}
                prefix={<UserOutlined />}
                suffix={
                  <Space>
                    {getTrendIcon(data.todayData.activeUsers.trend)}
                    <Text style={{ color: getTrendColor(data.todayData.activeUsers.trend), fontSize: 12 }}>
                      {data.todayData.activeUsers.change}%
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="新增用户"
                value={data.todayData.newUsers.value}
                valueStyle={{ color: getTrendColor(data.todayData.newUsers.trend) }}
                prefix={<UserOutlined />}
                suffix={
                  <Space>
                    {getTrendIcon(data.todayData.newUsers.trend)}
                    <Text style={{ color: getTrendColor(data.todayData.newUsers.trend), fontSize: 12 }}>
                      {data.todayData.newUsers.change}%
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="页面浏览量"
                value={data.todayData.pageViews.value}
                formatter={(value) => formatNumber(Number(value))}
                valueStyle={{ color: getTrendColor(data.todayData.pageViews.trend) }}
                prefix={<EyeOutlined />}
                suffix={
                  <Space>
                    {getTrendIcon(data.todayData.pageViews.trend)}
                    <Text style={{ color: getTrendColor(data.todayData.pageViews.trend), fontSize: 12 }}>
                      {Math.abs(data.todayData.pageViews.change)}%
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="转化率"
                value={data.todayData.conversionRate.value}
                precision={2}
                valueStyle={{ color: getTrendColor(data.todayData.conversionRate.trend) }}
                suffix={
                  <Space>
                    <Text>%</Text>
                    {getTrendIcon(data.todayData.conversionRate.trend)}
                    <Text style={{ color: getTrendColor(data.todayData.conversionRate.trend), fontSize: 12 }}>
                      {data.todayData.conversionRate.change}%
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 过去7天趋势图表 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>过去7天数据趋势</Title>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: '用户数据',
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="活跃用户趋势" style={{ marginBottom: 16 }} className="chart-card">
                      <Line
                        data={data.weeklyData.activeUsers}
                        xField="date"
                        yField="value"
                        smooth={true}
                        color="#1890ff"
                        height={200}
                        padding={[20, 20, 50, 50]}
                        point={{
                          size: 4,
                          shape: 'circle',
                        }}
                        tooltip={{
                          formatter: (datum: any) => ({
                            name: '活跃用户',
                            value: formatNumber(datum.value),
                          }),
                        }}
                        xAxis={{
                          tickCount: 7,
                          label: {
                            formatter: (text: any) => {
                              const date = new Date(text);
                              return `${date.getMonth() + 1}/${date.getDate()}`;
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="新增用户趋势" style={{ marginBottom: 16 }} className="chart-card">
                      <Line
                        data={data.weeklyData.newUsers}
                        xField="date"
                        yField="value"
                        smooth={true}
                        color="#52c41a"
                        height={200}
                        padding={[20, 20, 50, 50]}
                        point={{
                          size: 4,
                          shape: 'circle',
                        }}
                        tooltip={{
                          formatter: (datum: any) => ({
                            name: '新增用户',
                            value: datum.value,
                          }),
                        }}
                        xAxis={{
                          tickCount: 7,
                          label: {
                            formatter: (text: any) => {
                              const date = new Date(text);
                              return `${date.getMonth() + 1}/${date.getDate()}`;
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
              ),
            },
            {
              key: '2',
              label: '流量数据',
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="页面浏览量趋势" style={{ marginBottom: 16 }} className="chart-card">
                      <Column
                        data={data.weeklyData.pageViews}
                        xField="date"
                        yField="value"
                        color="#722ed1"
                        height={200}
                        padding={[20, 20, 50, 50]}
                        tooltip={{
                          formatter: (datum: any) => ({
                            name: '页面浏览量',
                            value: formatNumber(datum.value),
                          }),
                        }}
                        xAxis={{
                          label: {
                            formatter: (text: any) => {
                              const date = new Date(text);
                              return `${date.getMonth() + 1}/${date.getDate()}`;
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="转化率趋势" style={{ marginBottom: 16 }} className="chart-card">
                      <Line
                        data={data.weeklyData.conversionRate}
                        xField="date"
                        yField="value"
                        smooth={true}
                        color="#fa8c16"
                        height={200}
                        padding={[20, 20, 50, 50]}
                        point={{
                          size: 4,
                          shape: 'circle',
                        }}
                        tooltip={{
                          formatter: (datum: any) => ({
                            name: '转化率',
                            value: datum.value + '%',
                          }),
                        }}
                        xAxis={{
                          tickCount: 7,
                          label: {
                            formatter: (text: any) => {
                              const date = new Date(text);
                              return `${date.getMonth() + 1}/${date.getDate()}`;
                            },
                          },
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </div>

      {/* 收入和订单数据 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Statistic
              title="今日收入"
              value={data.todayData.revenue.value}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: getTrendColor(data.todayData.revenue.trend) }}
              prefix={<DollarOutlined />}
              suffix={
                <Space>
                  {getTrendIcon(data.todayData.revenue.trend)}
                  <Text style={{ color: getTrendColor(data.todayData.revenue.trend), fontSize: 12 }}>
                    {data.todayData.revenue.change}%
                  </Text>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="今日订单"
              value={data.todayData.orders.value}
              valueStyle={{ color: getTrendColor(data.todayData.orders.trend) }}
              prefix={<ShoppingCartOutlined />}
              suffix={
                <Space>
                  {getTrendIcon(data.todayData.orders.trend)}
                  <Text style={{ color: getTrendColor(data.todayData.orders.trend), fontSize: 12 }}>
                    {data.todayData.orders.change}%
                  </Text>
                </Space>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* 收入和订单趋势图 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="收入趋势（过去7天）" className="chart-card">
            <Line
              data={data.weeklyData.revenue}
              xField="date"
              yField="value"
              smooth={true}
              color="#13c2c2"
              height={200}
              padding={[20, 20, 50, 50]}
              point={{
                size: 4,
                shape: 'circle',
              }}
              tooltip={{
                formatter: (datum: any) => ({
                  name: '收入',
                  value: formatCurrency(datum.value),
                }),
              }}
              xAxis={{
                tickCount: 7,
                label: {
                  formatter: (text: any) => {
                    const date = new Date(text);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  },
                },
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="订单趋势（过去7天）" className="chart-card">
            <Column
              data={data.weeklyData.orders}
              xField="date"
              yField="value"
              color="#eb2f96"
              height={200}
              padding={[20, 20, 50, 50]}
              tooltip={{
                formatter: (datum: any) => ({
                  name: '订单数',
                  value: datum.value,
                }),
              }}
              xAxis={{
                label: {
                  formatter: (text: any) => {
                    const date = new Date(text);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  },
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 流量来源和活动数据 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="流量来源分布" className="chart-card">
            <Pie
              data={data.topChannels.map(item => ({
                type: item.channel,
                value: item.users,
              }))}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={false}
              tooltip={{
                formatter: (datum: any) => ({
                  name: datum.type,
                  value: formatNumber(datum.value) + ' 用户',
                }),
              }}
              legend={{
                position: 'bottom',
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="活动效果" className="chart-card">
            <Table
              dataSource={data.campaignData}
              pagination={false}
              size="small"
              rowKey="name"
              columns={[
                {
                  title: '活动名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text, record) => (
                    <Space>
                      <Text>{text}</Text>
                      <Tag color={record.status === 'active' ? 'green' : 'orange'}>
                        {record.status === 'active' ? '进行中' : '已暂停'}
                      </Tag>
                    </Space>
                  ),
                },
                {
                  title: '点击率',
                  key: 'ctr',
                  render: (_, record) => (
                    <Text>{((record.clicks / record.impressions) * 100).toFixed(2)}%</Text>
                  ),
                },
                {
                  title: 'ROI',
                  key: 'roi',
                  render: (_, record) => (
                    <Text style={{ color: record.revenue > record.cost ? '#52c41a' : '#ff4d4f' }}>
                      {((record.revenue / record.cost) * 100).toFixed(0)}%
                    </Text>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
