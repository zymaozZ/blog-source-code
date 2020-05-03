---
title: scan 命令
date: 2019-12-09
categories:
 - 技术
tags:
 - redis
---

## keys

有个需求需要获取全部的key，本来想用`keys pattern*`，后来看到文章里面写生产环境最好不用`keys`命令，可以用`scan`命令。看了下文档，里面有这么一句：

> **Warning**: consider [KEYS](https://redis.io/commands/keys) as a command that should only be used in production environments with extreme care. It may ruin performance when it is executed against large databases. 
>
>  Don't use [KEYS](https://redis.io/commands/keys) in your regular application code. If you're looking for a way to find keys in a subset of your keyspace, consider using [SCAN](https://redis.io/commands/scan) or [sets](https://redis.io/topics/data-types#sets).
>
> 大概意思是说`keys`命令用在生产环境时要非常谨慎，当数据量很大时可能会崩溃。不要在代码中用`keys`命令，想获取`key`时可以用`scan`或是`set`

我本地试了下往redis中插入了5W个key，用`keys key:*`查看，速度还是很快

<img src="/img/redis/scan1.jpg" style="width: 150px;" />

当插入了10W个key，再用`keys key:*`查看，速度就明显慢下来了，花了0.7S。已经是很慢了。

<img src="/img/redis/scan2.jpg" style="width: 150px;" />

## scan

`scan`命令的文档

>returning only a small number of elements per call, they can be used in production without the downside of commands like [KEYS](https://redis.io/commands/keys) or [SMEMBERS](https://redis.io/commands/smembers) that may block the server for a long time (even several seconds) when called against big collections of keys or elements.
>
>每次执行该命令只返回总元素的一小部分。这些`scan`系列的命令（`scan, sscan, hscan, zscan`命令的作用类似）可以用在生产环境。不像`keys`或者`smembers`命令，当数据量很大时，可能会阻塞很久（甚至好几秒）。
>
>However while blocking commands like [SMEMBERS](https://redis.io/commands/smembers) are able to provide all the elements that are part of a Set in a given moment, The SCAN family of commands only offer limited guarantees about the returned elements since the collection that we incrementally iterate can change during the iteration process.
>
>像`smembers`这种会阻塞的命令，一次返回所有元素。`scan`系列的命令只能对返回的元素提供有限的保证。因为在迭代过程中，增量迭代的元数据可能会改变

`scan`命令是一个基于游标的迭代器，每次游标从0开始，每次命令执行完会返回一个新的游标，用于下次迭代。当返回的游标是0时，迭代结束。

事先创建了30个key。使用`scan`命令迭代：

<img src="/img/redis/scan3.jpg" style="width: 230px;" />

可以看出来，一共迭代了三次，每次迭代都会返回两个值，第一个是更新后的cursor，第二个是结果集

## 本机环境

MacOS 10.15.3

8G内存 四核八代i5

## 参考链接

[redis-keys](https://redis.io/commands/keys)

[redis-scan](https://redis.io/commands/scan)