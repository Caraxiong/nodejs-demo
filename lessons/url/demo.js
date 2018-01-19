const url = require('url')
// const { URL } = require('url')
const myUrl = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
const myUrl1 = url.format('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
console.log(myUrl1)  //https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash

console.log(myUrl)
/*Url {
  protocol: 'https:',
  slashes: true,
  auth: 'user:pass',
  host: 'sub.host.com:8080',
  port: '8080',
  hostname: 'sub.host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' }*/

// console.log(URL)
// const myURL = new URL('https://example.org:81/foo')
// console.log(myURL.hash)  //#hash
// myURL.hash = 'aaa'
// console.log(myURL.href)  //https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash
