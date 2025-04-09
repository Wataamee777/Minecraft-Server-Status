const apiUrl = 'https://api.mcsrvstat.us/2/play.kotoca.net';

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const statusEl = document.getElementById('status');
    const playersEl = document.getElementById('players');
  const motd = data.motd?.clean || "取得できませんでした";

    if (data.online) {
   statusEl.textContent = `オンライン - ${data.players.online}人 / ${data.players.max}人\nMOTD: ${motd}`;
      statusEl.classList.add('online');

      if (data.players.list && data.players.list.length > 0) {
        data.players.list.forEach(player => {
          fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`)
            .then(res => res.json())
            .then(profile => {
              const uuid = profile.id;
              const skinUrl = `https://crafatar.com/avatars/${uuid}?overlay`;

              const div = document.createElement('div');
              div.className = 'skin';
              div.innerHTML = `
                <img src="${skinUrl}" alt="${player}">
                <div>${player}</div>
              `;
              playersEl.appendChild(div);
            });
        });
      } else {
        playersEl.textContent = 'オンラインのプレイヤー情報は取得できませんでした';
      }
    } else {
      statusEl.textContent = 'オフライン';
      statusEl.classList.add('offline');
    }
  })
  .catch(err => {
    document.getElementById('status').textContent = 'サーバー情報の取得に失敗しました';
  });
