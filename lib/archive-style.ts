type ArchiveTheme = {
  name: string;
  surfaceClass: string;
  orbClass: string;
  lineClass: string;
  accentClass: string;
};

const THEMES: ArchiveTheme[] = [
  {
    name: 'amber-dusk',
    surfaceClass: 'bg-[linear-gradient(135deg,#f5d8ab_0%,#f0c58f_38%,#e4a56a_100%)]',
    orbClass: 'bg-[radial-gradient(circle_at_top,rgba(255,248,236,0.95),rgba(255,248,236,0)_62%)]',
    lineClass: 'border-[rgba(113,67,26,0.14)]',
    accentClass: 'text-[#704626]',
  },
  {
    name: 'night-ink',
    surfaceClass: 'bg-[linear-gradient(135deg,#1d2437_0%,#243355_44%,#385889_100%)]',
    orbClass: 'bg-[radial-gradient(circle_at_top,rgba(205,225,255,0.45),rgba(205,225,255,0)_60%)]',
    lineClass: 'border-[rgba(214,226,255,0.16)]',
    accentClass: 'text-[#d8e7ff]',
  },
  {
    name: 'mulberry-fog',
    surfaceClass: 'bg-[linear-gradient(135deg,#3d2947_0%,#5a345f_45%,#9a5b7d_100%)]',
    orbClass: 'bg-[radial-gradient(circle_at_top,rgba(255,226,243,0.42),rgba(255,226,243,0)_60%)]',
    lineClass: 'border-[rgba(255,227,241,0.16)]',
    accentClass: 'text-[#ffe3f0]',
  },
  {
    name: 'moss-paper',
    surfaceClass: 'bg-[linear-gradient(135deg,#dce4c7_0%,#c1cfa8_44%,#8fa06d_100%)]',
    orbClass: 'bg-[radial-gradient(circle_at_top,rgba(252,255,245,0.9),rgba(252,255,245,0)_60%)]',
    lineClass: 'border-[rgba(68,82,38,0.13)]',
    accentClass: 'text-[#41512a]',
  },
  {
    name: 'clay-sunset',
    surfaceClass: 'bg-[linear-gradient(135deg,#efd1c0_0%,#dca88c_48%,#bc7658_100%)]',
    orbClass: 'bg-[radial-gradient(circle_at_top,rgba(255,244,235,0.78),rgba(255,244,235,0)_60%)]',
    lineClass: 'border-[rgba(102,58,34,0.14)]',
    accentClass: 'text-[#6e4028]',
  },
];

function hashSeed(seed: string) {
  return seed.split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7);
}

export function getArchiveTheme(seed: string): ArchiveTheme {
  return THEMES[Math.abs(hashSeed(seed)) % THEMES.length];
}
