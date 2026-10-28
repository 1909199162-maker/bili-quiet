# 静一静 · v1.1.0

把 B站 首页那一大片推荐流藏起来，只留顶部导航和搜索框。带开关，关掉立刻恢复。

> 这是学习项目（W2 第 4–5 课的产物），不是上架产品。只在 `www.bilibili.com` 生效。

## 装进 Edge

1. 把整个文件夹下载到本地（`Code` → `Download ZIP`，解压）
2. 地址栏输入 `edge://extensions`
3. 左下角打开「开发人员模式」
4. 点「加载解压缩的扩展」，选中**解压出来的文件夹**
5. 点右上角拼图图标，把「静一静」固定到工具栏

Chrome 同理：地址换成 `chrome://extensions`。

## 用它

- 打开 `https://www.bilibili.com/` 首页 → 推荐流消失
- 点工具栏上的「静一静」图标 → 开关一拨，推荐流立刻回来；再拨回去，又消失
- **不用刷新页面**，开关状态会记住

## 文件

| 文件 | 干什么 |
|---|---|
| `manifest.json` | 说明书：名字、版本、权限（`storage` + 只在 bilibili.com 生效）、点图标弹 `popup.html` |
| `content.js` | 注入 B站 页面：按开关状态隐藏 / 还原 `.feed2`；用 `MutationObserver` 处理单页应用换页 |
| `popup.html` | 图标弹窗：标题 + 一个开关 + 状态文字 |
| `popup.js` | 开关逻辑：读 `chrome.storage.sync`、写入新状态 |

## 改完代码之后

```
改文件 → edge://extensions 点「重新加载」→ 回 B站按 F5
```

## 已知边界

- 只管首页的 `.feed2`。播放页右侧「相关推荐」是 `.recommend-list-v1`，没管
- 只是把元素藏起来，视频数据照样下载了 —— 不省流量
- B站 改版把类名换掉，插件就失效，要改 `content.js` 里的 `HIDE` 列表

## 许可

MIT
