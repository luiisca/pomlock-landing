<script lang="ts">
	import { onDestroy } from 'svelte';
	import { TimerPhase } from '$lib/constants';

	const WORK_SECONDS = 1500;
	const BREAK_SECONDS = 300;
	const TICK_INTERVAL_MS = 1000;

	let secondsLeft = $state<number>(WORK_SECONDS);
	let isRunning = $state<boolean>(false);
	let phase = $state<TimerPhase>(TimerPhase.Work);
	let cycle = $state<number>(1);
	let timerHandle: ReturnType<typeof setInterval> | null = null;

	// Format remaining time as MM:SS with leading zeros
	const displayTime = $derived.by(() => {
		const mins = Math.floor(secondsLeft / 60);
		const secs = secondsLeft % 60;
		const padMins = mins < 10 ? `0${mins}` : `${mins}`;
		const padSecs = secs < 10 ? `0${secs}` : `${secs}`;
		return `${padMins}:${padSecs}`;
	});

	// Handle each 1-second clock tick
	function tick(): void {
		if (secondsLeft > 0) {
			secondsLeft -= 1;
			return;
		}

		if (phase === TimerPhase.Work) {
			phase = TimerPhase.Break;
			secondsLeft = BREAK_SECONDS;
			return;
		}

		phase = TimerPhase.Work;
		secondsLeft = WORK_SECONDS;
		cycle = (cycle % 4) + 1;
	}

	// Toggle active timer state
	function toggleTimer(): void {
		if (isRunning) {
			if (timerHandle !== null) {
				clearInterval(timerHandle);
				timerHandle = null;
			}
			isRunning = false;
			return;
		}

		isRunning = true;
		timerHandle = setInterval(tick, TICK_INTERVAL_MS);
	}

	// Reset timer to current phase start
	function resetTimer(): void {
		if (timerHandle !== null) {
			clearInterval(timerHandle);
			timerHandle = null;
		}
		isRunning = false;
		secondsLeft = phase === TimerPhase.Work ? WORK_SECONDS : BREAK_SECONDS;
	}

	// Clean up timer handle on destroy
	onDestroy(() => {
		if (timerHandle !== null) {
			clearInterval(timerHandle);
		}
	});
</script>

<section class="relative z-10 px-4 py-8 font-mono">
	<div class="mx-auto max-w-5xl">
		<!-- Window frame header -->
		<div class="tui-shadow border border-[var(--border-ui)] bg-[var(--bg-terminal)]">
			<div
				class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-xs"
			>
				<div class="flex items-center gap-2">
					<span class="inline-block h-2.5 w-2.5 bg-[var(--color-primary)]"></span>
					<span class="font-bold text-[var(--color-primary)]">TERMINAL SESSION // LIVE STATE</span>
				</div>

				<div class="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
					<span>PID: 18420</span>
					<span>STATE: {isRunning ? 'RUNNING' : 'PAUSED'}</span>
					<span>BLOCK_INPUT: {phase === TimerPhase.Break ? 'ENABLED' : 'ARMED'}</span>
				</div>
			</div>

			<!-- Live 7-segment digital HUD -->
			<div class="border-b border-[var(--border-ui)] bg-[var(--bg-card)] p-4 sm:p-6">
				<div class="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
					<!-- Digital LED clock display -->
					<div
						class="flex flex-col items-center gap-4 border border-[var(--border-subtle)] bg-[var(--bg-terminal)] p-4 sm:flex-row md:col-span-2"
					>
						<div class="flex flex-col items-center sm:items-start">
							<span class="text-[11px] tracking-wider text-[var(--text-dim)] uppercase">
								7-Segment Countdown ({phase.toUpperCase()})
							</span>
							<div
								class="font-dseg my-1 text-4xl tracking-widest text-[var(--color-primary)] select-none sm:text-6xl"
							>
								{displayTime}
							</div>
							<span class="font-mono text-[11px] text-[var(--color-accent)]">
								{phase === TimerPhase.Work ? '[ WORK INTERVAL ]' : '[ LOCKDOWN BREAK ]'}
							</span>
						</div>

						<div class="flex w-full gap-2 sm:ml-auto sm:w-auto sm:flex-col">
							<button
								type="button"
								onclick={toggleTimer}
								class="flex-1 border border-[var(--border-ui)] px-3 py-1.5 text-center text-xs text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-[#023047] sm:flex-none"
							>
								{isRunning ? '[ SPACE ] PAUSE' : '[ SPACE ] START'}
							</button>
							<button
								type="button"
								onclick={resetTimer}
								class="flex-1 border border-[var(--border-ui)] px-3 py-1.5 text-center text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--border-ui)] hover:text-[var(--bg-app)] sm:flex-none"
							>
								[ R ] RESET
							</button>
						</div>
					</div>

					<!-- Telemetry stats block -->
					<div
						class="space-y-2 border border-[var(--border-subtle)] bg-[var(--bg-terminal)] p-4 text-xs"
					>
						<div class="flex justify-between border-b border-[var(--border-subtle)] pb-1">
							<span class="text-[var(--text-dim)]">CYCLE:</span>
							<span class="font-bold text-[var(--color-primary)]">{cycle} / 4</span>
						</div>
						<div class="flex justify-between border-b border-[var(--border-subtle)] pb-1">
							<span class="text-[var(--text-dim)]">PRESET:</span>
							<span class="text-[var(--text-main)]">standard (25/5)</span>
						</div>
						<div class="flex justify-between border-b border-[var(--border-subtle)] pb-1">
							<span class="text-[var(--text-dim)]">DEV LOCK:</span>
							<span
								class={phase === TimerPhase.Break
									? 'font-bold text-[var(--color-accent)]'
									: 'text-[var(--color-cyan)]'}
							>
								{phase === TimerPhase.Break ? 'LOCKED (/dev/input)' : 'READY'}
							</span>
						</div>
						<div class="flex justify-between">
							<span class="text-[var(--text-dim)]">STATUS FILE:</span>
							<span class="truncate text-[var(--text-muted)]">/tmp/pomlock.json</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Actual TUI screenshot in frame -->
			<div class="bg-[var(--bg-terminal)] p-3 sm:p-4">
				<div class="mb-2 flex items-center justify-between text-xs text-[var(--text-dim)]">
					<span>TUI SCREENSHOT (HOME & STATS VIEWS)</span>
					<span>100% IN-SHELL TEXTUAL INTERFACE</span>
				</div>
				<div class="overflow-hidden border border-[var(--border-subtle)]">
					<img
						src="/images/demo.png"
						alt="pomlock terminal user interface demo"
						class="block h-auto w-full object-cover"
					/>
				</div>
			</div>

			<!-- Footer status line -->
			<div
				class="flex flex-wrap items-center justify-between border-t border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-1.5 text-[11px] text-[var(--text-dim)]"
			>
				<div class="flex items-center gap-3">
					<span>[1] HOME</span>
					<span>[2-5] STATS</span>
					<span>[6] SETTINGS</span>
					<span>[Q] QUIT</span>
				</div>
				<span>NO ELECTRON • PYTHON + TEXTUAL + EVDEV</span>
			</div>
		</div>
	</div>
</section>
