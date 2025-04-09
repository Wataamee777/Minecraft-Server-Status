const apiUrl = 'https://api.mcsrvstat.us/2/play.kotoca.net'; // サーバーのドメインかIP

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const statusElement = document.getElementById('status');
    const motd = document.getElementById('motd');
    const ipinfo = document.getElementById('ipinfo');
    const version = document.getElementById('version');
    const record = document.getElementById('record');
    const playersList = document.getElementById('playersList');

    if (data.online) {
      statusElement.classList.add('online');
      statusElement.innerText = `オンライン (${data.players.online}人/${data.players.max}人)`;

      motd.innerText = `MOTD: ${data.motd?.clean?.join(' ') || '取得不可'}`;
      ipinfo.innerText = `IP: ${data.ip}:${data.port}`;
      version.innerText = `サーバーバージョン: ${data.version || '不明'}`;
      record.innerText = `レコード: ${data.debug?.record || '不明'}`;

      if (data.players && data.players.list) {
        data.players.list.forEach(player => {
          fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`)
            .then(res => res.json())
            .then(playerData => {
              const uuid = playerData.id;
              const playerDiv = document.createElement('div');
              playerDiv.className = 'player';
              playerDiv.innerHTML = `
                <img src="https://crafatar.com/avatars/${uuid}?size=50&overlay">
                <p>${player}</p>
              `;
              playersList.appendChild(playerDiv);
            }).catch(() => {
              const playerDiv = document.createElement('div');
              playerDiv.className = 'player';
              playerDiv.innerHTML = `<p>${player}（スキン取得失敗）</p>`;
              playersList.appendChild(playerDiv);
            });
        });
      }
    } else {
      statusElement.classList.add('offline');
      statusElement.innerText = 'オフラインです';
    }
  })
  .catch(() => {
    document.getElementById('status').innerText = '404 サーバー情報取得エラー';
  });
