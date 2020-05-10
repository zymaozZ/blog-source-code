---
title: Java问题
date: 2020-05-02
categories:
 - 技术
tags:
 - java
publish: false
---

> 将学习Java过程中遇到的问题记录下来，希望学习过程中能逐一解答
>
> 学习途径：《Java核心技术 卷1》为主

::: tip

希望在学习过程中可以随着看书的内容逐渐深入，能够有这些问题的答案

:::

1. Java中的main方法必须是静态的？

2.  3.5运算符 下的注释没看明白。

3. 3.5.1 数学函数与常量 注释中的 floorMath

4. 3.6.3 不可变字符串？原因

    编译器可以让字符串共享

5. 检测字符串相等

    ``` java
    String greeting = "Hello"
    "Hello".equals(greeting)				// 区分大小写
    "Hello".equalsIgnoreCase(greeting)		// 不区分大小写
        
    // "==" 运算符只能确定两个字符串是否同一位置（完全有可能内容相同的字符串拷贝放置在不同的位置）
    if (greeting == "Hello") {
        // probably true
    }
    
    if (greeting.substring(0, 3) == "Hel") {
        // probably false
    }
    
    
    ```

    











