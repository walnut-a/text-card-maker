import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

function createMockContext() {
  const elements = new Map();

  function createElement(id = "") {
    return {
      id,
      value: "",
      textContent: "",
      dataset: {},
      style: {},
      classList: {
        add() {},
        remove() {},
        toggle() {},
      },
      appendChild() {},
      addEventListener() {},
      setAttribute() {},
      removeAttribute() {},
    };
  }

  function createCanvas() {
    const canvas = createElement("canvas");
    canvas.width = 900;
    canvas.height = 1125;
    canvas.getContext = () => ({
      arcTo() {},
      beginPath() {},
      clearRect() {},
      clip() {},
      closePath() {},
      drawImage() {},
      fillRect() {},
      fillText() {},
      lineTo() {},
      measureText(text) {
        return { width: String(text).length * 24 };
      },
      moveTo() {},
      restore() {},
      save() {},
      scale() {},
      stroke() {},
    });
    canvas.toBlob = () => {};
    canvas.toDataURL = () => "data:image/png;base64,";
    return canvas;
  }

  const ids = [
    "contentInput",
    "linkInput",
    "templateSelect",
    "themeSelect",
    "fontSelect",
    "ratioSelect",
    "sampleButton",
    "clearButton",
    "downloadButton",
    "mobileDownloadButton",
    "cardCanvas",
    "qrCanvas",
    "statusText",
    "dimensionLabel",
    "qriousScript",
  ];

  for (const id of ids) {
    elements.set(id, id.includes("Canvas") ? createCanvas() : createElement(id));
  }

  return {
    console,
    URL,
    document: {
      __elements: elements,
      createElement(tagName) {
        if (tagName === "canvas") return createCanvas();
        return createElement(tagName);
      },
      fonts: {
        load: () => Promise.resolve(),
      },
      getElementById(id) {
        if (!elements.has(id)) {
          elements.set(id, createElement(id));
        }
        return elements.get(id);
      },
    },
    window: {
      clearTimeout() {},
      devicePixelRatio: 1,
      localStorage: {
        getItem: () => null,
        setItem() {},
      },
      setTimeout(callback) {
        return callback();
      },
    },
  };
}

function loadApp() {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  const inlineScript = scripts.map((match) => match[1]).find((body) => body.includes("const sampleText"));
  assert.ok(inlineScript, "inline application script should exist");

  const context = createMockContext();
  vm.createContext(context);
  vm.runInContext(
    `${inlineScript}
globalThis.__app = {
  parseContent,
  templates,
  getLyricsLayout: typeof getLyricsLayout === "function" ? getLyricsLayout : undefined,
};`,
    context
  );
  return context.__app;
}

test("parseContent preserves intentional blank lines for manual layout control", () => {
  const { parseContent } = loadApp();

  const result = parseContent("第一行\n\n第二行\n\n-- 歌名");

  assert.deepEqual([...result.lines], ["第一行", "", "第二行", "", "-- 歌名"]);
  assert.deepEqual([...result.paragraphs], ["第一行", "", "第二行", "", "-- 歌名"]);
  assert.equal(result.normalized, "第一行\n\n第二行\n\n-- 歌名");
});

test("lyrics template supports a separate song line with explicit alignment", () => {
  const { getLyricsLayout, templates } = loadApp();

  assert.equal(templates.lyrics.label, "歌词");
  assert.equal(typeof getLyricsLayout, "function");

  const layout = getLyricsLayout({
    lines: ["一句歌词"],
    songName: "词不达意 · 林忆莲",
    songAlign: "right",
    selectedFont: { family: "system-ui, sans-serif" },
    width: 900,
    maxCardHeight: 1125,
    hasQr: false,
    ratioKey: "4:5",
  });

  assert.equal(layout.songName, "词不达意 · 林忆莲");
  assert.equal(layout.songAlign, "right");
  assert.ok(layout.songY > layout.contentY);
});
