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

<section class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-app)] font-mono">
	<!-- Tabular 2-column boxed layout -->
	<div
		class="grid grid-cols-1 divide-y-2 divide-[var(--border-ui)] lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0"
	>
		<!-- Left Box: Problem, Solution & System Specs -->
		<div class="flex flex-col justify-between bg-[var(--bg-card)] p-4 sm:p-6">
			<div>
				<!-- Section tag -->
				<div
					class="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs text-[var(--text-dim)]"
				>
					<span class="font-bold text-[var(--color-primary)]">[01 // PROBLEM & RESOLUTION]</span>
					<span>+---+</span>
				</div>

				<h2 class="text-xl leading-tight font-bold text-[var(--color-primary)] sm:text-3xl">
					A Linux Pomodoro timer for developers who ignore break alerts.
				</h2>

				<!-- Direct human-sounding copy -->
				<div class="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
					<p>
						When your break starts, pomlock locks your keyboard and mouse through
						<code
							class="border border-[var(--border-subtle)] bg-[var(--bg-panel)] px-1 font-bold text-[var(--color-primary)]"
							>evdev</code
						>
						and covers your screen with a countdown. You cannot dismiss a banner or keep typing.
					</p>

					<p
						class="border-l-2 border-[var(--color-primary)] pl-3 text-sm text-[var(--text-main)] italic"
					>
						"I built pomlock because desktop notifications never worked on me. I would dismiss the
						popup and type until my wrists hurt. pomlock removes the choice so you actually step
						away from your desk."
					</p>
				</div>
			</div>

			<!-- System specification matrix table -->
			<div class="mt-6 border border-[var(--border-ui)] bg-[var(--bg-panel)]">
				<div
					class="flex justify-between border-b border-[var(--border-ui)] px-3 py-1.5 text-xs font-bold text-[var(--color-primary)]"
				>
					<span>SYSTEM SPECIFICATION</span>
					<span>ARCHIVE: 09-10-26</span>
				</div>
				<table class="w-full border-collapse text-xs">
					<tbody class="divide-y divide-[var(--border-subtle)]">
						<tr>
							<td
								class="w-36 border-r border-[var(--border-subtle)] px-3 py-1.5 font-bold text-[var(--text-dim)]"
							>
								INPUT BLOCK
							</td>
							<td class="px-3 py-1.5 font-semibold text-[var(--text-main)]">
								evdev hardware grab (/dev/input)
							</td>
						</tr>
						<tr>
							<td
								class="border-r border-[var(--border-subtle)] px-3 py-1.5 font-bold text-[var(--text-dim)]"
							>
								INTERFACE
							</td>
							<td class="px-3 py-1.5 text-[var(--text-main)]">
								Shell TUI (Textual, no Electron)
							</td>
						</tr>
						<tr>
							<td
								class="border-r border-[var(--border-subtle)] px-3 py-1.5 font-bold text-[var(--text-dim)]"
							>
								FAILSAFE
							</td>
							<td class="px-3 py-1.5 font-bold text-[var(--color-primary)]">
								SIGINT (Ctrl+C) / power button hard reset during lock
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Right Box: Installation & Commands -->
		<div id="install" class="flex flex-col justify-between bg-[var(--bg-card)] p-4 sm:p-6">
			<div>
				<!-- Section tag -->
				<div
					class="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs text-[var(--text-dim)]"
				>
					<span class="font-bold text-[var(--color-primary)]">[02 // INSTALLATION & USAGE]</span>
					<span>SYS: ARMED</span>
				</div>

				<p class="mb-4 text-xs text-[var(--text-muted)] sm:text-sm">
					Install pomlock via your preferred Python tool manager (AUR package coming soon):
				</p>

				<!-- Package manager tabs and install command -->
				<div class="tui-shadow border-2 border-[var(--border-ui)] bg-[var(--bg-panel)]">
					<!-- Tab selector -->
					<div class="flex items-center border-b-2 border-[var(--border-ui)] text-xs">
						{#each INSTALL_OPTIONS as opt (opt.manager)}
							<button
								type="button"
								onclick={() => pickTab(opt.manager)}
								class="flex items-center gap-1.5 border-r-2 border-[var(--border-ui)] px-4 py-2 font-mono transition-colors {activeManager ===
								opt.manager
									? 'bg-[var(--color-primary)] font-bold text-[#023047]'
									: 'text-[var(--text-main)] hover:bg-[var(--border-subtle)]'}"
							>
								<span>{opt.label}</span>
								{#if opt.comingSoon}
									<span
										class="py-0.2 border px-1 text-[9px] font-black uppercase {activeManager ===
										opt.manager
											? 'border-[#023047] bg-[#023047] text-[var(--color-primary)]'
											: 'border-[var(--color-primary)] text-[var(--color-primary)]'}"
									>
										SOON
									</span>
								{/if}
							</button>
						{/each}
						<div class="ml-auto hidden pr-3 text-[11px] text-[var(--text-dim)] sm:block">
							[ ONE-CLICK COPY ]
						</div>
					</div>

					<!-- Command terminal display with explicit high-contrast text -->
					<div
						class="flex items-center justify-between gap-3 bg-[var(--bg-app)] p-3 font-mono text-xs sm:text-sm"
					>
						<div
							class="flex items-center gap-2 overflow-x-auto py-1 font-semibold text-[var(--text-main)]"
						>
							<span class="font-bold text-[var(--color-primary)] select-none">$</span>
							<span class="whitespace-nowrap select-all">{activeOption.command}</span>
							{#if activeOption.comingSoon}
								<span
									class="ml-1 border border-[var(--color-primary)] bg-[var(--bg-panel)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-primary)] select-none"
								>
									[COMING SOON]
								</span>
							{/if}
						</div>

						<button
							type="button"
							onclick={copyCmd}
							class="shrink-0 border border-[var(--border-ui)] bg-[var(--bg-panel)] px-3 py-1 text-xs font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-[#023047]"
						>
							{copyState === CopyState.Copied ? '[ COPIED! ]' : '[ COPY ]'}
						</button>
					</div>
				</div>

				<!-- Quick CLI flags reference box -->
				<div
					class="mt-4 space-y-1.5 border border-[var(--border-ui)] bg-[var(--bg-panel)] p-3 text-xs"
				>
					<div class="mb-1 text-[11px] font-bold text-[var(--text-dim)]">
						COMMON CLI RUNTIME FLAGS:
					</div>
					<div class="flex justify-between">
						<span class="font-mono text-[var(--text-main)]">pomlock -t ultradian</span>
						<span class="text-[var(--text-dim)]"># 90m work / 20m break</span>
					</div>
					<div class="flex justify-between">
						<span class="font-mono text-[var(--text-main)]">pomlock --no-block-input</span>
						<span class="text-[var(--text-dim)]"># disable evdev grab</span>
					</div>
					<div class="flex justify-between">
						<span class="font-mono text-[var(--text-main)]">pomlock -a coding</span>
						<span class="text-[var(--text-dim)]"># track activity goal</span>
					</div>
				</div>
			</div>

			<!-- Action buttons -->
			<div
				class="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4 text-xs sm:text-sm"
			>
				<a
					href={GITHUB_RELEASES}
					target="_blank"
					rel="noreferrer"
					class="tui-shadow-sm border-2 border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2 font-bold text-[#023047] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]"
				>
					DOWNLOAD RELEASES
				</a>
				<a
					href={GITHUB_REPO}
					target="_blank"
					rel="noreferrer"
					class="tui-shadow-sm border-2 border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--border-ui)] hover:text-[var(--bg-app)]"
				>
					VIEW GITHUB REPO
				</a>
			</div>
		</div>
	</div>
</section>
