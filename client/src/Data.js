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
        `${credentials.email}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(path, options);
  }

  async getCourses() {
    const res = await this.api("/courses");
    if (res.status === 200) {
      return await res.json().courses;
    } else {
      throw new Error();
    }
  }

  async getUser(email, password) {
    const res = await this.api(
      "/users",
      "GET",
      null,
      { userName: email, password },
      true
    );

    if (res.status === 200) {
      return await res.json().users;
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(firstName, lastName, email, passWord) {
    const body = { firstName, lastName, email, passWord };
    const res = await this.api("/users", "POST", body);

    if (res.status === 201) {
      return await { created: true };
    } else if (res.status === 400) {
      return { created: false, errors: await res.json().error };
    } else {
      throw new Error();
    }
  }
}
