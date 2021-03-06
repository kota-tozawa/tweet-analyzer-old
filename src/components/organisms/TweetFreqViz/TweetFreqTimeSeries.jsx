// 折れ線グラフは Recharts.js の方が見た目がきれいだと判断したため Recharts.js を用いる。
import React from 'react';
import PropTypes from 'prop-types';
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
import { Paper } from '@material-ui/core';
import { theme } from '../../atoms/theme';

const TweetFreqTimeSeries = ({ breaks, freqs }) => {
  const data = freqs.map((freq, i) => ({
    period: breaks[i],
    freq: freq,
  }));
  return (
    <Paper>
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
            label={{
              value: 'ツイート頻度',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" />
          <Line
            type="monotone"
            dataKey="freq"
            name="ツイート頻度（実際の値）"
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

TweetFreqTimeSeries.propTypes = {
  breaks: PropTypes.arrayOf(PropTypes.string).isRequired,
  freqs: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TweetFreqTimeSeries;
