// 'use client';

// import React, { useState, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import type { Data, Layout, Config } from 'plotly.js';

// interface props{
//   className?: string
// }

// import type { ComponentType } from 'react';

// const Plot = dynamic(
//   () => import('react-plotly.js'),
//   { ssr: false }
// ) as ComponentType<{
//   data: Data[];
//   layout: Partial<Layout>;
//   config?: Partial<Config>;
//   style?: React.CSSProperties;
// }>;

// const shortBranches = [
//   "Singapore HQ", "Europe", "Singapore Tradehub", "Chennai", "Madurai",
//   "Brazil", "Iraq", "USA", "Dubai", "Guyana", "Oman"
// ];

// const fullBranchMap: Record<string, string> = {
//   "Singapore HQ": "Headquarters Apeiron Pte. Ltd, Singapore",
//   "Europe": "Apeiron Europe",
//   "Singapore Tradehub": "Apeiron Workshop-Tradehub, Singapore",
//   "Chennai": "Apeiron Automation Solutions Pvt. Ltd. - Chennai, India",
//   "Madurai": "Apeiron Automation Solutions Pvt. Ltd. - Madurai, India",
//   "Brazil": "Apeiron Brasil LTDA",
//   "Iraq": "Apeiron Iraq",
//   "USA": "Apeiron Solutions, USA",
//   "Dubai": "Apeiron EMEA Software Design Co. L.L.C - Middle East (Dubai)",
//   "Guyana": "Apeiron Guyana",
//   "Oman": "Apeiron International LLC - Oman",
// };

// export default function BranchPerformanceChart({ className }: props) {
//   const [selectedBranch, setSelectedBranch] = useState<string>('All Branches');
//  const [timePeriod, setTimePeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
//   const allData = useMemo(() => {
//     const data: any[] = [];
//     const months = ['Jan', 'Feb', 'Mar', 'Apr'];
//     const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

//     shortBranches.forEach((short) => {
//       const full = fullBranchMap[short];
//       days.forEach((d) => {
//   data.push({
//     Short: short,
//     Branch: full,
//     Period: d,
//     Type: 'In-Office',
//     Value: Math.floor(Math.random() * 30) + 20   // 👈 small realistic numbers
//   });

//   data.push({
//     Short: short,
//     Branch: full,
//     Period: d,
//     Type: 'Client Office Site',
//     Value: Math.floor(Math.random() * 20) + 10
//   });
// });

//       for (let w = 1; w <= 8; w++) {
//         data.push({ Short: short, Branch: full, Period: `Week ${w}`, Type: 'In-Office', Value: Math.floor(Math.random() * 30) + 20 });
//         data.push({ Short: short, Branch: full, Period: `Week ${w}`, Type: 'Client Office Site', Value: Math.floor(Math.random() * 20) + 10 });
//       }

//       months.forEach((m) => {
//         data.push({ Short: short, Branch: full, Period: m, Type: 'In-Office', Value: Math.floor(Math.random() * 30) + 20 });
//         data.push({ Short: short, Branch: full, Period: m, Type: 'Client Office Site', Value: Math.floor(Math.random() * 20) + 10 });
//       });
//     });
//     return data;
//   }, []);

//  const filteredData = useMemo(() => {
//   let data = [...allData];

//   if (selectedBranch !== 'All Branches') {
//     data = data.filter(item => item.Branch === selectedBranch);
//   }

//   if (timePeriod === 'Daily') {
//     data = data.filter(item =>
//       ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(item.Period)
//     );
//   } else if (timePeriod === 'Weekly') {
//     data = data.filter(item => item.Period.startsWith('Week'));
//   } else {
//     data = data.filter(item => !item.Period.startsWith('Week'));
//   }

//   return data;
// }, [allData, selectedBranch, timePeriod]);

//   const xValues = [...new Set(filteredData.map(d => d.Short))];

//   const inOfficeY = xValues.map(short => {
//     const vals = filteredData.filter(d => d.Short === short && d.Type === 'In-Office').map(d => d.Value);
//    return vals.length ? vals[vals.length - 1] : 0;
//   });

//   const clientY = xValues.map(short => {
//     const vals = filteredData.filter(d => d.Short === short && d.Type === 'Client Office Site').map(d => d.Value);
//     return vals.length ? vals[vals.length - 1] : 0;
//   });

