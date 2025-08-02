export const marketingRoutes = {
  appName: "营销系统",
  appKey: "marketing",
  routes: [
    {
      path: "/marketing/dashboard",
      name: "营销概览",
      icon: "DashboardOutlined",
      showBack: false
    },
    {
      path: "/marketing/campaigns",
      name: "活动管理",
      icon: "CampaignOutlined",
      showBack: true,
      backPath: "/marketing/dashboard"
    },
    {
      path: "/marketing/customers",
      name: "客户管理",
      icon: "UserOutlined",
      showBack: true
      // 不设置backPath，默认返回上一页
    },
    {
      path: "/marketing/analytics",
      name: "数据分析",
      icon: "BarChartOutlined",
      showBack: true,
      backPath: "/marketing/dashboard"
    }
  ]
};
