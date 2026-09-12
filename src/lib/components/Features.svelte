<script lang="ts">
	import { FEATURES } from '$lib/constants';

	// Update mouse coordinates for glow effect across cards
	function handleMouseMove(e: MouseEvent): void {
		const cards = document.getElementsByClassName('tui-glow-card');
		const cards_grid = document.getElementById('cards-grid') as HTMLElement;
		const rect = cards_grid.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		cards_grid?.style.setProperty('--mouse-x', `${x}px`);
		cards_grid?.style.setProperty('--mouse-y', `${y}px`);

		for (let i = 0; i < cards.length; i++) {
			const card = cards[i] as HTMLElement;
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			card.style.setProperty('--mouse-x', `${x}px`);
			card.style.setProperty('--mouse-y', `${y}px`);
		}
	}
</script>

<section id="features" class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-app)] font-mono">
	<!-- Section header bar -->
	<div
		class="flex flex-col justify-between gap-2 border-b-2 border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-3 sm:flex-row sm:items-center"
	>
		<div>
			<div class="mb-0.5 flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
				<span>[04 // ARCHITECTURAL FEATURES]</span>
			</div>
			<h2 class="text-lg font-bold text-[var(--text-main)] sm:text-2xl">
				Hard breaks. No dismiss button.
			</h2>
		</div>
		<span class="text-xs text-[var(--text-dim)]">HARDWARE INTERRUPT MODEL</span>
	</div>

	<!-- Interactive glowing cards modular grid -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="cards-grid"
		onmousemove={handleMouseMove}
		class="relative grid grid-cols-1 gap-x-0.5 gap-y-0.5 bg-[rgba(33,_158,_188,_0.6)] md:grid-cols-2 lg:grid-cols-3"
	>
		{#each FEATURES as feat, idx (feat.tag)}
			<div
				class="tui-glow-card relative z-20 flex flex-col justify-between overflow-hidden bg-[var(--bg-card)] p-5"
			>
				<!-- Technical tag header -->
				<div
					class="mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs"
				>
					<span class="font-bold text-[var(--color-primary)]">[{feat.tag}]</span>
					<span class="text-[var(--text-dim)]">+---+</span>
				</div>

				<!-- Feature title -->
				<h3 class="mb-2 text-base font-bold text-[var(--text-main)]">
					{feat.title}
				</h3>

				<!-- Feature copy adhering to Human-Sounding Writer rules -->
				<p class="text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
					{feat.description}
				</p>
				<div
					class="relative z-20 mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2 text-[11px] text-[var(--text-dim)]"
				>
					<span>MODULE_ID: 0{idx + 1}</span>
					<span class="font-bold text-[var(--color-primary)]">ARMED</span>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="postcss">
	/* Glowing card interactive effect - pnc-landing inspired */
	#cards-grid:hover::before {
		opacity: 1;
	}

	.tui-glow-card:hover::after {
		opacity: 0.15;
	}

	#cards-grid::before,
	.tui-glow-card::before,
	.tui-glow-card::after {
		transform: translateZ(0); /* Trigger hardware acceleration */
		content: '';
		height: 100%;
		width: 100%;
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 500ms;
	}

	#cards-grid::before {
		background: radial-gradient(
			circle 600px at var(--mouse-x) var(--mouse-y),
			rgba(33, 158, 188, 1),
			transparent 40%
		);
		z-index: 10;
		pointer-events: none;
	}

	.tui-glow-card::after {
		pointer-events: none;
		background:
			radial-gradient(
				circle 800px at var(--mouse-x) var(--mouse-y),
				rgba(209, 194, 224, 0.3),
				transparent 40%
			),
			var(--grain) rgba(255, 255, 255, 0.1);
		z-index: 30;
	}
</style>
