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
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.email}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(path, options);
  }

  async getCourses() {
    const res = await this.api("/courses");
    const data = await res.json();
    if (res.status === 200) {
      return await data.courses;
    } else {
      throw new Error();
    }
  }

  async getCourse(courseId) {
    const res = await this.api(`/courses/${courseId}`);

    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }

  async getUser(email, password) {
    const res = await this.api(
      "/users",
      "GET",
      null,
      { email, password },
      true
    );

    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(firstName, lastName, emailAddress, password) {
    const body = { firstName, lastName, emailAddress, password };
    const res = await this.api("/users", "POST", body);

    if (res.status === 201) {
      return { created: true, errors: [] };
    } else if (res.status === 400) {
      const data = await res.json();
      const messages = await data.error.message;
      return { created: false, errors: messages };
    } else {
      throw new Error();
    }
  }
}
