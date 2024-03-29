// YouTube video ID
const videoID = 'xB4ZfADPd6k';

// Create YouTube player
let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('background-video', {
		videoId: videoID,
		playerVars: {
			autoplay: 1,
			controls: 0,
			showinfo: 0,
			modestbranding: 1,
			disablekb: 1,
			enablejsapi: 0,
			loop: 1,
			playlist: videoID,
			fs: 0,
			cc_load_policy: 0,
			iv_load_policy: 3,
			autohide: 1,
			mute: 1
		},
		events: {
			onReady: onPlayerReady
		}
	});
}

function onPlayerReady(event) {
	event.target.mute();
	event.target.playVideo();
}
