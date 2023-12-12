const interceptor = (axiosInstance) => (error) => {
  console.log('axios Response!!!!!!!!!');
  const _axios = axiosInstance;
  const originalRequest = error.config;
  console.log(originalRequest);
  console.log(_axios);
  return Promise.reject(error);
};

export default interceptor;
