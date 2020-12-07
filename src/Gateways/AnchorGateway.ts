import { failureServiceResponse, IAnchor, IAnchorGateway, IServiceResponse } from "spectacle-interfaces";
import { get, post, put, remove } from "./request";
import { AnchorGatewayEndpoint } from "../GatewayConfig";

let base_endpoint = AnchorGatewayEndpoint

if (process.env.REACT_APP_BACKEND_ENV === 'development') {
	base_endpoint = "http://localhost:8081"
}

const servicePath = '/anchor'

const AnchorGateway: IAnchorGateway = {
	updateLastAnnotation: async (anchorId: string, newAnnotation: string, newAuthor: string): Promise<IServiceResponse<IAnchor>> => {
		const raw = { "annotation": newAnnotation, "author": newAuthor };
		const fullUrl = `${base_endpoint}${servicePath}/${anchorId}/update/`
		try {
			const response: IServiceResponse<IAnchor> = await put<IServiceResponse<IAnchor>>(fullUrl, raw);
			return response
		} catch (e) {
			return failureServiceResponse("Failed to update last annotation. " + e)
		}
	},

	addNewAnnotation: async (anchorId: string, newAnnotation: string, newAuthor: string): Promise<IServiceResponse<IAnchor>> => {
		const raw = { "annotation": newAnnotation, "author": newAuthor };
		const fullUrl = `${base_endpoint}${servicePath}/${anchorId}/createnew/`
		try {
			const response: IServiceResponse<IAnchor> = await put<IServiceResponse<IAnchor>>(fullUrl, raw);
			return response
		} catch (e) {
			return failureServiceResponse("Failed to add new annotation. " + e)
		}
	},

	createAnchor: async (node: IAnchor): Promise<IServiceResponse<IAnchor>> => {

		const raw = { "data": node };
		const fullUrl = `${base_endpoint}${servicePath}/`

		try {
			const response: IServiceResponse<IAnchor> = await post<IServiceResponse<IAnchor>>(fullUrl, raw);
			return response

		} catch (e) {
			return failureServiceResponse("Failed to create node. " + e)
		}
	},

	getAnchor: async (anchorId: string): Promise<IServiceResponse<IAnchor>> => {

		try {
			const fullUrl = `${base_endpoint}${servicePath}/${anchorId}`
			const response: IServiceResponse<IAnchor> = await get<IServiceResponse<IAnchor>>(fullUrl);
			return response
		} catch (e) {
			return failureServiceResponse('Failed to call getAnchor endpoint.')
		}
	},

	getNodeAnchors: async (nodeId: string): Promise<IServiceResponse<{ [anchorId: string]: IAnchor }>> => {

		try {
			const fullUrl = `${base_endpoint}${servicePath}/node/${nodeId}`
			const response: IServiceResponse<{ [anchorId: string]: IAnchor }> = await get<IServiceResponse<{ [anchorId: string]: IAnchor }>>(fullUrl);
			return response
		} catch (e) {
			return failureServiceResponse('Failed to call getAnchor endpoint.')
		}
	},

	deleteAnchor: async (nodeId: string): Promise<IServiceResponse<{}>> => {
		try {
			const fullUrl = `${base_endpoint}${servicePath}/${nodeId}`
			const response: IServiceResponse<{}> = await remove<IServiceResponse<{}>>(fullUrl);
			return response

		} catch (e) {
			return failureServiceResponse('Failed to call deleteAnchor endpoint.')
		}
	},

	deleteNodeAnchors: async (nodeId: string): Promise<IServiceResponse<number>> => {

		try {
			const fullUrl = `${base_endpoint}${servicePath}/node/${nodeId}`
			const response: IServiceResponse<number> = await remove<IServiceResponse<number>>(fullUrl);
			return response
		} catch (e) {
			return failureServiceResponse('Failed to call getAnchor endpoint.')
		}
	},
}

export default AnchorGateway
