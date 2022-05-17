class Api {
  static token = ""
  static async createUser(data) {
    const response = await fetch(
        "https://api-blog-m2.herokuapp.com/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return response;
  }

  static async login(data) {
    const token = await fetch(
        "https://api-blog-m2.herokuapp.com/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    Api.token = token.token


    return token;
  }

  static async posts(pagNum) {
    const response = await fetch(
        `https://api-blog-m2.herokuapp.com/post?page=${pagNum}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Api.token}`
          }
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);
    return response;
  }

  static async user(id) {
    const response = await fetch(
        `https://api-blog-m2.herokuapp.com/user/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${Api.token}`
          }
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);


    return response;
  }

  static async createPost(data) {
    const response = await fetch(
        "https://api-blog-m2.herokuapp.com/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Api.token}`
          },
          body: JSON.stringify(data),
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);
    return response;
  }

  static async editPost(data, idPost) {
    const response = await fetch(
        `https://api-blog-m2.herokuapp.com/post/${idPost}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Api.token}`
          },
          body: JSON.stringify(data),
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return response;
  }
  static async deletPost(idPost) {
    const response = await fetch(
        `https://api-blog-m2.herokuapp.com/post/${idPost}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Api.token}`
          },
        })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => error);

    return response;
  }
}

export {
  Api
}