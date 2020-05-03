---
title: docker笔记1
date: 2020-03-09
categories:
 - 技术
tags:
 - docker
---

``` bash
# 删除dangling images 镜像 （深入浅出docker 悬虚镜像）
docker image prune

# 删除镜像
docker image rm php:latest

# 运行容器中的一个命令并且删除（猜测）
docker container run --rm golang go version

# 查看镜像的image_id
docker image ls -q

# 删除所有镜像
docker image rm $(docker image ls -q) -f

# 展示镜像详细信息
docker image inspect php

# 运行容器并且运行终端（运行容器内终端）
# --name 指定名称
# --restart 指定重启策略
# ---- always 除了通过 container stop 停止，都会重启（包括 docker daemon 重启）
# ---- unless-stopped 除了通过container stop 和 docker daemon 重启，都会重启
# ---- on-failed 
docker container run --name test --restart [always unless-stopped] -it php /bin/bash

# 已存在容器再另一个终端界面调用
docker container exec -it <container id> bash

# -d 后台运行
# -p 80:8080 主机中的80端口映射到容器中的8080端口
docker container run -d --name webserver -p 80:8080 nigelpouton/pluralsight-coker-ci

# 删除全部容器
docker rm $(docker ps -aq) -f

# 在 Dockerfile 所在目录运行 生成一个 web:latest 镜像  "." 是找 ./Dockerfile
# -t 为镜像打标签
# docker image build 命令加入 --nocache=true 强制忽略缓存 
#                            --squash 合并镜像
docker image build -t web:latest .

# 为 web:latest 镜像重新打上标签 
docker image tag web:latest zymao/web:latest

# 推送镜像
docker push zymao/web:latest

docker container run -d --name c1 -p 80:8080 web:latest

# 查看镜像构建过程了执行了哪些指令
docker image history web:latest

```
``` yaml
version: '3'

services: 
    mysql:
        image: mysql:8.0.19
        command: --default-authentication-plugin=mysql_native_password
        restart: always
        environment:
            MYSQL_ROOT_PASSWORD: '00000000'
        ports:
            - 33061:3306	

		# todo php 和 nginx 理论上应该只需要配置一个 html 的volume
    php:
        image: php:7.4-fpm-alpine
        # build: 
        #     context: ./php
        restart: always
        volumes: 
            - ./ming:/var/www/html

    nginx:
        image: nginx:1.17-alpine
        ports:
            - 8081:80
        restart: always
        volumes:
            # - ./nginx/nginx.conf:/etc/nginx/nginx.conf
            - ./nginx/servers:/etc/nginx/conf.d
            - ./ming:/var/www/html
            
# networks: 
#     db-network:
```

