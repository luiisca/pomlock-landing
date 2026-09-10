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

<section id="features" class="relative z-10 px-4 py-12 font-mono">
	<div class="mx-auto max-w-5xl">
		<!-- Section header -->
		<div class="mb-8 border-b border-[var(--border-ui)] pb-4">
			<div class="mb-1 flex items-center gap-2 text-xs text-[var(--color-accent)]">
				<span>///</span>
				<span>MECHANICS</span>
			</div>
			<h2 class="text-xl font-bold text-[var(--color-primary)] sm:text-3xl">
				Enforced rest, not voluntary suggestions.
			</h2>
			<p class="mt-2 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
				Traditional timers rely on willpower. When deadlines approach, willpower loses. Pomlock
				treats rest like a system interrupt.
			</p>
		</div>

		<!-- Interactive glowing cards grid -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="cards-grid"
			onmousemove={handleMouseMove}
			class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
		>
			{#each FEATURES as feat (feat.tag)}
				<div
					class="tui-glow-card tui-shadow-sm relative flex flex-col justify-between overflow-hidden border border-[var(--border-ui)] bg-[var(--bg-card)] p-4"
				>
					<div class="relative z-20">
						<!-- Technical tag header -->
						<div
							class="mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-[11px]"
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
						class="relative z-20 mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2 text-[10px] text-[var(--text-dim)]"
					>
						<span>STATE: ARMED</span>
						<span>SYS: OK</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
