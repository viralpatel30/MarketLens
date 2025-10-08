"use client";
import { useEffect, useRef } from "react";

const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.height = `${height}px`;

    const copyright = document.createElement("div");
    copyright.className = "tradingview-widget-copyright";
    copyright.innerHTML = `
      <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        <span class="blue-text">TradingView</span>
      </a>
    `;

    containerRef.current.appendChild(widgetContainer);
    containerRef.current.appendChild(script);
    containerRef.current.appendChild(copyright);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useTradingViewWidget;
