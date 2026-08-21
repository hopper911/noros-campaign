"use client";

import { useEffect } from "react";

const MEDIA =
  "img, video, picture, canvas, svg:not(.sr-only):not([aria-hidden='true']), [data-asset-protect]";

function isProtectedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(MEDIA));
}

/**
 * Soft asset protection: blocks context-menu / drag on media.
 * Not foolproof (devtools / screenshots still work) but stops casual save/drag.
 */
export function AssetProtect() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault();
    };

    const harden = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>("img, video").forEach((el) => {
        el.setAttribute("draggable", "false");
        el.style.setProperty("-webkit-user-drag", "none");
        if (el instanceof HTMLImageElement) {
          el.draggable = false;
        }
      });
    };

    harden();
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) harden(node);
          else if (node instanceof DocumentFragment) harden(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);

    return () => {
      mo.disconnect();
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
    };
  }, []);

  return null;
}
