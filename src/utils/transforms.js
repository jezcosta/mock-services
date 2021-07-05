export const transformToFilePath = (servicePath) => {
  return servicePath
    .replace("/", "")
    .replace(/[\/\\]/g, "_")
    .replace(/[?]/g, "_")
    .replace(/["]/g, "_")
    .replace(/[<]/g, "_")
    .replace(/[>]/g, "_")
    .replace(/[|]/g, "_");
};

export const transformAxiosResponse = (result) => {
  const headers = result ? result.headers : {};
  delete headers["transfer-encoding"];

  const transformedResult = {
    headers,
    status: result ? result.status : 500,
    statusText: result ? result.statusText : "Timeout",
    data: result ? result.data : { error: "Timeout" },
  };

  return transformedResult;
};
