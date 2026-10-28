// popup.js —— 小窗口里的开关逻辑：读状态、写状态、并把文字改对

const toggle = document.getElementById("toggle");
const state  = document.getElementById("state");
const hint   = document.getElementById("hint");

// 打开小窗口时，先显示当前状态
chrome.storage.sync.get({ enabled: true }, (v) => {
  const on = v.enabled !== false;
  toggle.checked = on;
  paint(on);
});

// 用户拨动开关 → 存起来（content.js 会立刻收到通知，不用刷新页面）
toggle.addEventListener("change", () => {
  const on = toggle.checked;
  chrome.storage.sync.set({ enabled: on });
  paint(on);
});

function paint(on) {
  state.textContent = on ? "已静音" : "已关闭";
  hint.textContent = on ? "关掉它，推荐流立刻回来" : "打开它，把推荐流收起来";
}
