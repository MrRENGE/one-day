function retryRequest(url, repeat, config = {}) {
  console.log(`倒数第${repeat} 请求！！！`)

  const defaultConfg = {
    method: 'Get',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  }

  let request = new Request(url, defaultConfg)

  return fetch(request).then(
    (response) => {
      const { status } = response
      // fetch 不处理 500 404 等状态码为 reject ，因此单独识别了200
      if ([200, 304].includes(status)) {
        return response
      } else {
        if (repeat <= 0) {
          return Promise.reject(response)
        }
      }

      return retryRequest(url, repeat - 1, config)
    },
    (err) => {
      // 出现网络错误，fetch 才会 reject
      if (repeat > 0) {
        return retryRequest(url, repeat - 1, config)
      }
      return Promise.reject(err)
    }
  )
}

// 测试+++++++ https://fanyi.baidu.com/pc/config?_=1649249412086
retryRequest('https://2fanyi.baidu.com/pc/config?_=1649249412086', 3).then(
  (data) => {
    data.json().then((result) => {
      console.log(result, '====data')
    })

    // data.json() , .text() .blob()
  },
  (err) => {
    console.log(err, 'err=====')
  }
)
