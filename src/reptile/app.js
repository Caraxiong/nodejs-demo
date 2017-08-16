const eventproxy = require('eventproxy')
const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
const url = require('url')
const reptileUrl = 'https://cnodejs.org/'

const port = 3000
const hostname = '127.0.0.1'

const app = express()
app.get('/',(req, res, next) => {
    console.log(url.parse('https://cnodejs.org/topic/58ad76db7872ea0864fedfcc'))
    superagent.get(reptileUrl)
        .end((err,sres) => {
            if(err){
                return next(err)
            }
            //处理一级页面
            let $ = cheerio.load(sres.text)
            //存放一级页面爬出来的数据
            let items = []
            //存放二级页面url
            let topicUrls = []
            $('#topic_list .topic_title').each((idx, ele) => {
                let $ele = $(ele)
                items.push({
                    title: $ele.attr('title'),
                    href: $ele.attr('href')
                })
                let href = url.resolve(reptileUrl,$ele.attr('href'))
                topicUrls.push(href)
            })
        //    res.send(items)
        //爬取一级页面标签上的链接
        let ep = new eventproxy()
        ep.after('topic_html',topicUrls.length,(topics) => {
            topics = topics.map((topicPair) => {
                let topicUrl = topicPair[0]
                let topicHtml = topicPair[1]
                let $ = cheerio.load(topicHtml)
                return ({
                    title:$('.topic_full_title').text().trim(),
                    href:topicUrl,
                    comment:$('.reply_content').eq(0).text().trim()
                })
            })
            res.send(topics)
        })

        topicUrls.forEach((topicUrl) => {
            superagent.get(topicUrl)
                .end((err,res) => {
                    if(err){
                        console.log(err)
                    }
                    console.log('fetch '+topicUrl+' successful')
                    ep.emit('topic_html',[topicUrl, res.text])
                })
        })
    })
})
app.listen(port,hostname,() => {
    console.log('hostname is '+ hostname + ', port is ' + port)
})
