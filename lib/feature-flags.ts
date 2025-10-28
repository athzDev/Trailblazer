export const featureFlags = {
  aiDesigner: process.env.NEXT_PUBLIC_AI_DESIGNER === 'true',
  weather: process.env.NEXT_PUBLIC_WEATHER !== 'false',
  fx: process.env.NEXT_PUBLIC_FX !== 'false',
  ocr: process.env.NEXT_PUBLIC_OCR === 'true',
};
