import checkUrl from './UrlChecker.js'

const list = ['google.com', 'www.zoom.us']

const valid =  await Promise.all(list.map(x => !checkUrl(x)))

console.log(valid)