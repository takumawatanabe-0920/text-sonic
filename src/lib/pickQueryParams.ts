const pickQueryParams = (params: Record<string, any>) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, value);
    }
  });
  return queryParams;
};

export default pickQueryParams;
