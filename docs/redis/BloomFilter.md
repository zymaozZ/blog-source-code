---
title: BloomFilter
date: 2020-04-14
categories: 
 - 后端
tags:
 - redis
publish: false
---

## 简介

BloomFilter，中文名：布隆过滤器

> 原理

<img src="/img/redis/BloomFilter/3.png"/>









## 添加BloomFilter模块

``` bash
git clone git@github.com:RedisBloom/RedisBloom.git

# 切换到v2.2.2的代码
git checkout v2.2.2

make

/path/to/redis-server --loadmodule ./redisbloom.so
```

要是想`redis`启动时自动加载该模块，需要在`redis.conf`中修改

<img src="/img/redis/BloomFilter/1.jpg" style="width: 700px;" />

下面到`redis-cli`中看下：

<img src="/img/redis/BloomFilter/2.jpg" style="width: 400px;" />







