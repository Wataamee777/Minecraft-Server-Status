const apiUrl = 'https://api.mcsrvstat.us/2/play.kotoca.net';

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    document.getElementById('status').textContent =
      data.online ? "オンライン" : "オフライン";
    document.getElementById('motd').textContent =
      `MOTD: ${data.motd?.clean?.join(' ') || '取得不可'}`;
    document.getElementById('version').textContent =
      `バージョン: ${data.version}`;
    document.getElementById('protocol').textContent =
      `プロトコル: ${data.protocol} (${data.protocol_name})`;
    document.getElementById('software').textContent =
      `サーバーソフト: ${data.software || '不明'}`;
    document.getElementById('ip').textContent =
      `IP: ${data.ip}:${data.port}`;
    document.getElementById('players').textContent =
      `プレイヤー: ${data.players.online}/${data.players.max}`;
    document.getElementById('dns').textContent =
      `DNSエラー: ${data.debug?.dns?.error?.srv?.message || 'なし'}`;
    document.getElementById('record').textContent =
      `キャッシュ: ${data.debug?.cachetime || '不明'} → ${data.debug?.cacheexpire || '不明'}`;

    // DNS レコードを追加表示
    const dnsRecords = data.debug?.dns?.a || [];
    const dnsDisplay = dnsRecords.map(record => {
      return `レコード: ${record.type} - アドレス: ${record.address}`;
    }).join(', ');

    document.getElementById('dns').innerHTML += `<br>DNSレコード: ${dnsDisplay}`;
  })
  .catch(err => {
    document.getElementById('status').textContent = 'エラーが発生しました';
    console.error(err);
  });
