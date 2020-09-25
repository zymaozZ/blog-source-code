---
title: ThinkPHP 3.2 记录
date: 2020-08-31
categories:
 - 技术
tags:
 - ThinkPHP
 - nginx
 - 正则
 - re
---

## 背景
公司项目是使用的lamp架构，php是5.4版本，用的是 ThinkPHP 3.2.3框架。因为个人相对熟悉nginx，且5.4版本的php太老旧，为了不污染本地环境，考虑用docker搭建lnmp的开发环境。一开始网上搜了下tp的nginx配置，发现网上大部分配置都是
``` bash
rewrite ^/(.*)$ /index.php?$1 last;
```
或者
```bash
rewrite ^/(.*)$ /index.php?s=/$1 last;
```
这两种配置方式配置之后