//   const plotData: Data[] = [
//     {
//       x: xValues,
//       y: inOfficeY,
//       name: 'In-Office',
//       type: 'bar' as const,
//       marker: { color: '#1e3a8a' },     // Professional Deep Navy
//     },
//     {
//       x: xValues,
//       y: clientY,
//       name: 'Client Office Site',
//       type: 'bar' as const,
//       marker: { color: '#15803d' },     // Elegant Emerald Green
//     },
//   ];

//   const layout: Partial<Layout> = {
//     title: {
//       text: `Apeiron Branches Performance - ${timePeriod}`,
//       font: { size: 16 },
//     },
//     barmode: 'group' as const,
//     autosize: true,
//     dragmode: false,
//     scrollZoom: false,

//     margin: { l: 45, r: 30, t: 50, b: 95 },
//     xaxis: {
//       tickangle: -38,
//       tickfont: { size: 11 },
//     },
//     yaxis: {
//       title: { text: 'Employee count' },
//       gridcolor: '#f3f4f6',
//     },
//    legend: {
//   orientation: 'h',   // 👈 horizontal
//   x: 0.5,
//   y: -0.85,           // 👈 push below chart
//   xanchor: 'center',
//   yanchor: 'top',
//   font: { size: 12 },
// },
//     bargap: 0.28,
//     bargroupgap: 0.2,
//     plot_bgcolor: '#ffffff',
//     paper_bgcolor: '#ffffff',
//   };

//   return (
//     <div className="w-full bg-white rounded-2xl shadow-md p-5 border">   {/* Compact container */}
      
//       {/* Filters - Compact */}
//       <div className="flex flex-col md:flex-row gap-4 mb-5">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Select Branch</label>
//           <select
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//             className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700"
//           >
//             <option value="All Branches">All Branches</option>
//             {shortBranches.map(short => (
//               <option key={short} value={fullBranchMap[short]}>
//                 {short}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="w-full md:w-52">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
//          <select
//   value={timePeriod}
//   onChange={(e) => setTimePeriod(e.target.value as 'Daily' | 'Weekly' | 'Monthly')}
//   className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700"
// >
//   <option value="Daily">Daily</option>   
//   <option value="Weekly">This Week</option>
//   <option value="Monthly">This month</option>
// </select>
//         </div>
//       </div>
      
//       {/* Bar Chart */}
//        <div className="h-55 cursor-default">
//     <Plot
//       data={plotData}
//       layout={layout}
//       config={{ responsive: true, displayModeBar: false, scrollZoom: false, dragmode: false }}
//       style={{ width: '100%', height: '100%' }}
//     />
//   </div>

//       <p className="text-center text-xs text-gray-500 mt-3">
//         Click legend to toggle
//       </p>
//     </div>
//   );
// }

'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Data, Layout, Config } from 'plotly.js';
import type { ComponentType } from 'react';

interface Props {
  className?: string;
}

type BranchData = {
  Short: string;
  Branch: string;
  Period: string;
  Type: 'In-Office' | 'Client Office Site';
  Value: number;
};

const Plot = dynamic(
  () => import('react-plotly.js'),
  { ssr: false }
) as ComponentType<{
  data: Data[];
  layout: Partial<Layout>;
  config?: Partial<Config>;
  style?: React.CSSProperties;
}>;

const shortBranches = [
  "Singapore HQ", "Europe", "Singapore Tradehub", "Chennai", "Madurai",
  "Brazil", "Iraq", "USA", "Dubai", "Guyana", "Oman"
];

const fullBranchMap: Record<string, string> = {
  "Singapore HQ": "Headquarters Apeiron Pte. Ltd, Singapore",
  "Europe": "Apeiron Europe",
  "Singapore Tradehub": "Apeiron Workshop-Tradehub, Singapore",
  "Chennai": "Apeiron Automation Solutions Pvt. Ltd. - Chennai, India",
  "Madurai": "Apeiron Automation Solutions Pvt. Ltd. - Madurai, India",
  "Brazil": "Apeiron Brasil LTDA",
  "Iraq": "Apeiron Iraq",
  "USA": "Apeiron Solutions, USA",
  "Dubai": "Apeiron EMEA Software Design Co. L.L.C - Middle East (Dubai)",
  "Guyana": "Apeiron Guyana",
  "Oman": "Apeiron International LLC - Oman",
};

