class api {
  constructor(url) {
    this.url = url
  }

  async get(url, headers) {
    return await this.request('get', url, headers)
  }

  async post(url, headers, body) {
    if (body) {
      body = JSON.stringify(body)
    }
    return await this.request('post', url, body, headers)
  }

  async put(url, headers, body) {
    if (body) {
      body = JSON.stringify(body)
    }
    return await this.request('put', url, body, headers)
  }

  async delete(url, headers, body) {
    if (body) {
      body = JSON.stringify(body)
    }
    return await this.request('delete', url, body, headers)
  }

  async upload(url, headers, body) {
    return await this.request('post', url, body, headers)
  }

  async request(method, url, body, headers) {
    if (!headers) {
      headers = {}
    }
    if(localStorage.getItem('token')){
      headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    headers["Content-Type"] = 'application/json'
    headers["Accept"] = 'application/json'
    let data = {
      method: method,
      headers: headers,
      body: body,
    }
    return await fetch(this.url + url, data)
      .then(response => response.json())
      .then((res) => {
        return res
      })
      .catch((err) => {
        return []
      })
  }
  async userRefresh() {
  }
  async userLogout() {
  }
  async userLogin() {
  }
  async userRegistration() {
  }
  async userSelf() {
  }
}

export default api
