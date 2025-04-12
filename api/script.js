 // APIからサーバーステータスを取得
    fetch('https://api.mcsrvstat.us/3/play.kotoca.net')
      .then(res => res.json())
      .then(data => {
        // JSONデータをpreタグ内に表示
        document.getElementById('json-display').textContent = JSON.stringify(data, null, 2);
      })
      .catch(() => {
        document.getElementById('json-display').textContent = 'サーバーに接続できませんでした';
      });
