<script lang="ts">
	import { onMount } from 'svelte';
	import { ThemeMode } from '$lib/constants';
	import Navbar from '$lib/components/Navbar.svelte';
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
	<title>pomlock — Linux Pomodoro timer with evdev input lock</title>
	<meta
		name="description"
		content="pomlock is a Linux Pomodoro timer that locks your keyboard and mouse through evdev and covers your screen when breaks start. Zero-willpower breaks."
	/>
	<meta property="og:title" content="pomlock — Linux Pomodoro timer with evdev input lock" />
	<meta
		property="og:description"
		content="When your break starts, pomlock locks your keyboard and mouse through evdev and covers your screen with a countdown overlay. Stand up and step away."
	/>
	<meta property="og:image" content="/images/logo.png" />
	<meta name="theme-color" content="#023047" />
</svelte:head>

<div
	id="top"
	class="flex min-h-screen flex-col selection:bg-[var(--color-accent)] selection:text-[#023047]"
>
	<Navbar theme={currentTheme} onToggleTheme={applyTheme} />

	<main class="flex-1">
		<Hero />
		<TerminalPreview />
		<Features />
		<Keybindings />
		<ConfigPreview />
	</main>

	<Footer />
</div>
