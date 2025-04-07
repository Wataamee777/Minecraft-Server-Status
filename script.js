const apiUrl = 'https://api.mcsrvstat.us/2/play.kotoca.net'; // 友達のサーバードメインをここに入れる

    // APIからサーバーステータスを取得
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const statusElement = document.getElementById('status');
        
        // サーバーがオンラインかオフラインかの判定
        if (data.online) {
          statusElement.classList.add('online');
          statusElement.innerText = `オンライン 現在の人数: ${data.players.online}人 / 最大人数: ${data.players.max}人 / MOTD 参加メッセージ: ${data.motd.clean}`;
        } else {
          statusElement.classList.add('offline');
          statusElement.innerText = data.message || 'オフラインです';
        }
      })
      .catch(() => {
        document.getElementById('status').innerText = '404Not Found エラーが発生しました サーバーに接続できませんでした';
      });
