document.getElementById('checkStatusButton').addEventListener('click', () => {
  const apiUrl = 'https://api.mcsrvstat.us/2/play.kotoca.net'; 

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const statusElement = document.getElementById('status');
      const playersElement = document.getElementById('players');
      const maxPlayersElement = document.getElementById('maxPlayers');
      const motdElement = document.getElementById('motd');
      const playersListElement = document.getElementById('playersList');

      if (data.online) {
        statusElement.classList.add('online');
        statusElement.innerText = `オンライン 現在の人数: ${data.players.online}人 / 最大人数: ${data.players.max}人`;
        playersElement.innerText = `現在の人数: ${data.players.online}`;
        maxPlayersElement.innerText = `最大人数: ${data.players.max}`;
        motdElement.innerText = `参加メッセージ: ${data.motd.clean}`;

        playersListElement.innerHTML = ''; // プレイヤーリストをリセット
        data.players.list.forEach(player => {
          const playerUUID = player.id; 
          const playerSkinURL = `https://crafatar.com/avatars/${playerUUID}?size=50`; 

          const playerElement = document.createElement('div');
          playerElement.classList.add('player');
          
          const playerImage = document.createElement('img');
          playerImage.src = playerSkinURL; 

          const playerName = document.createElement('p');
          playerName.innerText = player.name;

          playerElement.appendChild(playerImage);
          playerElement.appendChild(playerName);

          playersListElement.appendChild(playerElement);
        });
      } else {
        statusElement.classList.add('offline');
        statusElement.innerText = 'オフラインです';
        playersElement.innerText = '現在の人数: 0';
        maxPlayersElement.innerText = '最大人数: 0';
        motdElement.innerText = '参加メッセージ: 不明';
        playersListElement.innerHTML = ''; 
      }
    })
    .catch(() => {
      document.getElementById('status').innerText = 'エラーが発生しました サーバーに接続できませんでした';
    });
});
