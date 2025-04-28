export const API = {
  GET_PRODUCT: 'http://localhost:3000/extract-images',
};


export let URL_HANDLER: any = {};

export function setUrlHandler(url: any) {
  URL_HANDLER = url;
}