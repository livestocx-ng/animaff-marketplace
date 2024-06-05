'use client';
import YouTube from 'react-youtube';

const YoutubeVideoPlayer = ({videoId}: {videoId: string}) => {
	const opts = {
		width: '100%',
		height: '100%',
		playerVars: {
			rel: 0,
			autoplay: 0,
			mute: 1,
		},
	};

	const onReady = (event: any) => {
		const player = event.target;

		// player.playVideo();
	};

	const onError = (error: any) => {
		// console.error('YouTube Player Error:', error);
	};

	return (
		<YouTube
			opts={opts}
			videoId={videoId}
			onReady={onReady}
			onError={onError}
			className='object-cover h-full w-full absolute'
		/>
	);
};

export default YoutubeVideoPlayer;
