import SecureLS from "secure-ls";
let ls = new SecureLS({ encodingType: "rc4", isCompression: true });

export const getStoredAuthToken = () => ls.get("token");
const [header, payload,   ] = getStoredAuthToken().split('.');

const decodedHeader = JSON.parse(atob(header));
const decodedPayload = JSON.parse(atob(payload));
export const storeAuthToken = (token) => ls.set("token", token);
const decodedToken = decodedPayload
export const getClientUser = ()=> {
  return {...decodedToken,password:null} }
export const removeStoredAuthToken = () => {
  ls.remove("token");
};
