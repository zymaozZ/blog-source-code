### 背景

---

首页的文章列表如下图：

<img src="/Users/mzy/Downloads/1.png" width = "400" />

视频文章上线后，希望如果是视频类型的文章，将封面缩略图由静态图转为动态的gif图



### 需求

---

* 视频文章发布后，自动生成gif封面图

### 思路和调研

---

* 每发一篇文章就
* 视频生成gif图片可以由ffmpeg实现，  基础命令为：`ffmpeg -ss 0 -t 8 -i /video_path.mp4  -r 15 gif_path.gif`。其中 `-ss time off : set the start time offset`，`-t duration : record or transcode "duration" seconds of audio/video`，`-r rate ： set frame rate (Hz value, fraction or abbreviation)`

### 实现

---

* 设计两类 redis的key。一个是视频的`list`，一个category_id 的`zset`，每发一篇视频文章就往对应的list:{category_id)中 push 文章id；另一个是 user_id 的`zset`，`member` 为 category_id, `score` 为 用户看过的 list:{category_id} 的 offset。用户每次请求视频文章接口，先拿offset，再`lrange key offset expectedCount`
* 用户每次请求接口，从redis 的 list:{category_id}中取出10个，并且记录下用户看到了哪里（offset），已看完的置为负数。（没有取够10个时，会用zrangebyscore，找出未看完的offset最小那个category_id，递归继续取。如果全部取完了。就将所有category_id的`zset`重置回初始状态）

