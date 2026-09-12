<script lang="ts">
	import { KEYBINDINGS } from '$lib/constants';
</script>

<section id="controls" class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-app)] font-mono fade-in">
	<!-- Section header bar -->
	<div
		class="flex flex-col justify-between gap-2 border-b-2 border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-3 sm:flex-row sm:items-center"
	>
		<div>
			<div class="mb-0.5 flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
				<span>[05 // KEYBOARD MATRIX]</span>
			</div>
			<h2 class="text-lg font-bold text-[var(--text-main)] sm:text-2xl">
				Single-keypress terminal controls.
			</h2>
		</div>
		<span class="text-xs text-[var(--text-dim)]">STDIN KEY EVENT DISPATCH</span>
	</div>

	<!-- Keybindings table with straight borders -->
	<div class="bg-[var(--bg-card)] p-4 sm:p-6">
		<div class="tui-shadow overflow-x-auto border-2 border-[var(--border-ui)] bg-[var(--bg-panel)]">
			<div
				class="flex items-center justify-between border-b border-[var(--border-ui)] px-4 py-2 text-xs font-bold text-[var(--text-dim)]"
			>
				<span>KEY MAPPINGS // IN-APP NAVIGATION</span>
				<span>ACTIVE LISTENER: TERMINAL STDIN</span>
			</div>

			<table class="w-full border-collapse text-left text-xs sm:text-sm">
				<thead>
					<tr
						class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-app)] text-[var(--color-primary)]"
					>
						<th class="w-32 border-r border-[var(--border-ui)] px-4 py-2.5 font-bold sm:w-44">
							[ KEY ]
						</th>
						<th class="px-4 py-2.5 font-bold"> ACTION PERFORMED </th>
					</tr>
				</thead>
				<tbody class="divide-y border-b border-[var(--border-subtle)] text-[var(--text-main)]">
					{#each KEYBINDINGS as item (item.key)}
						<tr class="transition-colors hover:bg-[var(--bg-card)]">
							<td
								class="border-r border-[var(--border-subtle)] px-4 py-2 font-mono whitespace-nowrap"
							>
								<kbd
									class="border border-[var(--border-ui)] bg-[var(--bg-app)] px-2 py-0.5 text-xs font-bold text-[var(--color-primary)] shadow-xs"
								>
									{item.key}
								</kbd>
							</td>
							<td class="px-4 py-2 font-semibold text-[var(--text-main)]">
								{item.action}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div
				class="flex flex-wrap justify-between gap-2 border-t border-[var(--border-ui)] bg-[var(--bg-app)] px-4 py-2 text-xs text-[var(--text-dim)]"
			>
				<span>INPUT RECOVERY: DEVICES AUTO-RELEASE ON TIMER FINISH OR APP EXIT</span>
				<span class="font-bold text-[var(--color-primary)]"
					>DURING LOCKDOWN: HARD RESTART (POWER BUTTON)</span
				>
			</div>
		</div>
	</div>
</section>
