import { environment } from "../../assets/environments/environment";

export const API = {
  GET_PRODUCT: `${environment.gateway}extract-images`,
};


export let URL_HANDLER: any = {};

export function setUrlHandler(url: any) {
  URL_HANDLER = url;
}