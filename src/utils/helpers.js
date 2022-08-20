export const getError = (error) => {
  if (error.name === "Fetch User") {
    return error.message;
  }

  if (!error.response) {
    console.info(`API: ${error.config?.url} не найден`);
    console.info(error);
    return "Ошибка запроса API, пожалуйста, повторите попытку";
  }
  if (import.meta.env.DEV) {
    console.group("dev error info");
    console.info("[DATA]", error.response.data);
    console.info(`[STATUS] ${error.response.status}`);
    console.info("[HEADERS]", error.response.headers);
    console.groupEnd();
  }
  if (error.response.data && error.response.data.errors) {
    return error.response.data.errors;
  }
  if (error.response.data && error.response.status === 403) {
    return error.response.data.message;
  }
  return null;
};
