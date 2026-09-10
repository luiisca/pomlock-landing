<script lang="ts">
	import {
		CopyState,
		GITHUB_RELEASES,
		GITHUB_REPO,
		INSTALL_OPTIONS,
		PackageManager,
		type InstallOption
	} from '$lib/constants';

	let activeManager = $state<PackageManager>(PackageManager.Uv);
	let copyState = $state<CopyState>(CopyState.Idle);
	let copyTimer: ReturnType<typeof setTimeout> | null = null;

	// Resolve active command string
	const activeOption = $derived<InstallOption>(
		INSTALL_OPTIONS.find((item) => item.manager === activeManager) ?? INSTALL_OPTIONS[0]
	);

	// Select a specific package manager tab
	function pickTab(pm: PackageManager): void {
		activeManager = pm;
	}

	// Copy active install command to clipboard
	async function copyCmd(): Promise<void> {
		if (typeof navigator === 'undefined' || !navigator.clipboard) {
			return;
		}

		try {
			await navigator.clipboard.writeText(activeOption.command);
			copyState = CopyState.Copied;

			if (copyTimer !== null) {
				clearTimeout(copyTimer);
			}

			copyTimer = setTimeout(() => {
				copyState = CopyState.Idle;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy command', err);
		}
	}
</script>

<section class="relative z-10 px-4 pt-10 pb-8 font-mono">
	<div class="mx-auto flex max-w-4xl flex-col items-center text-center">
		<!-- System status header -->
		<div
			class="mb-6 inline-flex items-center gap-2 border border-[var(--border-ui)] bg-[var(--bg-panel)] px-3 py-1 text-xs text-[var(--color-primary)]"
		>
			<span class="h-2 w-2 animate-pulse bg-[var(--color-accent)]"></span>
			<span>SYSTEM LOCK: READY</span>
			<span class="text-[var(--text-dim)]">|</span>
			<span class="text-[var(--text-muted)]">EVDEV KBD+MOUSE GRAB</span>
		</div>

		<!-- Logo display -->
		<div class="tui-shadow mb-6 border border-[var(--border-ui)] bg-[var(--bg-panel)] p-3">
			<img
				src="/images/logo.png"
				alt="pomlock logo"
				class="mx-auto block h-auto w-48 object-contain sm:w-64"
			/>
		</div>

		<!-- Main headline: Direct and punchy -->
		<h1
			class="max-w-3xl text-2xl leading-tight font-bold tracking-tight text-[var(--color-primary)] sm:text-4xl lg:text-5xl"
		>
			A Linux Pomodoro timer for developers who ignore break alerts.
		</h1>

		<!-- Human-sounding copy adhering strictly to writing guidelines -->
		<p
			class="mt-4 max-w-2xl text-left text-base leading-relaxed text-[var(--text-muted)] sm:text-center sm:text-lg"
		>
			When your break starts, pomlock locks your keyboard and mouse through <code
				class="border border-[var(--border-subtle)] bg-[var(--bg-panel)] px-1 text-[var(--color-accent)]"
				>evdev</code
			> and covers your screen with a countdown. You cannot dismiss a banner or keep typing.
		</p>

		<p
			class="mt-3 max-w-xl text-left text-sm text-[var(--text-dim)] italic sm:text-center sm:text-base"
		>
			"I built pomlock because desktop notifications never worked on me. I would dismiss the popup
			and type until my wrists hurt. pomlock removes the choice so you actually step away from your
			desk."
		</p>

		<!-- Package manager tabs and install command -->
		<div id="install" class="mt-8 w-full max-w-xl text-left">
			<div class="tui-shadow border border-[var(--border-ui)] bg-[var(--bg-terminal)]">
				<!-- Tab selection bar -->
				<div
					class="flex items-center border-b border-[var(--border-ui)] bg-[var(--bg-panel)] text-xs"
				>
					{#each INSTALL_OPTIONS as opt (opt.manager)}
						<button
							type="button"
							onclick={() => pickTab(opt.manager)}
							class="border-r border-[var(--border-ui)] px-4 py-2 font-mono transition-colors {activeManager ===
							opt.manager
								? 'bg-[var(--color-primary)] font-bold text-[#023047]'
								: 'text-[var(--text-muted)] hover:text-[var(--color-primary)]'}"
						>
							{opt.label}
						</button>
					{/each}
					<div class="ml-auto hidden pr-3 text-[11px] text-[var(--text-dim)] sm:block">
						quick install
					</div>
				</div>

				<!-- Command display and copy button -->
				<div class="flex items-center justify-between gap-3 p-3 font-mono text-sm">
					<div class="flex items-center gap-2 overflow-x-auto py-1 text-[var(--text-main)]">
						<span class="text-[var(--color-accent)] select-none">$</span>
						<span class="whitespace-nowrap select-all">{activeOption.command}</span>
					</div>

					<button
						type="button"
						onclick={copyCmd}
						class="shrink-0 border border-[var(--border-ui)] px-3 py-1 text-xs text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-[#023047]"
					>
						{copyState === CopyState.Copied ? '[ COPIED! ]' : '[ COPY ]'}
					</button>
				</div>
			</div>
		</div>

		<!-- Action links -->
		<div class="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
			<a
				href={GITHUB_RELEASES}
				target="_blank"
				rel="noreferrer"
				class="tui-shadow-sm border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2 font-bold text-[#023047] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]"
			>
				DOWNLOAD RELEASE
			</a>
			<a
				href={GITHUB_REPO}
				target="_blank"
				rel="noreferrer"
				class="tui-shadow-sm border border-[var(--border-ui)] px-4 py-2 text-[var(--text-main)] transition-colors hover:bg-[var(--border-ui)] hover:text-[var(--bg-app)]"
			>
				VIEW SOURCE ON GITHUB
			</a>
		</div>
	</div>
</section>
