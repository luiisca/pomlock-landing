<script lang="ts">
	import { FEATURES } from '$lib/constants';

	// Update mouse coordinates for glow effect across cards
	function handleMouseMove(e: MouseEvent): void {
		const cards = document.getElementsByClassName('tui-glow-card');

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
				Enforced rest, not voluntary suggestions.
			</h2>
		</div>
		<span class="text-xs text-[var(--text-dim)]">HARDWARE INTERRUPT MODEL</span>
	</div>

	<!-- Interactive glowing cards modular grid -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="cards-grid"
		onmousemove={handleMouseMove}
		class="grid grid-cols-1 divide-y-2 divide-[var(--border-ui)] border-b-2 border-[var(--border-ui)] md:grid-cols-2 md:divide-y-0 lg:grid-cols-3"
	>
		{#each FEATURES as feat, idx (feat.tag)}
			<div
				class="tui-glow-card relative flex flex-col justify-between overflow-hidden border-b-2 border-[var(--border-ui)] bg-[var(--bg-card)] p-5 md:border-b-0 {idx %
					3 !==
				2
					? 'lg:border-r-2'
					: ''} {idx % 2 !== 1 ? 'md:border-r-2 lg:border-r-0' : ''} {idx < 3
					? 'lg:border-b-2'
					: ''} {idx < 4 ? 'md:border-b-2 lg:border-b-0' : ''}"
			>
				<div class="relative z-20">
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
				</div>

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
