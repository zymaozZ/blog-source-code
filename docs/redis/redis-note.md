---
title: redis 笔记
date: 2019-12-09
categories:
 - 技术
tags:
 - redis
publish: false
---



## 缓存雪崩

redis缓存所有key全部失效，请求本来是要经过redis的，现在都直接到了DB，数据库就扛不住了。就算重启数据库，新的请求还是直接打到DB上，又被新的流量给打死了。（同一时间大规模的缓存失效）

> 解决方案

* 设置不同的key过期时间

## 缓存穿透

查询数据库中不存在的数据

> 解决方案

* 设置空值。数据库中不存在时，给key的value设置为null，并且设置过期时间，存到redis中。
* 布隆过滤器。（有就走缓存，没有就直接返回null）

## 缓存击穿

大量请求同时查询某个key，该key正好失效。请求全部到了数据库

> 解决方案

* 设置分布式锁





## Redis持久化

RDB做镜像全量持久化，AOF做增量持久化。

[Redis 两种持久化方式（博客园）](https://www.cnblogs.com/tdws/p/5754706.html)



##  set 取数据

> set 集合

sinter 交集

Sunion 并集

Sdiff 差集

## 秒杀

<img src="/img/base/秒杀.jpg">

## 进程 线程 协程

[进程 线程 协程](https://www.cnblogs.com/lxmhhy/p/6041001.html)

## http

[http](https://segmentfault.com/a/1190000021551892)





最小堆