export default function BranchPerformanceChart({ className }: Props) {
  const [selectedBranch, setSelectedBranch] = useState<string>('All Branches');
  const [timePeriod, setTimePeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  // ✅ Generate mock data ONLY ONCE (no React purity error)
  const [allData] = useState<BranchData[]>(() => {
    const data: BranchData[] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    shortBranches.forEach((short) => {
      const full = fullBranchMap[short];

      days.forEach((d) => {
        data.push({
          Short: short,
          Branch: full,
          Period: d,
          Type: 'In-Office',
          Value: Math.floor(Math.random() * 30) + 20,
        });

        data.push({
          Short: short,
          Branch: full,
          Period: d,
          Type: 'Client Office Site',
          Value: Math.floor(Math.random() * 20) + 10,

        });
      });

      for (let w = 1; w <= 8; w++) {
        data.push({
          Short: short,
          Branch: full,
          Period: `Week ${w}`,
          Type: 'In-Office',
          Value: Math.floor(Math.random() * 30) + 20,
        });

        data.push({
          Short: short,
          Branch: full,
          Period: `Week ${w}`,
          Type: 'Client Office Site',
          Value: Math.floor(Math.random() * 20) + 10,
        });
      }

      months.forEach((m) => {
        data.push({
          Short: short,
          Branch: full,
          Period: m,
          Type: 'In-Office',
          Value: Math.floor(Math.random() * 30) + 20,
        });

        data.push({
          Short: short,
          Branch: full,
          Period: m,
          Type: 'Client Office Site',
          Value: Math.floor(Math.random() * 20) + 10,
        });
      });
    });

    return data;
  });

  const filteredData = useMemo(() => {
    let data = [...allData];

    if (selectedBranch !== 'All Branches') {
      data = data.filter(item => item.Branch === selectedBranch);
    }

    if (timePeriod === 'Daily') {
      data = data.filter(item =>
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(item.Period)
      );
    } else if (timePeriod === 'Weekly') {
      data = data.filter(item => item.Period.startsWith('Week'));
    } else {
      data = data.filter(item => !item.Period.startsWith('Week'));
    }

    return data;
  }, [allData, selectedBranch, timePeriod]);

  const xValues = [...new Set(filteredData.map(d => d.Short))];

  const inOfficeY = xValues.map(short => {
    const vals = filteredData
      .filter(d => d.Short === short && d.Type === 'In-Office')
      .map(d => d.Value);
    return vals.length ? vals[vals.length - 1] : 0;
  });

  const clientY = xValues.map(short => {
    const vals = filteredData
      .filter(d => d.Short === short && d.Type === 'Client Office Site')
      .map(d => d.Value);
    return vals.length ? vals[vals.length - 1] : 0;
  });

  const plotData: Data[] = [
    {
      x: xValues,
      y: inOfficeY,
      name: 'In-Office',
      type: 'bar',
      marker: { color: '#1e3a8a' },
    },
    {
      x: xValues,
      y: clientY,
      name: 'Client Office Site',
      type: 'bar',
      marker: { color: '#15803d' },
    },
  ];

  const layout: Partial<Layout> = {
    title: {
      text: `Apeiron Branches Performance - ${timePeriod}`,
      font: { size: 16 },
    },
    barmode: 'group',
    autosize: true,
    dragmode: false,

    margin: { l: 45, r: 30, t: 50, b: 95 },
    xaxis: {
      tickangle: -38,
      tickfont: { size: 11 },
    },
    yaxis: {
      title: { text: 'Employee count' },
      gridcolor: '#f3f4f6',
    },
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.85,
      xanchor: 'center',
      yanchor: 'top',
      font: { size: 12 },
    },
    bargap: 0.28,
    bargroupgap: 0.2,
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
  };

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: false,
    scrollZoom: false,
  };

  return (
    <div className={`w-full bg-white rounded-2xl shadow-md p-5 border ${className || ''}`}>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Branch
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700"
          >
            <option value="All Branches">All Branches</option>
            {shortBranches.map(short => (
              <option key={short} value={fullBranchMap[short]}>
                {short}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-52">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select
            value={timePeriod}
            onChange={(e) =>
              setTimePeriod(e.target.value as 'Daily' | 'Weekly' | 'Monthly')
            }
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">This Week</option>
            <option value="Monthly">This Month</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-55 cursor-default">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <p className="text-center text-xs text-gray-500 mt-3">
        Click legend to toggle
      </p>
    </div>
  );
}