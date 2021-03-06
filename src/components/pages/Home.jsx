import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Home = () => {
  const notes =
    'ご利用にあたっての留意事項：\n' +
    '• 各フォームの「取得するツイート数」のプルダウンからは、最新のツイートからさかのぼり最大何ツイート分を分析対象とするか選択します。\n' +
    '• 分析対象のツイートには、ユーザーがリツイートしたツイートも含まれます。\n' +
    '• 取得するツイートの量によっては、グラフを表示するのに時間がかかります。\n' +
    '• ワードクラウドやセンチメント分析は、現在日本語でつぶやかれたツイートのみにしか対応しておりません。';

  return (
    <>
      <Typography paragraph>
        ツイートデータを可視化するダッシュボード。
      </Typography>
      <Typography paragraph>
        <Link
          href="https://github.com/kota-tozawa/tweet-analyzer"
          target="_blank"
        >
          ソースコードを見る
        </Link>
      </Typography>
      <Typography component={'span'}>
        {notes.split('\n').map((t, i) => {
          return <pre key={i}>{t}</pre>;
        })}
      </Typography>
    </>
  );
};

export default Home;
