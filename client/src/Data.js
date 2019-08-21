export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    credentials = null,
    requiresAuth = false
  ) {
    let options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (body !== null) {
      options.body = body;
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.userName}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(path, options);
  }
}
