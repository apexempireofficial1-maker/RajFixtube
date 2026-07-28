const API_KEY = 'AIzaSyDdkfPFLmxBkNTvvMvMav21mSDnD4nNyy0';

function extractVideoId(url){
  const reg = /(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([^&\\n?#]+)/;
  const match = url.match(reg);
  return match ? match[1] : null;
}

async function getStats(){
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoId(url);

  if(!videoId){
    alert('Invalid YouTube URL');
    return;
  }

  const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;

  const res = await fetch(api);
  const data = await res.json();

  if(data.items.length === 0){
    document.getElementById('result').innerHTML = 'Video not found';
    return;
  }

  const video = data.items[0];

  document.getElementById('result').innerHTML = `
    <img src="${video.snippet.thumbnails.high.url}" width="100%" style="border-radius:10px">
    <h3>${video.snippet.title}</h3>
    <p><b>Channel:</b> ${video.snippet.channelTitle}</p>
    <p><b>Views:</b> ${video.statistics.viewCount}</p>
    <p><b>Likes:</b> ${video.statistics.likeCount || 0}</p>
    <p><b>Comments:</b> ${video.statistics.commentCount || 0}</p>
  `;
}
