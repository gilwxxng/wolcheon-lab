/**
 * 쇼츠용 화면 녹화 스크립트 — 월배당 인컴 계산기
 *
 * 사용법:
 *   npm run record
 *
 * 아래 CONFIG의 값만 바꾸면 다른 시나리오를 찍을 수 있어요.
 * 결과 영상은 videos/ 폴더에 mp4가 아닌 webm으로 저장됩니다.
 * (유튜브 쇼츠는 webm 업로드를 지원합니다. mp4가 필요하면 변환 필요)
 */

import { chromium } from "playwright";
import { mkdirSync, renameSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

// ─────────────────────────────────────────────
// 여기만 바꾸면 됩니다
// ─────────────────────────────────────────────
const CONFIG = {
  // 촬영할 페이지
  url: "https://wolcheon-lab.vercel.app/calculators/monthly-dividend",

  // 목표 월 배당액 버튼: "100만원" | "300만원" | "500만원" | "1,000만원"
  targetLabel: "300만원",

  // 투자 수단 (버튼 문구 일부만 적으면 됨):
  // "커버드콜" | "미국 배당성장" | "국내 월배당" | "은행 예금"
  investment: "커버드콜",

  // 계좌 종류: "일반계좌" | "ISA" | "연금저축"
  account: "ISA",

  // 영상 마지막에 결과 화면을 보여주는 시간 (밀리초)
  endHoldMs: 3000,
};
// ─────────────────────────────────────────────

const VIDEO_DIR = path.resolve(import.meta.dirname, "..", "videos");
const VIDEO_SIZE = { width: 1080, height: 1920 }; // 쇼츠 세로 규격
const VIEWPORT = { width: 540, height: 960 }; // 9:16 모바일 레이아웃 (녹화 시 2배 확대됨)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** 사람 손맛: min~max 사이 랜덤 대기 */
const humanPause = (min = 500, max = 1100) => sleep(min + Math.random() * (max - min));

/** 페이지에 가상 커서(반투명 원)를 심는다 */
async function installCursor(page) {
  await page.evaluate(() => {
    const cursor = document.createElement("div");
    cursor.id = "__shorts-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "44px",
      height: "44px",
      marginLeft: "-22px",
      marginTop: "-22px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.35)",
      border: "2px solid rgba(255,255,255,0.85)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
      zIndex: "999999",
      pointerEvents: "none",
      transition: "left 0.55s cubic-bezier(0.22,1,0.36,1), top 0.55s cubic-bezier(0.22,1,0.36,1)",
      opacity: "0",
    });
    document.body.appendChild(cursor);
  });
}

/** 커서를 (x, y)로 부드럽게 이동 */
async function moveCursor(page, x, y) {
  await page.evaluate(
    ([x, y]) => {
      const c = document.getElementById("__shorts-cursor");
      c.style.opacity = "1";
      c.style.left = `${x}px`;
      c.style.top = `${y}px`;
    },
    [x, y]
  );
  await sleep(620); // 이동 애니메이션이 끝날 때까지
}

/** 탭(클릭) 시 물결 효과 */
async function tapEffect(page, x, y) {
  await page.evaluate(
    ([x, y]) => {
      const ripple = document.createElement("div");
      Object.assign(ripple.style, {
        position: "fixed",
        left: `${x - 22}px`,
        top: `${y - 22}px`,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "3px solid rgba(123,149,255,0.9)",
        zIndex: "999998",
        pointerEvents: "none",
        animation: "__shorts-ripple 0.5s ease-out forwards",
      });
      if (!document.getElementById("__shorts-ripple-style")) {
        const style = document.createElement("style");
        style.id = "__shorts-ripple-style";
        style.textContent = `@keyframes __shorts-ripple {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(2.2); opacity: 0; }
        }`;
        document.head.appendChild(style);
      }
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    },
    [x, y]
  );
}

/** 요소로 커서를 옮기고 사람처럼 클릭 */
async function humanClick(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  await humanPause(300, 600);
  const box = await locator.boundingBox();
  if (!box) throw new Error("클릭 대상을 찾지 못했어요");
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await moveCursor(page, x, y);
  await humanPause(150, 350);
  await tapEffect(page, x, y);
  await page.mouse.click(x, y);
  await humanPause();
}

/** 마우스 휠로 천천히 스크롤 */
async function humanScroll(page, totalPx, stepPx = 120) {
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await sleep(40 + Math.random() * 60);
  }
}

async function main() {
  mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "ko-KR",
    recordVideo: { dir: VIDEO_DIR, size: VIDEO_SIZE },
  });
  const page = await context.newPage();

  console.log("페이지 로딩 중...");
  await page.goto(CONFIG.url, { waitUntil: "networkidle" });
  await installCursor(page);
  await humanPause(1200, 1600); // 첫 화면 감상

  // 1. 목표 월 배당액
  console.log(`1단계: 목표 ${CONFIG.targetLabel} 선택`);
  await humanClick(page, page.getByRole("button", { name: CONFIG.targetLabel, exact: true }));

  // 2. 투자 수단
  console.log(`2단계: ${CONFIG.investment} 선택`);
  await humanClick(
    page,
    page.getByRole("button", { name: new RegExp(CONFIG.investment) }).first()
  );

  // 3. 계좌 종류
  console.log(`3단계: ${CONFIG.account} 선택`);
  await humanClick(page, page.getByRole("button", { name: CONFIG.account, exact: true }));

  // 4. 결과 화면으로 스크롤
  console.log("4단계: 결과 화면 스크롤");
  await page.evaluate(() => {
    const c = document.getElementById("__shorts-cursor");
    if (c) c.style.opacity = "0"; // 스크롤 중엔 커서 숨김
  });
  await humanPause(400, 700);
  await humanScroll(page, 600);
  await humanPause(1500, 2000); // 필요 시드 큰 숫자 감상
  await humanScroll(page, 500);
  await humanPause(1200, 1600); // 비교 차트 감상
  await humanScroll(page, 450);
  await sleep(CONFIG.endHoldMs); // 마지막 홀드

  await context.close(); // 여기서 영상이 저장됨
  await browser.close();

  // 저장된 webm을 아이폰·맥에서 바로 열리는 mp4(H.264)로 변환
  const video = page.video();
  const rawPath = await video.path().catch(() => null);
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  const finalName = `shorts_${CONFIG.targetLabel}_${CONFIG.investment}_${CONFIG.account}_${stamp}.mp4`;
  const finalPath = path.join(VIDEO_DIR, finalName);
  if (rawPath) {
    console.log("mp4로 변환 중...");
    execFileSync(ffmpegPath, [
      "-y",
      "-i", rawPath,
      "-c:v", "libx264",
      "-preset", "medium",
      "-crf", "20",
      "-pix_fmt", "yuv420p", // 애플 기기 호환 필수 옵션
      "-movflags", "+faststart",
      finalPath,
    ]);
    unlinkSync(rawPath); // 원본 webm 삭제
    console.log(`\n✅ 완료! 영상 저장 위치:\n${finalPath}`);
  } else {
    console.log(`\n✅ 완료! videos/ 폴더에서 영상을 확인하세요.`);
  }
}

main().catch((err) => {
  console.error("녹화 실패:", err);
  process.exit(1);
});
