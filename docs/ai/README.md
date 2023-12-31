# AI 🤖

在大型语言模型中

B 用于表示模型参数的数量，1B = 1亿（$10^{8}$），Gemini Nano 版本的参数数量是 12B 即 12 亿

T 用于表示模型参数的数量，1T = 1万亿（$10^{12}$），Gemini Pro 版本的参数数量是 1.56T 即 1.56 万亿

## OpenAI、ChatGPT、GPT

总认为它们是同一件事？

* OpenAI 是一家人工智能研究公司
* GPT 是 OpenAI 构建的一系列人工智能模型
* ChatGPT 是一个使用 GPT 的聊天机器人

::: tip 一张图来说明
![来自 ](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/Group_12448.png)
[来自：What is GPT? Everything you need to know about GPT-3 and GPT-4](https://zapier.com/blog/what-is-gpt/)
:::

| GPT | ChatGPT |
|---------|---------|
| 大语言模型（LLM） | 由 GPT 支持的聊天机器人应用程序 |
| 为 AI 应用程序提供生成文本的能力 | 依赖 GPT 的参数 |
| 最大的神经网络之一，拥有数以亿计个参数 | 针对对话进行了优化 |
|| 具有内容过滤器 |




## Fine-tuning

微调，通过在特定任务中的 Fine-tuning，可以将模型专门用于问题解答、翻译、情感识别、段落摘要等 NLP 任务。

## GPT

::: tip 参考
[ChatGPT 中，G、P、T 分别是什么意思？](https://zhuanlan.zhihu.com/p/610276479)
:::

GPT 是 Generative Pre-Training Transformer 的缩写，意思是“生成式预训练转化器”。简单理解，GPT 就是一个预先训练好的，用生成的方式，把输入文字转化成输出文字的翻译。

### Generative

在机器学习中，有两种主要类型的模型：生成模型（Generative）和判别模型（Discriminative）。

人脸识别、车牌识别属于判别模型的应用。

Generative 这个大的种类里面有几个小分支，DALLE 的图像生成用的是 GAN （Generative Adversarial Network，生成对抗网络），Stable Diffusion、MidJourney 走向了另外一个分支 Difusion，而 ChatGPT 又是一个分支，就是 Transformer。

而 Transformer Generative 的语言模型的核心，通俗来讲就是「顺口溜」。

当看了足够多的文本以后，发现有一些语言模式是反复出现的。它之所以可以准确的填补「锄禾日当_ 」的空格，不是因为它在自己的大脑子里面重构了一副农民劳动的场景，仅仅是不过脑子，顺口溜出来的。

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231208151520.png)

向它提问：3457 * 43216 = ，它回答 149,064,352（这是错的。正确结果是 149,397,712）。之所以结果的 2 是对的，是因为它读了太多的文字资料以后，总结到 7 结尾的文字，乘号，6 结尾的文字，和 2 结尾的文字比较「押韵」，从语感上比较像一首诗，所以它就学会了这样的文字，而不是学会了计算。

### Pre-Training

以前的人工智能模型是为了特定目标训练的，比如给模型 1000 张猫的照片，就能训练出来一个可以判断一个图片是有猫还是没有猫的专用的模型。

而 Pre-Training 模型不是为了特定的目标训练，而是预先训练一个通用的模型。可以在此基础上进行微调（Fine-tuning），而不需要从头开始训练。

假设你雇佣了一位家政阿姨，她已经接受过劳务公司的预训练，掌握了家务整理的技能，而且之前还在小学老师的指导下进行了中文对话的预训练。当她来到你家时，你只需要稍微调整一下她在你家特定需求上的表现，而不需要从头开始教她中文，就可以让她开始工作了。这就好比你不需要雇佣一位完全没有经验的人，然后花费大量时间教她所有的技能，而是选择了一位已经具备基本知识和技能的人，并对其进行了一些微调，使其适应你家特定的需求。

ChatGPT 的预训练就是给了我们所有人一个预先训练好的模型。这个模型里面语言是强项，它提供的内容无论多么的胡说八道，至少我们必须承认它的行文通畅程度无可挑剔。这就是他 pre-training 的部分，而回答的内容部分，正是我们需要 fine tu上ning 的。

### Transformer

直译为：变压器，生活中的变压器可以做到 220 伏电进，12 伏出

语言的转换器就是把语言的序列作为输入，然后用一个叫做编码器 encoder 的东西变成数字的表现（比如 GPT 就用 1536 个浮点数（也叫 1536 维向量）表示任何的单词，或者句子，段落，篇章等），然后经过转化，变成一串新的序列，最后再用 decoder 把它输出。这个转换器，是这个自然语言处理的核心。

比如给 ChatGPT 输入「Apple」这个词，它给你返回

[0.0077999732, -0.02301609, -0.007416143, -0.027813964, -0.0045648348, 0.012954261,.....0.021905724, -0.012022103, -0.013550568, -0.01565478, 0.006107009]

这 1536 个浮点数字来表示 Apple（其中一个或着多个维度的组合表达了「甜」的含义，另外一堆表达了「圆」的含义，还有一大堆共同表达了「红」等等属性组合）

然后这堆数字，再交给 decoder，并且限定中文的话，它会解码成为「苹果」，限定西班牙语的话，它会解码成「manzana」。总之，通过编码，转换，解码，它就完成了从 Apple 到目标输出语言的转化。

ChatGPT 所做的事情远远多于翻译。但核心上，它就是把一个语言序列，转换为了另外一堆语言序列，这个任务完成得如此的好，以至于让人产生了它有思想的错觉。

## SOTA

SOTA 是 State-of-the-art 的缩写，意思是“目前最先进的技术”。

## LLM

LLM 是 Large Language Model 的缩写，意思是“大语言模型”。

## NLP

NLP 是 Natural Language Processing 的缩写，意思是“自然语言处理”。
