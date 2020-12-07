import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// ticks については app.R を参照のこと
const LineGraph = ({ breaks, freqs, ticks }) => {
  const data = freqs.map((freq, i) => ({
    period: breaks[i],
    freq: freq,
  }));
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={700}
        height={500}
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="period"
          domain={['dataMin', 'dataMax']}
          interval="preserveStartEnd"
          label={{
            value: '年月日',
            offset: -5,
            position: 'insideBottomRight',
          }}
        />
        <YAxis
          dataKey="freq"
          interval="preserveStartEnd"
          label={{ value: 'ツイート頻度', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend verticalAlign="bottom" />
        <Line
          type="monotone"
          dataKey="freq"
          name="ツイート頻度（実際の値）"
          stroke="#F08080"
          // グラフの白い点を無くす
          // dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineGraph;
