async function fetchServerStatus() {
  const res = await fetch("https://api.mcsrvstat.us/3/play.kotoca.net");
  const data = await res.json();

  // サーバー基本情報
  document.getElementById("host").textContent = `ホスト名: ${data.hostname || "-"}`;
  document.getElementById("status").textContent = data.online ? "オンライン" : "オフライン";
  document.getElementById("status").className = data.online ? "online" : "offline";
  document.getElementById("cache").textContent = `キャッシュ: ${new Date(data.debug.cachetime * 1000).toLocaleString()}`;
  document.getElementById("bedrock").textContent = `統合版対応: ${data.debug.bedrock ? "はい" : "いいえ"}`;
  document.getElementById("version").textContent = `サーバーバージョン: ${data.version || "不明"}`;
  document.getElementById("ip").textContent = `IP: ${data.ip}`;
  document.getElementById("port").textContent = `ポート: ${data.port}`;
  document.getElementById("motd").textContent = `MOTD: ${data.motd?.clean?.join(" ") || "なし"}`;

  // サーバーアイコン
  if (data.icon) {
    document.getElementById("icon").src = data.icon;
  }

  // サーバーの場所 (IPから推定)
  const locationRes = await fetch(`https://ipapi.co/${data.ip}/json/`);
  const locationData = await locationRes.json();
  document.getElementById("location").textContent = `サーバー所在地: ${locationData.country_name || "不明"}`;

  // プレイヤー情報
  const playersList = document.getElementById("playersList");
  playersList.innerHTML = ""; // リセット

  if (data.players && data.players.online > 0) {
    document.getElementById("playersOnline").textContent = `プレイヤー数: ${data.players.online}/${data.players.max}`;
    if (data.players.list) {
      data.players.list.forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player";

        const img = document.createElement("img");
        img.src = `https://minotar.net/helm/${player}/50.png`;

        const name = document.createElement("p");
        name.textContent = player;

        playerDiv.appendChild(img);
        playerDiv.appendChild(name);
        playersList.appendChild(playerDiv);
      });
    }
  } else {
    document.getElementById("playersOnline").textContent = "プレイヤーはいません。";
  }
}

fetchServerStatus();
setInterval(fetchServerStatus, 60000); // 1分ごとに更新
