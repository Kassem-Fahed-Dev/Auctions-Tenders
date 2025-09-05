import { useEffect } from 'react';

export default function ControChart() {
  useEffect(() => {
    if (!window.charts) window.charts = {};

    const createChart = (id, config) => {
      const ctx = document.getElementById(id);
      if (!ctx) return;

      if (window.charts[id]) {
        window.charts[id].destroy();
      }

      window.charts[id] = new window.Chart(ctx.getContext('2d'), config);
    };

    const barStyle = {
      barPercentage: 0.4,
      categoryPercentage: 0.8,
    };

    // .  عدد المستخدمين
    createChart('usersChart', {
      type: 'bar',
      data: {
        labels: ['من شهر', 'من 6 أشهر', 'من سنة', 'من بداية الموقع'],
        datasets: [
          {
            label: 'المستخدمين',
            data: [100000, 200000, 250000, 340000],
            backgroundColor: '#0d47a1',
            ...barStyle,
          },
        ],
      },
      options: { responsive: true },
    });

    // . التحصيل المالي
    createChart('financeChart', {
      type: 'bar',
      data: {
        labels: ['من شهر', 'من 6 أشهر', 'من سنة', 'من بداية الموقع'],
        datasets: [
          {
            label: 'الكل',
            data: [50000, 120000, 200000, 280000],
            backgroundColor: '#2e7d32',
            ...barStyle,
          },
          {
            label: 'مناقصات فقط',
            data: [30000, 80000, 120000, 150000],
            backgroundColor: '#757575',
            ...barStyle,
          },
          {
            label: 'مزادات فقط',
            data: [20000, 50000, 80000, 100000],
            backgroundColor: '#0d47a1',
            ...barStyle,
          },
        ],
      },
      options: { responsive: true, stacked: true },
    });

    //   المزادات
    createChart('auctionsChart', {
      type: 'bar',
      data: {
        labels: ['المنتهية', 'لم تبدأ بعد', 'الجاربة'],
        datasets: [
          {
            label: 'المزادات',
            data: [200000, 250000, 320000],
            backgroundColor: '#0d47a1',
            ...barStyle,
          },
        ],
      },
      options: { responsive: true },
    });

    //   المناقصات
    createChart('tendersChart', {
      type: 'bar',
      data: {
        labels: ['المنتهية', 'لم تبدأ بعد', 'الجاربة'],
        datasets: [
          {
            label: 'المناقصات',
            data: [180000, 220000, 310000],
            backgroundColor: '#0d47a1',
            ...barStyle,
          },
        ],
      },
      options: { responsive: true },
    });
  }, []);

  return (
    <div
      className="charts-container"
      style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}
    >
      <div>
        <h3>
          <i className="fa-solid fa-users"></i> إحصائيات عدد المستخدمين
        </h3>
        <canvas id="usersChart"></canvas>
      </div>
      <div>
        <h3>
          <i className="fa-solid fa-sack-dollar"></i> التحصيل المالي
        </h3>
        <canvas id="financeChart"></canvas>
      </div>
      <div>
        <h3>
          <i className="fa-solid fa-gavel"></i> إحصائيات عدد المزادات
        </h3>
        <canvas id="auctionsChart"></canvas>
      </div>
      <div>
        <h3>
          <i className="far fa-handshake"></i> إحصائيات عدد المناقصات
        </h3>
        <canvas id="tendersChart"></canvas>
      </div>
    </div>
  );
}
