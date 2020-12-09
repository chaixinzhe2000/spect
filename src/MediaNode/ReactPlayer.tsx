import ReactPlayer from 'react-player'
import { RouteProps } from 'react-router';
import React from 'react'
import { Component } from 'react'

interface PlayerWrapperProps {
	url: string;
    setNewMediaTime: any
    mediaPlayed: number
    setMediaPlayed: any
    setMediaDuration: any
    mediaPlaying: boolean
    setMediaPlaying: any
    // setPreviouslyPaused: any
    mediaSkipUsingAnnotation: boolean
    setMediaSkipUsingAnnotation: any
}

class PlayerWrapperClass extends Component<PlayerWrapperProps> {
	player: any;

	ref = player => {
		this.player = player
	}

	state = {
		url: null,
        pip: false,
        seeking: false,
		playing: this.props.mediaPlaying,
		controls: true,
		light: false,
		volume: 0.8,
		muted: false,
		played: this.props.setMediaPlayed,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
        loop: false,
	}

	handlePause = () => {
        console.log('onPause')
        // this.props.setMediaPlayed()
        this.props.setMediaPlaying(false)
        this.props.setNewMediaTime(this.state.played * this.state.duration)
        if (this.props.mediaPlayed !== -1){
            this.handleSeek()
            this.props.setMediaPlayed(-1)
        }
	}

	handlePlay = () => {
		console.log('onPlay')
        if (this.props.mediaPlayed !== -1){
            this.handleSeek()
            this.props.setMediaPlayed(-1)  
        }
        this.props.setMediaPlaying(true)
	}

	handleEnded = () => {
        this.setState({preventRerender : false})
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
        this.setState({preventRerender : true})
	}

	handleProgress = state => {
		console.log('onProgress', state)
		// We only want to update time slider if we are not currently seeking
        this.setState(state)
        if (this.props.mediaPlayed !== -1){
            this.handleSeek()
            this.props.setMediaPlayed(-1)
        }
	}

	handleDuration = (duration) => {
		console.log('onDuration', duration)
        this.setState({ duration })
        this.props.setMediaDuration(duration)
	}

    handleSeek = () => {
        console.log("seeking")
        this.setState({seeking: true})
        this.setState({played: this.props.mediaPlayed})
        this.player.seekTo(this.props.mediaPlayed)
        this.setState({seeking: false})
        this.props.setMediaPlaying(true)
    }

	render() {
		return (
			<div className='player-wrapper'>
				<ReactPlayer
					className='react-player'
					ref={this.ref}
					url={this.props.url}
					width='100%'
                    height='100%'
                    played = {this.props.mediaPlayed}
					playing={this.props.mediaPlaying}
					controls={this.state.controls}
					playbackRate={this.state.playbackRate}
					onReady={() => console.log('onReady')}
					onStart={() => console.log('onStart')}
					onPlay={this.handlePlay}
					onPause={this.handlePause}
					onBuffer={() => console.log('onBuffer')}
					onSeek={e => console.log('onSeek', e)}
					onEnded={this.handleEnded}
					onError={e => console.log('onError', e)}
					onProgress={this.handleProgress}
					onDuration={this.handleDuration}
				/>
			</div>
		)
	}
}

export default PlayerWrapperClass