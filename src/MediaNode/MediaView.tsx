import React, { useEffect, useState } from 'react';
import { Button, Divider, NonIdealState, TextArea, Intent } from '@blueprintjs/core';
import { IMediaAnchor, IMediaNode } from 'spectacle-interfaces';
import ReactPlayer from 'react-player'

interface NodeProps {
	node: IMediaNode
	anchor: IMediaAnchor
	previewAnchor: IMediaAnchor
	setAnchor: (anchor: IMediaAnchor) => void
	addNode: (mediaUrl: string) => void
	anchors: IMediaAnchor[]
	selectedAnchorId: string
}

function MediaView(props: NodeProps): JSX.Element {
	const { node, anchor, anchors, setAnchor, addNode, previewAnchor, selectedAnchorId } = props
	const [mediaUrl, setMediaUrl]: [string, any] = useState('')
	const [description, setDescription]: [string, any] = useState('You are one step away from creating a video node...')
	const [highlightedAnchors, setHighlightedAnchors]: [IMediaAnchor[], any] = useState([])
	const [played, setPlayed] = useState(0)
	
	useEffect(() => {
		async function setAnchors() {
			await setHighlightedAnchors([])
			if (previewAnchor)
				setHighlightedAnchors([previewAnchor])
			else if (anchor)
				setHighlightedAnchors([anchor])
			else {
				const selectedAnchor = anchors.find(anc => anc.anchorId === selectedAnchorId)
				if (selectedAnchor)
					setHighlightedAnchors([selectedAnchor])
				else
					setHighlightedAnchors(anchors)
			}
		}
		setAnchors()
	}, [previewAnchor, anchor, anchors])

	if (node) {
		console.log(node)
		return (
			<div className='player-wrapper'>
				<ReactPlayer
					className='react-player'
					url={node.mediaUrl}
					width='100%'
					height='100%'
				/>
			</div>
		)
	} else {
		return <NonIdealState
			icon="video"
			title="Add a Video/Audio URL"
			description={description}
			action={
				<div>
					<TextArea fill={true} onChange={s => setMediaUrl(s.target.value)} value={mediaUrl} />
					<Divider />
					<Button onClick={() => {
						if (mediaUrl) {
							addNode(mediaUrl)
							// setMediaUrl("")
							setDescription("You are one step away from creating a video node...")
						}
						else
							setDescription("Media URL cannot be empty.")
					}}> Add Media + </Button>
				</div>
			}
		/>
	}
}

export default MediaView