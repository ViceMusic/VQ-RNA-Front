# What is VQ-RNA?

VQ-RNA is a user-friendly interpretable deep-learning platform for RNA sequence modification analysis, such as RNA modification sites prediction and motif recognition based on In silico saturation mutagenesis (ISM). VQ-RNA supports site prediction for ten common RNA modifications (Am, Cm, Gm, Um, m1A, m5C, m5U, m6A, m6Am, Ψ) and offers interpretability analyses. We support modification site prediction for RNA sequences longer than 51 bp. To achieve this, we employ a sliding window approach, starting predictions from the 25th position onward. Due to the constraints of the model architecture and the need to ensure result reliability, predictions cannot be made for the first and last 25 positions, and only the intermediate region is presented. We identify key bases or regions with higher importance in the model by simulating mutations, aligning them with biologically relevant motifs, and visualizing the results.


Our platform is continuously evolving,and we plan to introduce a file upload feature that allows batch processing of
multiple sequences for prediction and motif identification.
This enhancement is expected to improve motif recognition accuracy, as it has been shown
to be more reliable when based on multiple sequences. Additionally,
we will also incorporate a TF-IDF-based RNA modification specificity analysis,
providing a clear and quantitative visualization of the distinctions among different RNA modification types.

好的, 下面是关于文档项目的一点解析

首先, 主分支main是当前的运行版本, 但是由于某些不可名状的原因, 我们选用websocket来替代http协议进行通信, 这一灵感来自于某个码农在公司项目中借鉴的技术点.

很有意思, 用ws部署成异步任务就可以防止很多事情了, 可以让任务交给后端进行调度即可

但是这样遇到的问题就是很难实现高效而双向的交互()

因此main分支使用state.js手动管理全局状态, 这就导致组件可能渲染不及时

所以我把刷新的功能让用户手动实现(:D)

其次, dev分支是开发目录, 在这里首先进行的一个尝试就是将state修改成全局状态