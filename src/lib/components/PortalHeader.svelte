<script lang="ts">
</script>

<div class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-panel)] font-mono">
	<!-- Top technical ticker tape -->
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-ui)] px-3 py-1 text-[11px] font-semibold text-[var(--text-dim)] uppercase select-none"
	>
		<div class="flex items-center gap-2">
			<span class="font-bold text-[var(--color-primary)]">░▒▓ POMLOCK_SYS_001 ▓▒░</span>
			<span>//</span>
			<span>BOOT SEQUENCE COMPLETE</span>
			<span class="hidden md:inline">//</span>
			<span class="hidden md:inline">EVDEV INPUT GRAB ARMED</span>
		</div>
		<div class="flex items-center gap-3 text-[10px]">
			<span
				class="py-0.2 border border-[var(--border-ui)] px-1.5 font-bold text-[var(--color-primary)]"
			>
				ACTIVE
			</span>
			<span class="hidden sm:inline">CYCLE: 01/04</span>
			<span class="font-bold text-[var(--color-primary)]">00:25:00</span>
		</div>
	</div>

	<!-- Massive screen-spanning POMLOCK banner -->
	<div
		class="relative flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-card)] px-4 py-6 text-center sm:py-9"
	>
		<!-- Background watermark pattern -->
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center text-[12vw] font-black tracking-widest text-[var(--text-main)] opacity-5 select-none"
		>
			POMLOCK
		</div>

		<!-- Logo mark and giant typography -->
		<div class="relative z-10 flex w-full flex-col items-center">
			<!-- Transparent pixel art logo -->
			<div
				class="tui-shadow-sm mb-3 inline-block border-2 border-[var(--border-ui)] bg-[var(--bg-app)] p-2"
			>
				<img
					src="/images/logo_transparent.png"
					alt="pomlock insignia"
					class="pomlock-logo-img block h-8 w-auto object-contain sm:h-12"
				/>
			</div>

			<!-- Giant screen-filling POMLOCK title like PORTAL in reference image -->
			<h1
				class="tui-portal-title text-4xl leading-none font-black text-[var(--color-primary)] uppercase select-none sm:text-7xl md:text-8xl lg:text-9xl"
			>
				POMLOCK
			</h1>

			<!-- Sub-ticker indicator inside header -->
			<div
				class="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[var(--text-muted)] sm:gap-3 sm:text-sm"
			>
				<span class="tracking-wide text-[var(--text-main)]">LINUX EVDEV INPUT BLOCKER</span>
				<span class="text-[var(--text-dim)]">//</span>
				<span class="font-bold text-[var(--color-primary)]">ZERO-WILLPOWER REST</span>
			</div>
		</div>
	</div>

	<!-- Bottom technical ticker ribbon -->
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-ui)] px-3 py-1 text-[11px] font-semibold text-[var(--text-dim)] select-none"
	>
		<div class="flex items-center gap-2">
			<span>░▒▓ PORTAL ENTRANCE</span>
			<span>•</span>
			<span>TERMINAL TROVE (SOON)</span>
			<span class="hidden sm:inline">•</span>
			<span class="hidden sm:inline">NO ELECTRON BLOAT</span>
		</div>
		<div class="flex items-center gap-3">
			<span>TARGET: LINUX_x86_64</span>
			<span class="font-bold text-[var(--color-primary)]">▓▒░</span>
		</div>
	</div>
</div>

<style>
	/* Portal title crisp industrial rendering */
	.tui-portal-title {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
		letter-spacing: 0.18em;
		text-shadow: 3px 3px 0px var(--border-ui);
	}
	:global([data-theme='light']) .tui-portal-title {
		text-shadow: 2px 2px 0px rgba(2, 48, 71, 0.4);
	}
	:global([data-theme='light']) .pomlock-logo-img {
		filter: invert(1);
	}
</style>
