async function fetchServerStatus() {
  try {
    const [serverRes, opRes] = await Promise.all([
      fetch("https://api.mcsrvstat.us/3/mc.sakurahp.f5.si"),
      fetch("/player/oplist.json")
    ]);

    const serverData = await serverRes.json();
    const opData = await opRes.json();
    const opPlayers = opData.op_players || [];

    // サーバー基本情報表示
    document.getElementById("host").textContent = `ホスト名: ${serverData.hostname || "-"}`;
    document.getElementById("status").textContent = serverData.online ? "オンライン" : "オフライン";
    document.getElementById("status").className = serverData.online ? "online" : "offline";
    document.getElementById("cache").textContent = `キャッシュ: ${new Date(serverData.debug.cachetime * 1000).toLocaleString()}`;
    document.getElementById("bedrock").textContent = `統合版対応: ${serverData.debug.bedrock ? "はい" : "いいえ"}`;
    document.getElementById("version").textContent = `サーバーバージョン: ${serverData.version || "不明"}`;
    document.getElementById("ip").textContent = `IP: ${serverData.ip}`;
    document.getElementById("port").textContent = `ポート: ${serverData.port}`;
    document.getElementById("motd").textContent = `MOTD: ${serverData.motd?.clean?.join(" ") || "なし"}`;
    
    if (serverData.icon) {
      document.getElementById("icon").src = serverData.icon;
    }

    // プレイヤーリストの処理
    const playersListDiv = document.getElementById("playersList");
    playersListDiv.innerHTML = "<h2>現在のプレイヤー</h2>";
    const players = serverData.info?.raw || [];

    if (players.length === 0) {
      playersListDiv.innerHTML += "<p>プレイヤー情報が取得できませんでした。</p>";
      return;
    }

    const ul = document.createElement("ul");

    players.forEach(player => {
      const li = document.createElement("li");
      li.textContent = player;

      // OP判定
      if (opPlayers.includes(player)) {
        li.classList.add("op-player"); // CSSで色など変える用
      }

      // 統合版判定（ドットから始まる名前）
      if (player.startsWith(".")) {
        li.classList.add("bedrock-player"); // CSSで薄くしたり
      }

      ul.appendChild(li);
    });

    playersListDiv.appendChild(ul);
  } catch (error) {
    console.error("取得エラー:", error);
    document.getElementById("playersList").innerHTML = "<p>情報取得中にエラーが発生しました。</p>";
  }
}

fetchServerStatus();
