(function () {
  const DEFAULTS = {
    theme: "light",
    position: "bottom-right",
  };

  function createFloatingIcon(config) {
    const btn = document.createElement("div");
    btn.id = "kdrop-floating-icon";
    btn.style.position = "fixed";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.borderRadius = "50%";
    btn.style.background = "#000";
    btn.style.zIndex = "9999";
    btn.style.cursor = "pointer";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    btn.innerHTML = "🎁";

    if (config.position === "bottom-left") {
      btn.style.bottom = "20px";
      btn.style.left = "20px";
    } else {
      btn.style.bottom = "20px";
      btn.style.right = "20px";
    }

    btn.addEventListener("click", () => {
      togglePopup(config);
    });

    document.body.appendChild(btn);
  }

  function togglePopup(config) {
    let iframe = document.getElementById("kdrop-popup-iframe");
    if (iframe) {
      iframe.remove();
      return;
    }

    iframe = document.createElement("iframe");
    iframe.id = "kdrop-popup-iframe";
    iframe.src = `https://play.kgen.io/k-drop/campaigns/${config.campaignId}?embed=true&influencer=${config.influencerId}`;
    iframe.style.position = "fixed";
    iframe.style.bottom = "80px";
    iframe.style.right = config.position === "bottom-left" ? "auto" : "20px";
    iframe.style.left = config.position === "bottom-left" ? "20px" : "auto";
    iframe.style.width = "360px";
    iframe.style.height = "500px";
    iframe.style.zIndex = "9998";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25)";
    iframe.allow = "clipboard-write";

    document.body.appendChild(iframe);
  }

  window.KDrop = {
    init(config) {
      const mergedConfig = { ...DEFAULTS, ...config };
      createFloatingIcon(mergedConfig);
    },
    open() {
      const btn = document.getElementById("kdrop-floating-icon");
      if (btn) btn.click();
    },
    close() {
      const iframe = document.getElementById("kdrop-popup-iframe");
      if (iframe) iframe.remove();
    },
  };
})();
