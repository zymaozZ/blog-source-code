---
title: 视频添加GIF封面图片
date: 2019-12-10
categories:
 - 技术
tags:
 - 工作笔记
 - ffmpeg
 - redis
---

## 背景

首页的文章列表如下图：

<img src="/img/work/首页文章.png" width = "300" />

视频文章上线后，希望`视频类型`的文章，将封面图由静态JPG图转为动态的GIF图

## 需求

* 视频文章发布后，自动生成GIF封面图。
* 首页接口返回的文章，如果是视频文章，并且生成了GIF图，就用GIF图作为封面。否则还是用JPG作为封面

## 思路和调研

* 每发一篇文章就自动 `MP4 `转`GIF`。

    > 同步执行：
    >
    > ​		生成GIF图片并且上传成功，才能返回发文章成功到客户端
    >
    > ​		可能发生网络延迟或者突然宕机
    >
    > 决定将发文章和生成GIF图异步执行

* 异步执行时，每发一篇文章就把文章id塞到队列中，再轮询或者监听队列

    > Redis中有blpop命令可以实现需求。list中有值时就pop出来。为空时就会阻塞
    
* 视频生成GIF图片可以由ffmpeg实现。

    > 基础命令为：`ffmpeg -ss 0 -t 8 -i /video_path.mp4  -r 15 gif_path.gif`。
    >
    >  `-ss time off  set the start time offset`
    >
    > `-t duration  record or transcode "duration" seconds of audio/video`
    >
    > `-r rate  set frame rate (Hz value, fraction or abbreviation)`

## 实现

* 表中添加字段`status`标志生成GIF图的状态。`0`表示未生成GIF图，`5`表示已生成GIF图。

    > 间隔取大点，要是后期需要在两个状态中间再加状态，更方便维护

* PHP

    > 1. 文章id塞到队列
    > 2. 回调中修改状态，标志已生成GIF图。文章取封面时就可以直接根据状态字段获取

* Go

    >生成GIF算是一个服务，尝试用Go，生成GIF图且上传成功之后，回调PHP

* Redis

    > 上传成视频文章之后，将文章的id`rpush`到队列`video_url_list`中，`blpop`监听队列
    >
    > 为了让服Go服务中的代码相对简单。将回调地址和文章id合并成json塞到队列中（尽量做到单一职责）
    >
    > `video_url_list` 中每个元素为{"subject_id":1,"callback":"http://callback?subject_id=1"}

* ffmpeg

    > 生成GIF图时，文件大小相对较小，质量相对高清的命令：
    >
    > ffmpeg -filter_complex "[0:v] fps=12,scale=480:-1" -ss 0 -t 2 -i video.mp4 -loglevel quiet -hide_banner -stats -f gif -
