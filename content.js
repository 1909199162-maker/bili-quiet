// content.js —— 塞进 B站 页面里跑的代码：把首页的推荐流藏起来
// 你以后要改的是下面 HIDE 这个列表：往里面加选择器，就会多藏一块东西。

(() => {
  const HIDE = [".feed2", ".recommended-container_overseas"];

  // 找到就 display:none（不是 visibility:hidden —— 那个只是隐身，还占着 2000 多像素的高度）
  function hideAll() {
    let changed = false;
    for (const sel of HIDE) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.dataset.bqHidden === "1") continue; // 已经处理过，跳过，避免反复改
        el.dataset.bqHidden = "1";
        el.style.display = "none";
        changed = true;
      }
    }
    return changed;
  }

  hideAll(); // 第一次进来先藏一遍

  // B站 是「单页应用」：点链接不刷新整页，只换内容。
  // 所以首次执行完还不够，得盯着页面变化，一旦推荐流又出现就再藏一次。
  const observer = new MutationObserver(() => {
    hideAll();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // 兜底：有些区块是延迟加载的，前 6 秒每秒补一刀
  let tick = 0;
  const timer = setInterval(() => {
    hideAll();
    if (++tick >= 6) clearInterval(timer);
  }, 1000);
})();
