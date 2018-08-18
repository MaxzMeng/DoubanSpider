# DoubanSpider
nodejs实现的豆瓣电影爬虫
# 使用方法
本项目使用nodejs编写，首先需要配置nodejs的环境

将项目下载后 使用npm install命令安装
使用node bin/www命令运行项目

# 基本功能
访问地址为127.0.0.1:3000/movie
基本API使用方法与豆瓣官网提供的API一致
# 其他功能
## 短评
请求地址：127.0.0.1:3000/movie/comment/{movieId}?page={pageCount}

如：http://127.0.0.1:3000/movie/comment/3742360?page=0

返回得数据类型为一个列表，列表中的单项如下所示

```json
{
"doubanId": 184507528,
"name": "木卫二",
"avatar": "https://img1.doubanio.com/icon/u1128221-98.jpg",
"votes": 7968,
"text": "你给我翻译翻译，神马叫做TMD的惊喜！幽默、炫酷、西部片，自恋、隐喻、男性化，黑色、血腥、怪点子，卖腐、露点、性暗示，酒神、荒诞、神经错乱，草莽气息、英雄情结、革命浪漫主义外加一分的孤独。",
"time": "2010-12-04",
"rate": 40
}
```

分别对应

```
doubanId:发表评论人的豆瓣ID
name:发表评论人的豆瓣名称
avatar:发表评论人的头像
votes:该评论收到多少赞同
text:评论内容
time:发表时间
rate:评分 满分50
```

## 热门电影
对应[豆瓣热门](https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0)页面

请求地址：http://127.0.0.1:3000/movie/movie_hot

返回数据同样为一个列表，列表中的单项如下所示

```json
{
"doubanId": 26588308,
"img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2521499639.jpg",
"name": "死侍2"
}
```

分别对应

```
"doubanId": 该电影对应的豆瓣ID
"img": 该电影的海报图片地址
"name": 电影名称
```

## 即将上映

对应[即将上映](https://movie.douban.com/cinema/later/beijing/)页面

请求地址http://127.0.0.1:3000/movie/coming_soon?city={cityName}

如：http://127.0.0.1:3000/movie/coming_soon?city=beijing

**实践发现该接口切换城市之后内容基本都是一样的，顾可以不加cityName这个参数使用默认的beijing即可**

返回数据同样为一个列表，列表中的单项如下所示

```json
{
"doubanId": 27119292,
"avatar": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2530569532.webp",
"name": "大三儿",
"date": "08月20日",
"label": "纪录片",
"area": "中国大陆",
"like": 5125
}
```

分别对应

```
"doubanId": 电影对应的豆瓣ID
"avatar": 电影的海报图片地址
"name": 电影名称
"date": 电影上映的时间
"label": 电影类型
"area": 电影上映的区域
"like": 想看的人数
```

## 喜欢这部电影的人也喜欢

对应电影详情页下*喜欢这部电影的人也喜欢*部分

请求地址：http://127.0.0.1:3000/movie/movie_like/{doubanId}

如：http://127.0.0.1:3000/movie/movie_like/3742360

返回数据同样为一个列表，列表中的单项如下所示

```json
{
"doubanId": 1293350,
"img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792443418.webp",
"name": "两杆大烟枪"
}
```

各项数据对应的内容与热门电影一致

## 城市选择数据

在选择城市时可能会用到的数据

请求地址：http://127.0.0.1:3000/movie/city

返回数据同样为一个列表，列表中的单项如下所示

```json
{
"id": 1,
"name": "北京",
"alias": "beijing",
"cities":[
		{"id": 1, "name": "北京", "alias": "beijing"}
	]
}
```

分别对应

```
"id": 该省对应的ID
"name": 该省的名字
"alias": 该省份的拼音
"cities":该省下的所有城市组成的列表
```

其中cities中的数据同样为一个列表且各项数据所对应的含义与省基本一致