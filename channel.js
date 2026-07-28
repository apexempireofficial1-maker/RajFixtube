const API_KEY = 'AIzaSyDdkfPFLmxBkNTvvMvMav21mSDnD4nNyy0';

async function getChannelStats() {
  const channelId = document.getElementById('channelId').value.trim();

  if (!channelId) {
    alert('Channel ID dalo');
    return;
  }

  const api = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;

  const res = await fetch(api);
  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    document.getElementById('result').innerHTML = 'Channel not found';
    return;
  }

  const ch = data.items[0];

  document.getElementById('result').innerHTML = `
    <img src="${ch.snippet.thumbnails.high.url}" width="100%" style="border-radius:10px">
    <h3>${ch.snippet.title}</h3>
    <p><b>Subscribers:</b> ${ch.statistics.subscriberCount}</p>
    <p><b>Total Views:</b> ${ch.statistics.viewCount}</p>
    <p><b>Total Videos:</b> ${ch.statistics.videoCount}</p>
    <p><b>Created:</b> ${new Date(ch.snippet.publishedAt).toDateString()}</p>
  `;
}
