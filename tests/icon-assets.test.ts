import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from '@/app/manifest';

const root = process.cwd();

function readPngSize(relativePath: string) {
  const buffer = readFileSync(join(root, relativePath));
  expect(buffer.subarray(1, 4).toString('ascii')).toBe('PNG');

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

describe('ggumul site icons', () => {
  it.each([
    ['app/icon.png', 512],
    ['app/apple-icon.png', 180],
    ['public/icon-192.png', 192],
    ['public/icon-512.png', 512],
    ['public/favicon-32x32.png', 32],
    ['public/favicon-16x16.png', 16],
  ])('keeps %s as a square png', (relativePath, expectedSize) => {
    expect(existsSync(join(root, relativePath))).toBe(true);
    expect(readPngSize(relativePath)).toEqual({ width: expectedSize, height: expectedSize });
  });

  it('exposes installable app icons in the web manifest', () => {
    expect(manifest()).toMatchObject({
      short_name: '꼬물',
      theme_color: '#1a2538',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    });
  });
});
