<script lang="ts">
	import { KEYBINDINGS } from '$lib/constants';
</script>

<section id="controls" class="relative z-10 px-4 py-12 font-mono">
	<div class="mx-auto max-w-5xl">
		<!-- Section header -->
		<div
			class="mb-8 flex flex-col justify-between gap-2 border-b border-[var(--border-ui)] pb-4 sm:flex-row sm:items-end"
		>
			<div>
				<div class="mb-1 flex items-center gap-2 text-xs text-[var(--color-accent)]">
					<span>///</span>
					<span>KEYBOARD CONTROLS</span>
				</div>
				<h2 class="text-xl font-bold text-[var(--color-primary)] sm:text-3xl">
					Built for fast terminal navigation.
				</h2>
			</div>
			<span class="text-xs text-[var(--text-dim)]">ALL SHORTCUTS SINGLE KEYPRESS</span>
		</div>

		<!-- Keybindings table with straight borders -->
		<div
			class="tui-shadow overflow-x-auto border border-[var(--border-ui)] bg-[var(--bg-terminal)]"
		>
			<div
				class="flex items-center justify-between border-b border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-xs text-[var(--text-muted)]"
			>
				<span>KEY MAPPINGS // IN-APP NAVIGATION</span>
				<span>ACTIVE LISTENER: TERMINAL STDIN</span>
			</div>

			<table class="w-full border-collapse text-left text-xs sm:text-sm">
				<thead>
					<tr class="border-b border-[var(--border-subtle)] text-[var(--color-primary)]">
						<th class="w-32 border-r border-[var(--border-subtle)] px-4 py-2.5 font-bold sm:w-44">
							[ KEY ]
						</th>
						<th class="px-4 py-2.5 font-bold"> ACTION PERFORMED </th>
					</tr>
				</thead>
				<tbody class="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
					{#each KEYBINDINGS as item (item.key)}
						<tr class="transition-colors hover:bg-[var(--bg-card)]">
							<td
								class="border-r border-[var(--border-subtle)] px-4 py-2 font-mono whitespace-nowrap text-[var(--color-accent)]"
							>
								<kbd
									class="border border-[var(--border-ui)] bg-[var(--bg-panel)] px-1.5 py-0.5 text-xs text-[var(--text-main)]"
								>
									{item.key}
								</kbd>
							</td>
							<td class="px-4 py-2 text-[var(--text-main)]">
								{item.action}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div
				class="flex flex-wrap justify-between gap-2 border-t border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-[11px] text-[var(--text-dim)]"
			>
				<span>EMERGENCY UNLOCK: CTRL+C (SIGINT) RELEASES ALL DEVICES</span>
				<span>VT BACKUP: CTRL+ALT+F3 &gt; PKILL -F POMLOCK</span>
			</div>
		</div>
	</div>
</section>
