<script lang="ts">
	import { onMount } from 'svelte';
	import { ThemeMode } from '$lib/constants';
	import Navbar from '$lib/components/Navbar.svelte';
	import PortalHeader from '$lib/components/PortalHeader.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import TerminalPreview from '$lib/components/TerminalPreview.svelte';
	import Features from '$lib/components/Features.svelte';
	import Keybindings from '$lib/components/Keybindings.svelte';
	import ConfigPreview from '$lib/components/ConfigPreview.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let currentTheme = $state<ThemeMode>(ThemeMode.Dark);

	// Apply active theme mode to document root
	function applyTheme(mode: ThemeMode): void {
		currentTheme = mode;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', mode);
		}
	}

	// Initialize theme on mount
	onMount(() => {
		applyTheme(ThemeMode.Dark);
	});
</script>

<svelte:head>
	<title>POMLOCK — Linux Pomodoro timer with evdev input lock</title>
	<meta
		name="description"
		content="pomlock is a Linux Pomodoro timer that locks your keyboard and mouse through evdev and covers your screen when breaks start. Zero-willpower breaks."
	/>
	<meta property="og:title" content="POMLOCK — Linux Pomodoro timer with evdev input lock" />
	<meta
		property="og:description"
		content="When your break starts, pomlock locks your keyboard and mouse through evdev and covers your screen with a countdown overlay. Stand up and step away."
	/>
	<meta property="og:image" content="/images/logo_transparent.png" />
	<meta name="theme-color" content="#023047" />
</svelte:head>

<!-- Master outer container wrapping all modular tabular boxes -->
<div
	id="top"
	class="min-h-screen px-0 py-0 selection:bg-[var(--color-primary)] selection:text-[#023047] sm:px-4 sm:py-6"
>
	<div class="tui-shadow mx-auto max-w-6xl border-2 border-[var(--border-ui)] bg-[var(--bg-app)]">
		<Navbar theme={currentTheme} onToggleTheme={applyTheme} />
		<PortalHeader />

		<main>
			<Hero />
			<TerminalPreview />
			<Features />
			<Keybindings />
			<ConfigPreview />
		</main>

		<Footer />
	</div>
</div>
