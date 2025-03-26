import{_ as i,c as s,o as l,ag as n}from"./chunks/framework.DPDPlp3K.js";const c=JSON.parse('{"title":"怎么和AI（LLM）聊天","description":"","frontmatter":{},"headers":[],"relativePath":"posts/ai/how-to-chat-with-ai.md","filePath":"posts/ai/how-to-chat-with-ai.md"}'),e={name:"posts/ai/how-to-chat-with-ai.md"};function t(p,a,r,h,o,u){return l(),s("div",null,a[0]||(a[0]=[n(`<h1 id="怎么和ai-llm-聊天" tabindex="-1">怎么和AI（LLM）聊天 <a class="header-anchor" href="#怎么和ai-llm-聊天" aria-label="Permalink to &quot;怎么和AI（LLM）聊天&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#前言">前言</a></li><li><a href="#引入">引入</a></li><li><a href="#提示词">提示词</a></li><li><a href="#提示词工程-怎么问">提示词工程（怎么问）</a><ul><li><a href="#明确任务类型">明确任务类型</a></li><li><a href="#具体化要求">具体化要求</a></li><li><a href="#角色设定">角色设定</a></li><li><a href="#示例引导">示例引导</a></li><li><a href="#限制输出">限制输出</a></li><li><a href="#语境补充">语境补充</a></li><li><a href="#对抗性提示">对抗性提示</a></li><li><a href="#元提示-场景-自我优化">元提示（场景：自我优化）</a></li><li><a href="#进阶技巧">进阶技巧</a></li><li><a href="#避坑指南">避坑指南</a></li><li><a href="#记住有效提示的rise原则">记住有效提示的RISE原则</a></li></ul></li><li><a href="#问什么">问什么</a></li></ul></nav><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>现在的AI（LLM）越来越容易接触和使用，但是不同的使用AI的人之间仍旧存在巨大信息差，导致不同的人使用AI的效率天差地别。本文即用来消除信息差。</p><h2 id="引入" tabindex="-1">引入 <a class="header-anchor" href="#引入" aria-label="Permalink to &quot;引入&quot;">​</a></h2><p>视频：<a href="https://www.bilibili.com/video/BV18DAnegEfH" target="_blank" rel="noreferrer">DeepSeek回答惊现广告，AI广告该来的还是来了吗？【雪鸡观察局345】</a></p><p>这个视频的核心思想就是，特定的谈话会让AI的回复中带有广告内容。这显然不是我们想要的东西。那么应该怎么避免它？这就是本文将要探讨的问题：怎么和AI聊天。</p><h2 id="提示词" tabindex="-1">提示词 <a class="header-anchor" href="#提示词" aria-label="Permalink to &quot;提示词&quot;">​</a></h2><p><strong>提示词</strong>（Prompt）简单来说就是你给AI下达的“指令”或“问题”。不同的提示词，AI的输出效果天差地别。比如说：</p><ul><li><p>提示词1</p><ul><li>输入：</li></ul><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">写一首关于秋天的诗</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>输出：</li></ul><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">秋天来了树叶黄，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">风吹稻谷阵阵香。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">大雁南飞排成行，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">丰收季节人人忙。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p>提示词2</p><ul><li>输入：</li></ul><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请以现代诗的形式创作一首关于“秋天”的诗，要求：  </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **情感基调**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：突出孤独与离别，避免提到“丰收”“喜悦”；  </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **意象参考**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：枯井、锈铁轨、褪色明信片；  </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **结构**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：分四段，每段三行，押朦胧韵；  </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **结尾**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：用一句疑问句引发思考。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>输出：</li></ul><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">锈迹啃食着铁轨的体温，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">枯井咽下最后一声蝉鸣，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">秋天在邮筒里沉默失语。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">褪色的明信片蜷缩角落，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">地址是二十年前的月光，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">墨迹晕染成一片芦苇荡。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">风撕碎日历的每一页痛，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">落叶在掌心写满无名碑，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">谁在等一场不落地的雪？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">——你说，季节会死于自己的名字吗？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li></ul><h2 id="提示词工程-怎么问" tabindex="-1">提示词工程（怎么问） <a class="header-anchor" href="#提示词工程-怎么问" aria-label="Permalink to &quot;提示词工程（怎么问）&quot;">​</a></h2><p>从前面的例子可以看出提示词非常重要。</p><p>通过优化提示词的方式来提升AI的回答质量，被称作<strong>提示词工程</strong>（Prompt Engineering）。</p><p>如果需要细致了解提示词工程，可以访问<a href="https://www.promptingguide.ai/zh" target="_blank" rel="noreferrer">Prompt Engineering Guide</a>。在这里我们通过正反例来快速学会怎么问：</p><h3 id="明确任务类型" tabindex="-1">明确任务类型 <a class="header-anchor" href="#明确任务类型" aria-label="Permalink to &quot;明确任务类型&quot;">​</a></h3><p>❌ 反例：&quot;写代码&quot;</p><p>✅ 正例：&quot;用Python编写一个爬取知乎热榜的脚本，要求包含异常处理和数据存储为JSON文件&quot;</p><p>💡 说明：明确编程语言、目标网站、功能要求和输出格式</p><h3 id="具体化要求" tabindex="-1">具体化要求 <a class="header-anchor" href="#具体化要求" aria-label="Permalink to &quot;具体化要求&quot;">​</a></h3><p>❌ 反例：&quot;写个广告语&quot;</p><p>✅ 正例：&quot;为智能手表撰写3条科技感十足的广告语，每条不超过15字，包含&#39;未来&#39;和&#39;健康&#39;关键词&quot;</p><p>💡 说明：限定数量、风格、关键词和长度要求</p><h3 id="角色设定" tabindex="-1">角色设定 <a class="header-anchor" href="#角色设定" aria-label="Permalink to &quot;角色设定&quot;">​</a></h3><p>❌ 反例：&quot;劳动合同要注意什么？&quot;</p><p>✅ 正例：&quot;假设你是从业10年的劳动法律师，用表格形式列出签订劳动合同时必须检查的5个核心条款及常见陷阱&quot;</p><p>💡 说明：赋予专业角色身份提升回答可信度</p><h3 id="示例引导" tabindex="-1">示例引导 <a class="header-anchor" href="#示例引导" aria-label="Permalink to &quot;示例引导&quot;">​</a></h3><p>❌ 反例：&quot;分析销售数据&quot;</p><p>✅ 正例：&quot;参考示例格式：先用柱状图展示各季度销售额，再用折线图显示同比增长率。请分析附件的2023年全球销售数据，要求包含：1）区域Top3市场 2）最佳增长品类 3）异常波动说明&quot;</p><p>💡 说明：提供输出格式样本确保结构化响应</p><h3 id="限制输出" tabindex="-1">限制输出 <a class="header-anchor" href="#限制输出" aria-label="Permalink to &quot;限制输出&quot;">​</a></h3><p>❌ 反例：&quot;写文献综述&quot;</p><p>✅ 正例：&quot;用学术英语撰写500字左右的区块链金融文献综述，包含5篇近三年核心期刊的引用，按APA格式排版&quot;</p><p>💡 说明：限定字数、时间范围、引用规范和格式</p><h3 id="语境补充" tabindex="-1">语境补充 <a class="header-anchor" href="#语境补充" aria-label="Permalink to &quot;语境补充&quot;">​</a></h3><p>❌ 反例：&quot;客户说物流慢怎么回？&quot;</p><p>✅ 正例：&quot;假设客户购买的商品预计延误3天，请用温和语气撰写回复模板，包含：1）致歉 2）延误原因 3）补偿方案（20元券+优先发货）4）联系电话&quot;</p><p>💡 说明：补充业务背景信息</p><h3 id="对抗性提示" tabindex="-1">对抗性提示 <a class="header-anchor" href="#对抗性提示" aria-label="Permalink to &quot;对抗性提示&quot;">​</a></h3><p>❌ 反例：&quot;这文章有问题吗？&quot;</p><p>✅ 正例：&quot;请以最严格的审核标准，检查以下文本是否存在：1）虚假信息 2）歧视性表述 3）违反广告法内容。发现问题时直接标注原文并说明理由&quot;</p><p>💡 说明：设定检查标准和输出格式</p><h3 id="元提示-场景-自我优化" tabindex="-1">元提示（场景：自我优化） <a class="header-anchor" href="#元提示-场景-自我优化" aria-label="Permalink to &quot;元提示（场景：自我优化）&quot;">​</a></h3><p>❌ 反例：&quot;怎么更好使用你？&quot;</p><p>✅ 正例：&quot;请分析我过去5个提问的质量，指出可优化的3个方面，并示范改进后的提问模板。用‘提问诊断报告’格式回答，包含：原题分析、改进建议、示例模板&quot;</p><p>💡 说明：让AI协助提升提问技巧</p><h3 id="进阶技巧" tabindex="-1">进阶技巧 <a class="header-anchor" href="#进阶技巧" aria-label="Permalink to &quot;进阶技巧&quot;">​</a></h3><ol><li>混合模式：&quot;先以新手能理解的方式解释概念，再用专业术语总结要点&quot;</li><li>渐进式追问：&quot;首答列出大纲，我选择第2点后深入展开3个细分方案&quot;</li><li>格式嵌套：&quot;用Markdown输出，其中数据部分用表格，技术参数用代码块&quot;</li><li>风险控制：&quot;列举该方案的3个潜在风险，并按发生概率排序&quot;</li><li>溯源验证：&quot;重要数据请注明来源并评估可信度等级（1-5星）&quot;</li></ol><h3 id="避坑指南" tabindex="-1">避坑指南 <a class="header-anchor" href="#避坑指南" aria-label="Permalink to &quot;避坑指南&quot;">​</a></h3><ul><li>🚫 避免绝对化：&quot;最好的方法是什么&quot; → 改为&quot;当前行业主流方案有哪些&quot;</li><li>🚫 警惕模糊指代：&quot;这个数据&quot; → 明确&quot;2023年Q3新能源汽车出口量&quot;</li><li>🚫 防止过度简化：&quot;如何成功&quot; → 改为&quot;创业公司从0到1的关键要素&quot;</li><li>🚫 注意文化偏见：&quot;美国人是不是都...&quot; → 改为&quot;美国东西海岸的文化差异&quot;</li></ul><h3 id="记住有效提示的rise原则" tabindex="-1">记住有效提示的RISE原则 <a class="header-anchor" href="#记住有效提示的rise原则" aria-label="Permalink to &quot;记住有效提示的RISE原则&quot;">​</a></h3><ul><li>Relevant（相关） - 紧扣核心目标</li><li>Instructive（指导性） - 明确操作路径</li><li>Specific（具体） - 量化可执行标准</li><li>Explicit（明确） - 减少歧义空间</li></ul><h2 id="问什么" tabindex="-1">问什么 <a class="header-anchor" href="#问什么" aria-label="Permalink to &quot;问什么&quot;">​</a></h2><p>在“引入”中的视频，之所以AI会输出广告，是因为问的内容不对。</p><p>通常来说，不建议问过于细微的问题。比如说：</p><ul><li>过于生活化的场景（张三为什么……；XX小区边上有什么好吃的东西）</li><li>需要极高记忆力的事情（某句诗的下一句；《XXX》中的第X章讲了什么）</li><li>产品选择（淘宝上哪家店铺卖的手机是正品；充电宝选哪个品牌）</li></ul><p>训练AI的过程中，使用的数据完全不会涵盖这些内容。即使涵盖了，AI被训练出来的也是归纳能力，而不是记忆能力。问这些问题属于缘木求鱼。</p><p>显然视频里“回收手机”“维修空调”都属于产品选择/生活化场景，明显不适合AI回答。</p><p>除了这些反例，AI基本都可以回答。</p>`,59)]))}const k=i(e,[["render",t]]);export{c as __pageData,k as default};
