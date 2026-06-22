import { handleVideosRequest } from '../../src/api/videosHandler';

// Simple Express Request/Response mock for Netlify Functions (v1)
export const handler = async (event: any, context: any) => {
  return new Promise((resolve) => {
    let statusCode = 200;
    
    const req = {
      query: event.queryStringParameters || {},
    };

    const res = {
      status: (code: number) => {
        statusCode = code;
        return res;
      },
      json: (data: any) => {
        resolve({
          statusCode,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      },
    };

    handleVideosRequest(req, res).catch((err: any) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: err.message || 'Internal Server Error' })
      });
    });
  });
};
