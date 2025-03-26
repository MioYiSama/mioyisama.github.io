# 网络代理

网络代理（简称**代理**，Proxy）指通过一个中转服务器来访问目标服务器的网络服务。就好比你（本机）想要和某一个人（目标服务器）对话，你们可以指派一个传话者（中转服务器），你们说的所有内容都交给他进行传递，这个传话的过程就是代理。

## 用途

有的时候，直接访问一些网站，抑或是下载一些网站上的东西，访问和下载速度会非常慢（甚至无法访问），这个时候就需要通过代理来提高访问速度（或是让我们能够访问）。

对于计算机专业的学生，由于大部分和计算机与编程相关的网站都是这样，因此代理是不可或缺的工具。

## 配置方式

仅介绍Windows的配置方式：

![Step1](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_09-41-55.png)

![Step2](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_09-43-29.png)

![Step3](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_09-44-00.png)

## 代理软件

为了能够配置代理，我们需要一个提供代理功能的软件。其中比较常见的是基于klaSH的代理软件。

## klaSH

klaSH常用的有三种模式：直连，规则和全局。

- 直连：不经过中转服务器，直接连接目标服务器
- 全局：让任何网络请求都使用代理进行
- 规则：根据一定的规则，选择性代理一些网络请求

除了提供代理功能，klaSH还提供了DNS功能。有的网站无法访问就是因为DNS无法正常解析域名，klaSH可以提供更换DNS的功能。

使用klaSH，最主要的东西就是配置文件。klaSH的配置文件为YAML格式。下面为一个示例配置

```yaml
port: 7890 # 端口
mode: rule # 模式

dns:
  enable: true
  enhanced-mode: normal
  nameserver:
    - 114.114.114.114 # 中国 DNS
  fallback: # 备用 DNS
  	- 1.1.1.1 # Cloudflare DNS
  	- 1.0.0.1

proxies: # 中转服务器列表
  - name: "中转服务器名称"
    type: ss # 中转服务器代理服务的类型
    server: 中转服务器的地址
    port: 8388 # 中转服务器代理服务的端口
    cipher: aes-256-gcm # 加密方式
    password: # 密码

proxy-groups: # 代理组
  - name: "PROXY"
    type: select
    proxies:
      - 中转服务器名称
      - DIRECT # 直连

rules: # 规则设置
  - DOMAIN-KEYWORD,github,PROXY # 域名中出现 github 关键词就使用PROXY组
  - MATCH,DIRECT # 默认为直连
```

## GUI软件

klaSH本身并不提供GUI（图形用户界面），不便于我们使用，因此我们通常会使用把klaSH封装成GUI的软件。

目前还有在更新的有[klaSH Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)（[下载地址](https://github.com/clash-verge-rev/clash-verge-rev/releases/latest)）。

> [!WARNING]
>
> 由于官方下载方式较慢，因此我们需要通过镜像和加速服务下载。
> 首先我们需要获取到最新版的[下载链接](https://kkgithub.com/clash-verge-rev/clash-verge-rev/releases/latest)
>
> ![kkgithub](https://storage.mioyi.net/d/storage/images/8455a821-6eb0-4f2f-9475-b9347a73f5b2.png)
>
> 接着我们要使用[下载加速服务](https://ghproxy.link/)
>
> ![step1](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_10-03-03.png)
>
> ![step2](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_10-04-47.png)

下载完成后，启动安装包，完成安装，并启动软件。

按图片中所示，把TUN和系统代理打开

> [!NOTE]
>
> TUN指通过虚拟网卡的方式，将本机的所有网络请求都通过虚拟网卡，然后移交klaSH处理。由于有些软件不会使用系统代理，因此虚拟网卡可以保证所有请求都能被处理。
>
> 系统代理即上文所述的“代理配置方式”

![setting](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_10-06-11.png)

接下来我们需要在“订阅”中导入配置文件

> [!NOTE]
>
> 绝大多数情况下，我们手上是没有中转服务器的，因此我们需要使用别人提供的中转服务器（收费方式与手机流量卡类似），俗称“Airport”。Airport往往会提供klaSH配置文件，我们只需要使用Airport提供的“订阅链接”导入配置即可。

![import](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_10-15-02.png)

拥有配置文件后，打开“代理”，就可以进行配置了

![proxy](https://storage.mioyi.net/d/storage/images/PixPin_2025-03-08_10-16-07.png)
