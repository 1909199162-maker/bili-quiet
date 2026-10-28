// content.js —— 塞进 B站 页面里跑的代码：按开关状态，藏起或恢复推荐流
// 你以后要改的只有 HIDE 这个列表：往里加选择器，就会多管一块区域。

(() => {
  const HIDE = [".feed2", ".recommended-container_overseas"];

  let enabled = true;   // 开关状态，从存储里读出来之前先当作「开」

  function hideAll() {
    for (const sel of HIDE) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.dataset.bqHidden === "1") continue;
        el.dataset.bqHidden = "1";        // 记个标记，方便之后原样恢复
        el.style.display = "none";        // display:none 才是真消失，不是隐身
      }
    }
  }

  function restoreAll() {
    for (const sel of HIDE) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.dataset.bqHidden !== "1") continue;
        el.style.display = "";            // 清掉我们加的样式，回到网页本来的样子
        delete el.dataset.bqHidden;
      }
    }
  }

  function apply() {
    if (enabled) hideAll();
    else restoreAll();
  }

  // ---- 1. 启动时读一次开关状态 ----
  try {
    chrome.storage.sync.get({ enabled: true }, (v) => {
      enabled = v.enabled !== false;
      apply();
    });
  } catch (e) {
    apply(); // 拿不到存储也不影响工作，就按默认「开」
  }

  // ---- 2. 开关一变，立刻响应（不用刷新页面） ----
  try {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync" || !changes.enabled) return;
      enabled = changes.enabled.newValue !== false;
      apply();
    });
  } catch (e) {}

  // ---- 3. B站 是单页应用：点链接不刷新整页，得盯着 DOM 变化 ----
  new MutationObserver(() => {
    if (enabled) hideAll();
  }).observe(document.documentElement, { childList: true, subtree: true });

  // ---- 4. 兜底：延迟加载的区块，前 6 秒每秒补一次 ----
  let tick = 0;
  const timer = setInterval(() => {
    apply();
    if (++tick >= 6) clearInterval(timer);
  }, 1000);
})();
