/* PROD */
// export const URL = 'https://cces-site.vercel.app';

/* DEVELOP */
export const URL = 'https://cces-develop.vercel.app';

/* LOCAL */
// export const URL = 'http://localhost:3000';


export const customHeaders = new Headers();
customHeaders.append('pragma', 'no-cache');
customHeaders.append('cache-control', 'no-cache');
customHeaders.append('Content-Type', 'application/json');