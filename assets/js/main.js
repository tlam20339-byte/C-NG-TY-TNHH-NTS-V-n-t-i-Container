(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Set year footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const burger = $("#burger");
  const mobilePanel = $("#mobilePanel");
  if (burger && mobilePanel) {
    burger.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.textContent = isOpen ? "✕" : "☰";
    });

    mobilePanel.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) {
        mobilePanel.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.textContent = "☰";
      }
    });
  }

  // Dropdown (tools)
  const dd = $("#toolsDropdown");
  const ddBtn = dd?.querySelector("button");
  if (dd && ddBtn) {
    ddBtn.addEventListener("click", () => {
      const isOpen = dd.classList.toggle("open");
      ddBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("open");
        ddBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active menu highlight by filename
  const current = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  $$("a[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("?")[0].toLowerCase();
    if (href === current) a.classList.add("active");
  });

  // Small helper for demo forms
  const flash = (selector, msg) => {
    const el = $(selector);
    if (!el) return;
    el.textContent = msg;
    setTimeout(() => (el.textContent = ""), 7000);
  };

  // Quote form demo
  $("#quoteForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    flash(
      "#quoteMsg",
      "✅ Đã nhận yêu cầu báo giá (demo). Hãy kết nối form với email/CRM/TMS để nhận dữ liệu thật.",
    );
    e.target.reset();
  });

  // Pickup form demo
  $("#pickupForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    flash(
      "#pickupMsg",
      "✅ Đã nhận yêu cầu đặt lịch lấy hàng (demo). Kết nối inbox điều phối để xử lý tự động.",
    );
    e.target.reset();
  });

  // Contact form demo
  $("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    flash(
      "#contactMsg",
      "✅ Đã gửi tin nhắn (demo). Kết nối backend/email để nhận liên hệ thật.",
    );
    e.target.reset();
  });

  // Track form demo
  $("#trackForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const ref = $("#tRef")?.value?.trim();
    const box = $("#trackResult");
    if (!box) return;

    const safeRef = (ref || "").replace(/[<>&"]/g, "");
    box.innerHTML = `
      <div class="card">
        <h3 style="margin:0 0 6px">Trạng thái lô hàng: <span style="color:#2563eb">${safeRef}</span></h3>
        <p style="margin:0; color:#475569">
          Trạng thái demo: <b style="color:#0f172a">Đã xác nhận điều xe</b><br/>
          Mốc tiếp theo: <b style="color:#0f172a">Ra cổng / Nhận container</b><br/>
          <span class="hint">Gợi ý: thay phần này bằng tích hợp TMS/Portal.</span>
        </p>
      </div>
    `;
  });
})();
