# git rebase

> 本文作者：[码码指南](#)
> 
> 本站首页：[http://localhost:8080](http://localhost:8080)

## 用途
1. 压缩我们的提交
2. 合并分支

## 压缩我们的提交

1. 创建 rebase.md 文件
2. 编辑 rebase.md 文件，输入 a -> git add -> git commit
3. 编辑 rebase.md 文件，输入 b -> git add -> git commit
4. 编辑 rebase.md 文件，输入 c -> git add -> git commit

提交记录如下

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/Snipaste_2023-12-06_15-42-25.png)

其实修改文件的3次提交，修改的是同一个文件，我们只需要提交一次，所以我们可以使用 rebase 命令将这3次提交压缩成一次提交

### 具体操作

1. `git rebase -i HEAD~3`

* -i 参数是必须的，意思是交互式模式
* 交互模式可以打开一个交互式的界面，允许你对提交历史进行交互式的操作
* HEAD~3 表示要压缩的最近的3次提交

2. 此时 Git 会打开一个文本编辑器，显示类似于以下内容的交互式 rebase 文件

```bash
pick 90d5e34 a
pick 9c26fef b
pick e599db8 c

# Rebase d1a83e3..e599db8 onto d1a83e3 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
#         create a merge commit using the original merge commit's
#         message (or the oneline, if no original merge commit was
#         specified); use -c <commit> to reword the commit message
# u, update-ref <ref> = track a placeholder for the <ref> to be updated
#                       to this position in the new commits. The <ref> is
#                       updated at the end of the rebase
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

3. 在交互式 rebase 文件中，将除第一个提交外的所有行的 pick 关键字改为 squash 或s。这将会把这些提交压缩到第一个提交中

```bash
pick 90d5e34 a
s 9c26fef b
s e599db8 c
```

4. `:wq` 保存并关闭文件。此时 Git 会打开另一个文本编辑器，允许你编辑合并后的提交消息。你可以保留或者根据需要进行编辑

```bash
# This is a combination of 3 commits.
# This is the 1st commit message:

a

# This is the commit message #2:

b

# This is the commit message #3:

c

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Wed Dec 6 15:26:58 2023 +0800
#
# interactive rebase in progress; onto d1a83e3
# Last commands done (3 commands done):
#    squash 9c26fef b
#    squash e599db8 c
# No commands remaining.
# You are currently rebasing branch 'main' on 'd1a83e3'.
#
# Changes to be committed:
#       modified:   rebase.md
```

修改后
```bash
# This is a combination of 3 commits.
# This is the 1st commit message:

abc

# This is the commit message #2:

b

# This is the commit message #3:

c

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Wed Dec 6 15:26:58 2023 +0800
#
# interactive rebase in progress; onto d1a83e3
# Last commands done (3 commands done):
#    squash 9c26fef b
#    squash e599db8 c
# No commands remaining.
# You are currently rebasing branch 'main' on 'd1a83e3'.
#
# Changes to be committed:
#       modified:   rebase.md
```

5. `:wq` 保存并关闭文件。此时 Git 会将这3次提交压缩成一次提交，并创建一个新的提交

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206170506.png)

提交记录如下
![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206170542.png)


## 合并分支

首先，将我们刚才的操作进行 `git push`

此时，我们创建一个新的分支 `git checkout -b "feature1"`

编辑 rebase.md 文件，输入 feature1 modify -> git add -> git commit -> git push

此时 push 可能会报一个错误。这是因为我们在本地创建一个新分支并进行提交后，没有显式地将该分支与远程分支关联起来，那么 Git 就无法确定要将提交推送到哪个远程分支。此时查看 GitHub 仓库是没有我们本地创建的仓库的

```bash
➜  learn-git git:(feature1) git push             
fatal: The current branch feature1 has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature1

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.
```

执行 `git push --set-upstream origin feature1` 后，GitHub 仓库出现了我们本地创建的新的 feature1 分支，且已经 push 好了

```bash
➜  learn-git git:(feature1) git push --set-upstream origin feature1
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Writing objects: 100% (3/3), 264 bytes | 264.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'feature1' on GitHub by visiting:
remote:      https://github.com/CENYU1/learn-git/pull/new/feature1
remote: 
To https://github.com/CENYU1/learn-git.git
 * [new branch]      feature1 -> feature1
branch 'feature1' set up to track 'origin/feature1'.
```

我们切换回 main 分支 `git checkout main`，再对 rebase.md 文件进行修改，输入 main modify -> git add -> git commit -> git push

我们切换回 feature1 分支 `git checkout feature1`，再对 rebase.md 文件进行修改，输入 continue feature1 & complete -> git add -> git commit -> git push

此时的提交记录如下

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206174604.png)

### 使用 merge 的情况

此时我们希望将 feature1 分支合并到 main 分支中，我们切换回 main 分支 `git checkout main`，执行 `git merge feature1`

出现报错。这是因为发生了冲突，Git 无法自动合并，必须手动解决冲突后再提交

```bash
➜  learn-git git:(main) git merge feature1
Auto-merging rebase.md
CONFLICT (content): Merge conflict in rebase.md
Automatic merge failed; fix conflicts and then commit the result.
```

冲突解决完成之后，git add -> git commit -> git push

此时的提交记录如下

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206175538.png)

查看图片后，我们可以想象一下，如果开发的人特别多，那么交叉点就会特别多，像下面这个样子

<img src="https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206175925.png" style="height: 400px;">

### 使用 rebase 的情况

我们在 main 分支上创建一个新的 feature2 分支进行演示，`git checkout -b feature2`

编辑 rebase.md 文件，输入 feature2 modify -> git add -> git commit -> git push（此时仍然可能出现和之前一样的关联远程分支的报错，同样处理即可）

回到 main 分支，`git checkout main`，编辑 rebase.md 文件，删除 main modify -> git add -> git commit -> git push

回到 feature2 继续开发，`git checkout feature2`，编辑 rebase.md 文件，添加 continue feature2 & complete -> git add -> git commit -> git push

此时的提交记录如下

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206192524.png)

此时我们处于 feature2 分支上，我们最终的目的是将 feature2 分支与 master 分支合并。我们执行 `git rebase main`，这一步的操作会将 feature2 分支上的所有提交，在 main 分支上重新提交一遍（注意是重新提交，重新提交，重新提交，不是引用）

此时出现冲突，本质上就是因为我们要由 f1 和 f2 产生新的 $f1^{'}$ 和 $f2^{'}$，$f1^{'}$ 的内容就是 f1 和 m1 两个节点的内容合并的结果，$f2^{'}$ 的内容就是 f2 和 m1 两个节点的内容合并的结果

此时的状态是这样

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/361701918959.jpg)

图中的 $f1^{'}$ 和 $f2^{'}$ 代表的是 feature2 分支上的提交，在 main 分支上重新提交了一遍，而非引用

回到 main 分支，`git checkout main`，我们将 main 分支与 feature2 分支合并，执行 `git merge feature2`，`git push`

此时的提交记录如下

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/20231206194233.png)

状态是这样

![](https://cenyu-picogo.oss-cn-beijing.aliyuncs.com/371701928953.jpg)

此时两条分支我们都开发完成，发现 main 分支的提交记录是笔直的，feature2 分支没有与 main 分支发生像 merge 一样的交叉点。


初次接触可能有些难理解，但是总结下来，可以这么理解：
::: tip 总结
`rebase xxx` 代表着往 xxx 分支上合并提交，合谁的代码，合我们所在当前分支的提交
:::



## 疑问解答
::: warning 问题
为什么要先在 feature2 分支上 rebase main，再去 main 分支 merge feature2，而不是直接在 main 分支直接 rebase feature2，这样不就一步完成了吗？
:::

？？？？可以这样操作，但是最好不要在公共分支进行 rebase 操作。因为公共分支上还有其他人开发，你直接 rebase 会改变提交记录


::: warning 使用场景
说一下我们公司的场景吧
:::

？？？？有个主干分支 dev，然后会有很多功能分支 featureA，featureB ...
主干分支通常情况下是不允许直接提交的，功能分支需要变基到主干分支之后，提交 mr 或者 pr，然后在 code review 之后再合并到主干分支上
另外，如果在多人共享分支上做 force push，一定要用 --force-with-lease，确保你是最后一个提交的。
