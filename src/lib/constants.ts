export const COLOR_DARK_BG = '#023047';
export const COLOR_LIGHT_BG = '#8ecae6';
export const COLOR_PRIMARY = '#fb8500';
export const COLOR_ACCENT = '#ffb703';
export const COLOR_CYAN = '#219ebc';

export const GITHUB_REPO = 'https://github.com/luiisca/pomlock';
export const GITHUB_RELEASES = 'https://github.com/luiisca/pomlock/releases';
export const GITHUB_ISSUES = 'https://github.com/luiisca/pomlock/issues';
export const TERMINAL_TROVE_URL = 'https://terminaltrove.com';

export const TOOL_VERSION = "v4.0.0"

export enum ThemeMode {
  Dark = 'dark',
  Light = 'light'
}

export enum PackageManager {
  Uv = 'uv',
  Pipx = 'pipx',
  Aur = 'aur'
}

export enum CopyState {
  Idle = 'idle',
  Copied = 'copied'
}

export enum TimerPhase {
  Work = 'work',
  Break = 'break'
}

export interface InstallOption {
  readonly manager: PackageManager;
  readonly label: string;
  readonly command: string;
  readonly comingSoon?: boolean;
}

export const INSTALL_OPTIONS: readonly InstallOption[] = [
  {
    manager: PackageManager.Uv,
    label: 'uv',
    command: 'uv tool install pomlock'
  },
  {
    manager: PackageManager.Pipx,
    label: 'pipx',
    command: 'pipx install pomlock'
  },
  {
    manager: PackageManager.Aur,
    label: 'aur',
    command: 'yay -S pomlock',
    comingSoon: true
  }
] as const;

export interface KeybindingItem {
  readonly key: string;
  readonly action: string;
}

export const KEYBINDINGS: readonly KeybindingItem[] = [
  { key: 'Space', action: 'Pause or resume active timer' },
  { key: 's', action: 'Skip current interval' },
  { key: 'r', action: 'Reset current interval' },
  { key: 'z', action: 'Toggle zen view' },
  { key: 'g', action: 'Cycle activity goals' },
  { key: 'a', action: 'Cycle chart activity filter' },
  { key: '1', action: 'Switch to home screen' },
  { key: '2 - 5', action: 'Today, Week, Month, and Year stats' },
  { key: '6', action: 'Settings screen' },
  { key: 'q', action: 'Quit application' }
] as const;

export interface FeatureItem {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
}

export const FEATURES: readonly FeatureItem[] = [
  {
    tag: 'DEVICE LOCK',
    title: 'Zero-willpower breaks',
    description:
      'When your break starts, pomlock grabs keyboard and mouse devices directly via evdev. You cannot dismiss a popup or keep typing.'
  },
  {
    tag: 'FULLSCREEN',
    title: 'Screen-filling countdown',
    description:
      'An unmissable countdown overlay blocks your desktop during rest intervals so you actually step away from your monitor.'
  },
  {
    tag: 'TERMINAL TUI',
    title: 'Built entirely for your terminal',
    description:
      'No Electron bloat. The timer, calendar stats, streak trackers, and configuration menus run right inside your shell.'
  },
  {
    tag: 'PRESETS',
    title: 'Preset & custom rhythms',
    description:
      'Switch between standard 25/5, 90/20 ultradian cycles, 50/10 sessions, or define custom intervals like "45 10 20 3".'
  },
  {
    tag: 'BAR INTEGRATION',
    title: 'Status bar JSON output',
    description:
      'Writes live state to /tmp/pomlock.json every second. Connects directly to Waybar, Polybar, or your custom shell scripts.'
  },
  {
    tag: 'ACTIVITIES & STREAKS',
    title: 'Activity setup & daily streaks',
    description:
      'Categorize sessions under custom activities and track consistency with gap-respecting daily streaks across days and weeks.'
  }
] as const;

export const SAMPLE_CONFIG = `[general]
block_input = true
notify = true
break_notify_msg = Time for a break!
long_break_notify_msg = Time for a long break!
pomo_notify_msg = Time for a pomodoro!
callback = 
timer = standard

[presets]
standard = 25 5 20 4
ultradian = 90 20 20 1
fifty_ten = 50 10 10 1

[overlay]
enabled = true
font_size = 48
color = white
bg_color = black
opacity = 0.8

[activities]
auto_calc = false
daily = 4h
weekly = 30h

[streak]
allowed_gap = 1
indicator_style = icon

[localization]
week_start_day = monday
locale = en_US`;
