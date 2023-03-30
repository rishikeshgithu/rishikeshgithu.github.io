function elems(e){return document.querySelectorAll(e)}
function elem(e){let t=elems(e);
  if(1!==t.length)throw"expected 1 but "+t.length+" matches found for "+e;
  return t[0]}const video_id_regex=/^[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]$/;
  let is_youtube_iframe_api_ready=!1,video_id=null,player=null;
  function onYouTubeIframeAPIReady(){is_youtube_iframe_api_ready=!0,load()}
  function go(){try{let e=new URL(elem("#link-text").value);
  if("https:"!==e.protocol&&"http:"!==e.protocol)throw 0;
  if("youtu.be"===e.host&&"/"===e.pathname[0]&&(video_id=e.pathname.substring(1)),"www.youtube.com"===e.host&&"/watch"===e.pathname){let t=e.searchParams.getAll("v");
  1===t.length&&(video_id=t[0])}if(null===video_id)throw 0;
  if(!video_id_regex.test(video_id))throw video_id=null,0}catch(e){video_id=null,alert(["Please enter a valid YouTube URL.","Examples:","https://youtu.be/<video-id>","https://www.youtube.com/<video-id>"].join("\n"))}null!==video_id&&(load(),elem("#link-text").disabled=!0,elem("#link-go").disabled=!0)}function load(){null!==video_id&&(elem("#loading").style.display="",is_youtube_iframe_api_ready&&(player=new YT.Player("player",{width:"100%",videoId:video_id,playerVars:{playsinline:1},events:{onReady:on_player_ready}})))}function on_player_ready(){elem("#loading").style.display="none",elem("#controls").style.display=""}window.addEventListener("DOMContentLoaded",()=>{elem("#link-go").addEventListener("click",go),elem("#play-pause").addEventListener("click",play_or_pause),elem("#repeat-skip").addEventListener("click",repeat_or_skip),setInterval(update_repeat,100)});
  let app={start_times:[0],current_index:0,is_playing:!1,repeat_count:0};
  function play_or_pause(){app.is_playing?pause():play()}function pause(){app.is_playing&&(app.is_playing=!1,elem("#play-pause").value="Play",player.pauseVideo())}function play(){app.is_playing||(app.is_playing=!0,elem("#play-pause").value="Pause",player.playVideo())}function repeat_or_skip(){0!==app.repeat_count?skip():repeat()}function update_repeat(){if(0!==app.repeat_count&&!(player.getCurrentTime()<app.start_times[app.current_index+1]))if(1!==app.repeat_count){if(2!==app.repeat_count)throw app.repeat_count;skip()}else repeat_again()}function skip(){0!==app.repeat_count&&(elem("#repeat-skip").value="Repeat",pause(),app.current_index+=1,app.repeat_count=0,player.seekTo(app.start_times[app.current_index]))}function repeat(){if(0!==app.repeat_count)return;elem("#repeat-skip").value="Skip";let e=player.getCurrentTime(),t=app.start_times.length-1;
  if(e>app.start_times[t]+1)app.start_times.push(e);else{let a;
    for(a=t-1;a>=0;--a)if(e>=app.start_times[a]){app.current_index=a;break}if(a<0)throw"Could not locate segment to repeat!"}app.repeat_count=1,player.seekTo(app.start_times[app.current_index]),play()}function repeat_again(){1===app.repeat_count&&(app.repeat_count=2,player.seekTo(app.start_times[app.current_index]))}
