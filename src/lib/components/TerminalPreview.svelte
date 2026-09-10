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

<section class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-app)] font-mono">
	<!-- Top status line -->
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-xs"
	>
		<div class="flex items-center gap-2">
			<span class="inline-block h-2.5 w-2.5 bg-[var(--color-primary)]"></span>
			<span class="font-bold text-[var(--text-main)]">[03 // TERMINAL WORKSTATION & TELEMETRY]</span
			>
		</div>

		<div class="flex items-center gap-4 text-[11px] text-[var(--text-dim)]">
			<span>PID: 18420</span>
			<span>STATE: {isRunning ? 'RUNNING' : 'PAUSED'}</span>
			<span>EVDEV_GRAB: {phase === TimerPhase.Break ? 'LOCKED' : 'ARMED'}</span>
		</div>
	</div>

	<!-- Live 7-segment digital HUD and telemetry -->
	<div class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-card)] p-4 sm:p-6">
		<div class="grid grid-cols-1 items-center gap-4 lg:grid-cols-3">
			<!-- Digital LED clock display -->
			<div
				class="tui-shadow-sm flex flex-col items-center gap-4 border-2 border-[var(--border-ui)] bg-[var(--bg-terminal)] p-4 text-[var(--terminal-text)] sm:flex-row lg:col-span-2"
			>
				<div class="flex flex-col items-center sm:items-start">
					<span class="text-[11px] tracking-wider text-[var(--terminal-muted)] uppercase">
						7-Segment Countdown ({phase.toUpperCase()})
					</span>
					<div
						class="font-dseg my-1 text-4xl tracking-widest text-[var(--color-primary)] select-none sm:text-6xl"
					>
						{displayTime}
					</div>
					<span class="font-mono text-xs font-bold text-[var(--color-accent)]">
						{phase === TimerPhase.Work
							? '[ WORK INTERVAL: FOCUS ]'
							: '[ LOCKDOWN BREAK: INPUT BLOCKED ]'}
					</span>
				</div>

				<div class="flex w-full gap-2 sm:ml-auto sm:w-auto sm:flex-col">
					<button
						type="button"
						onclick={toggleTimer}
						class="flex-1 border-2 border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2 text-center text-xs font-bold text-[#023047] transition-colors hover:bg-[var(--color-accent)] sm:flex-none"
					>
						{isRunning ? '[ SPACE ] PAUSE' : '[ SPACE ] START'}
					</button>
					<button
						type="button"
						onclick={resetTimer}
						class="flex-1 border border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-center text-xs font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--border-ui)] hover:text-[var(--bg-app)] sm:flex-none"
					>
						[ R ] RESET
					</button>
				</div>
			</div>

			<!-- Telemetry stats block with guaranteed contrast -->
			<div class="space-y-2.5 border-2 border-[var(--border-ui)] bg-[var(--bg-panel)] p-4 text-xs">
				<div class="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
					<span class="font-bold text-[var(--text-dim)]">CYCLE:</span>
					<span class="font-bold text-[var(--color-primary)]">{cycle} / 4</span>
				</div>
				<div class="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
					<span class="font-bold text-[var(--text-dim)]">PRESET:</span>
					<span class="font-semibold text-[var(--text-main)]">standard (25/5)</span>
				</div>
				<div class="flex justify-between border-b border-[var(--border-subtle)] pb-1.5">
					<span class="font-bold text-[var(--text-dim)]">INPUT LOCK:</span>
					<span
						class={phase === TimerPhase.Break
							? 'font-bold text-[var(--color-primary)]'
							: 'text-[var(--text-main)]'}
					>
						{phase === TimerPhase.Break ? 'LOCKED (/dev/input)' : 'ARMED'}
					</span>
				</div>
				<div class="flex justify-between">
					<span class="font-bold text-[var(--text-dim)]">STATUS FILE:</span>
					<span class="truncate font-mono text-[var(--text-main)]">/tmp/pomlock.json</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Real TUI screenshot demo -->
	<div class="bg-[var(--bg-app)] p-4 sm:p-6">
		<div class="mb-2 flex items-center justify-between text-xs font-bold text-[var(--text-dim)]">
			<span>TEXTUAL INTERFACE SCREENSHOT // REAL RUNTIME SNAPSHOT</span>
			<span>HOMEPAGE & STATS GRAPH VIEW</span>
		</div>
		<div class="tui-shadow overflow-hidden border-2 border-[var(--border-ui)]">
			<img
				src="/images/demo.png"
				alt="pomlock terminal user interface demo"
				class="block h-auto w-full object-cover"
			/>
		</div>
	</div>

	<!-- Footer status line -->
	<div
		class="flex flex-wrap items-center justify-between border-t-2 border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-[11px] text-[var(--text-dim)]"
	>
		<div class="flex items-center gap-3 font-semibold">
			<span>[1] HOME</span>
			<span>[2-5] STATS</span>
			<span>[6] SETTINGS</span>
			<span>[Q] QUIT</span>
		</div>
		<span class="font-bold text-[var(--color-primary)]">PYTHON • TEXTUAL • EVDEV • LINUX</span>
	</div>
</section>
