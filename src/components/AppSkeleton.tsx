import React from 'react';
import styles from './AppSkeleton.module.css';

export const AppSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* 页面头部骨架屏 */}
      <div className={styles.pageHeader}>
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}></div>
          <div className={styles.breadcrumbSeparator}></div>
          <div className={styles.breadcrumbItem}></div>
        </div>
        <div className={styles.pageTitle}></div>
        <div className={styles.pageDescription}></div>
      </div>

      {/* 统计卡片骨架屏 */}
      <div className={styles.statsGrid}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}></div>
            <div className={styles.statContent}>
              <div className={styles.statValue}></div>
              <div className={styles.statLabel}></div>
            </div>
            <div className={styles.statTrend}></div>
          </div>
        ))}
      </div>

      {/* 图表区域骨架屏 */}
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}></div>
            <div className={styles.chartActions}>
              <div className={styles.chartButton}></div>
              <div className={styles.chartButton}></div>
            </div>
          </div>
          <div className={styles.chartContent}>
            <div className={styles.chartPlaceholder}>
              {/* 模拟柱状图 */}
              <div className={styles.chartBars}>
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className={styles.chartBar}
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  ></div>
                ))}
              </div>
              <div className={styles.chartAxis}></div>
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}></div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}></div>
              <div className={styles.legendItem}></div>
              <div className={styles.legendItem}></div>
            </div>
          </div>
          <div className={styles.chartContent}>
            <div className={styles.pieChart}>
              <div className={styles.pieSlice1}></div>
              <div className={styles.pieSlice2}></div>
              <div className={styles.pieSlice3}></div>
              <div className={styles.pieCenter}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 表格区域骨架屏 */}
      <div className={styles.tableSection}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}></div>
            <div className={styles.tableActions}>
              <div className={styles.searchBox}></div>
              <div className={styles.actionButton}></div>
            </div>
          </div>
          <div className={styles.tableContent}>
            <div className={styles.tableHeaderRow}>
              {[...Array(5)].map((_, index) => (
                <div key={index} className={styles.tableHeaderCell}></div>
              ))}
            </div>
            {[...Array(8)].map((_, rowIndex) => (
              <div key={rowIndex} className={styles.tableRow}>
                {[...Array(5)].map((_, cellIndex) => (
                  <div key={cellIndex} className={styles.tableCell}></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
