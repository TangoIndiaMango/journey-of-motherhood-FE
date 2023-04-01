const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const registerUrl = baseUrl + "/user/register/";
const loginUrl = baseUrl + "/user/login/";
const refreshUrl = baseUrl + "/user/refresh/";
const getQuotesUrl = baseUrl + "/quote/";
const getAllpostsUrl = baseUrl + "/post/all/";
const profileUrl = baseUrl + "/user/profile/";
const postsUrl = baseUrl + "/post/";

export {
  baseUrl,
  registerUrl,
  loginUrl,
  refreshUrl,
  getQuotesUrl,
  getAllpostsUrl,
  profileUrl,
  postsUrl,
};
