import React from 'react';
import { Card, Row, Col } from 'antd';

export const Analytics: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="用户增长趋势" style={{ height: 300 }}>
            <div style={{ 
              height: 200, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#f5f5f5',
              borderRadius: 4
            }}>
              图表占位符 - 用户增长趋势
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="活动效果分析" style={{ height: 300 }}>
            <div style={{ 
              height: 200, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#f5f5f5',
              borderRadius: 4
            }}>
              图表占位符 - 活动效果分析
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="转化漏斗分析" style={{ height: 300 }}>
            <div style={{ 
              height: 200, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#f5f5f5',
              borderRadius: 4
            }}>
              图表占位符 - 转化漏斗分析
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
