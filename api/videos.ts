import { handleVideosRequest } from '../src/api/videosHandler';

// Vercel Serverless Function entry point
export default async function handler(req: any, res: any) {
  // Pass to the generic handler
  return handleVideosRequest(req, res);
}
