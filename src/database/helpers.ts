import {
	failureServiceResponse,
	IServiceResponse,
	successfulServiceResponse,
	ILink,
} from "spectacle-interfaces";

export interface IMongoLink {
	_id: string; // replaces linkId
	srcAnchorId?: string;
	destAnchorId?: string;
	srcNodeId?: string;
	destNodeId?: string;
	createdAt?: Date;
}

function isLink(link: any): boolean {
	try {
		let fieldCount: number = 0
		if (link.srcAnchorId !== undefined && typeof link.srcAnchorId === "string" && link.srcAnchorId.length > 0)
			fieldCount++
		if (link.destAnchorId !== undefined && typeof link.srcAnchorId === "string" && link.srcAnchorId.length > 0)
			fieldCount++
		if (link.srcNodeId !== undefined && typeof link.srcAnchorId === "string" && link.srcAnchorId.length > 0)
			fieldCount++
		if (link.destNodeId !== undefined && typeof link.srcAnchorId === "string" && link.srcAnchorId.length > 0)
			fieldCount++
		if (fieldCount === 2)
			return true
		return false
	} catch {
		return false
	}
}
export function getMongoLink(link: ILink): IServiceResponse<IMongoLink> {
	try {
		let mongolink: IMongoLink = {
			_id: link.linkId.toLocaleLowerCase(),
			srcAnchorId: link.srcAnchorId,
			destAnchorId: link.destAnchorId,
			srcNodeId: link.srcNodeId,
			destNodeId: link.destNodeId,
			createdAt: new Date(),
		};
		if (tryGetLink(mongolink).success && isLink(link)) {
			return successfulServiceResponse(mongolink);
		}
		return failureServiceResponse(
			"Failed to parse ILink into IMongoNode, verify that the ILink passed in is valid."
		);
	} catch {
		return failureServiceResponse(
			"Failed to parse ILink into IMongoNode, verify that the ILink passed in is valid."
		);
	}
}

export function tryGetLink(mongoLink: IMongoLink): IServiceResponse<ILink> {
	if (mongoLink._id !== undefined && typeof mongoLink._id === "string" &&
		mongoLink._id.length > 0 && isLink(mongoLink))
		return successfulServiceResponse({
			linkId: mongoLink._id,
			srcAnchorId: mongoLink.srcAnchorId,
			destAnchorId: mongoLink.destAnchorId,
			srcNodeId: mongoLink.srcNodeId,
			destNodeId: mongoLink.destNodeId,
		});
	return failureServiceResponse("Invalid node");
}
