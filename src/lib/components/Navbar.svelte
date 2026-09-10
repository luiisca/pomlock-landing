<script lang="ts">
	import { GITHUB_REPO, GITHUB_RELEASES, ThemeMode } from '$lib/constants';

	interface Props {
		theme: ThemeMode;
		onToggleTheme: (mode: ThemeMode) => void;
	}

	let { theme, onToggleTheme }: Props = $props();

	// Switch theme mode between dark and light
	function toggle(): void {
		const next = theme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
		onToggleTheme(next);
	}
</script>

<header
	class="relative z-30 border-b border-[var(--border-ui)] bg-[var(--bg-app)]/90 backdrop-blur-sm"
>
	<div
		class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 font-mono text-xs sm:text-sm"
	>
		<!-- Brand and version badge -->
		<div class="flex items-center gap-3">
			<a
				href="#top"
				class="flex items-center gap-2 font-bold tracking-wider text-[var(--color-primary)] hover:underline"
			>
				<span class="inline-block h-2 w-2 bg-[var(--color-primary)]"></span>
				<span>POMLOCK</span>
			</a>
			<span
				class="border border-[var(--border-ui)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent)]"
			>
				v3.0.0
			</span>
			<span class="hidden text-[var(--text-dim)] md:inline"> // linux-input-blocker </span>
		</div>

		<!-- Nav items and action buttons -->
		<nav class="flex items-center gap-4 text-[var(--text-muted)]">
			<a href="#features" class="transition-colors hover:text-[var(--color-primary)]">features</a>
			<a href="#install" class="transition-colors hover:text-[var(--color-primary)]">install</a>
			<a href="#controls" class="transition-colors hover:text-[var(--color-primary)]">controls</a>
			<a href="#config" class="transition-colors hover:text-[var(--color-primary)]">config</a>
			<a
				href={GITHUB_RELEASES}
				target="_blank"
				rel="noreferrer"
				class="hidden transition-colors hover:text-[var(--color-primary)] sm:inline"
			>
				releases
			</a>
			<a
				href={GITHUB_REPO}
				target="_blank"
				rel="noreferrer"
				class="border border-[var(--border-ui)] px-2 py-1 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-[#023047]"
			>
				github
			</a>

			<!-- Theme toggle switch -->
			<button
				type="button"
				onclick={toggle}
				class="border border-[var(--border-ui)] px-2 py-1 font-mono transition-colors hover:bg-[var(--border-ui)] hover:text-[var(--bg-app)]"
				aria-label="Toggle visual theme"
			>
				[{theme === ThemeMode.Dark ? '☀ LIGHT' : '☾ DARK'}]
			</button>
		</nav>
	</div>
</header>
