<script lang="ts">
	import { SAMPLE_CONFIG } from '$lib/constants';

	const WAYBAR_JSON_SNIPPET = `"custom/pomodoro": {
    "exec": "python3 /path/to/waybar.py",
    "interval": 1,
    "return-type": "json",
    "on-click": "python3 /path/to/waybar.py left",
    "on-click-right": "python3 /path/to/waybar.py right"
}`;
</script>

<section id="config" class="relative z-10 px-4 py-12 font-mono">
	<div class="mx-auto max-w-5xl">
		<!-- Section header -->
		<div class="mb-8 border-b border-[var(--border-ui)] pb-4">
			<div class="mb-1 flex items-center gap-2 text-xs text-[var(--color-accent)]">
				<span>///</span>
				<span>EXTENSIBILITY & INTEGRATION</span>
			</div>
			<h2 class="text-xl font-bold text-[var(--color-primary)] sm:text-3xl">
				Plain text configuration, native shell hooks.
			</h2>
			<p class="mt-2 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
				Settings live at <code class="text-[var(--color-primary)]"
					>~/.config/pomlock/pomlock.conf</code
				>. Edit directly in your text editor or inside the app by pressing
				<kbd class="border border-[var(--border-ui)] px-1">6</kbd>.
			</p>
		</div>

		<!-- Configuration split view -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<!-- Config file viewer -->
			<div class="tui-shadow border border-[var(--border-ui)] bg-[var(--bg-terminal)]">
				<div
					class="flex items-center justify-between border-b border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-xs"
				>
					<span class="font-bold text-[var(--color-primary)]">~/.config/pomlock/pomlock.conf</span>
					<span class="text-[var(--text-dim)]">INI FORMAT</span>
				</div>
				<pre
					class="overflow-x-auto p-4 text-xs leading-relaxed text-[var(--text-main)] sm:text-sm"><code
						>{SAMPLE_CONFIG}</code
					></pre>
			</div>

			<!-- Status bar integration -->
			<div
				class="tui-shadow flex flex-col justify-between border border-[var(--border-ui)] bg-[var(--bg-terminal)]"
			>
				<div>
					<div
						class="flex items-center justify-between border-b border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-2 text-xs"
					>
						<span class="font-bold text-[var(--color-primary)]">STATUS BAR & WAYBAR HOOK</span>
						<span class="text-[var(--text-dim)]">/tmp/pomlock.json</span>
					</div>
					<div class="space-y-3 p-4 text-xs text-[var(--text-muted)] sm:text-sm">
						<p>
							Pomlock writes its live state to <code class="text-[var(--color-accent)]"
								>/tmp/pomlock.json</code
							> every second while running:
						</p>
						<pre
							class="overflow-x-auto border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 text-[11px] text-[var(--text-main)]"><code
								>&#123;
  "action": "pomodoro",
  "time": 1500,
  "start_time": 1725580800.0,
  "crr-cycle": 1,
  "total-cycles": 4,
  "state": "running"
&#125;</code
							></pre>
						<p class="text-xs">
							Add this module to your Waybar configuration to display timer status directly in your
							status bar:
						</p>
						<pre
							class="overflow-x-auto border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 text-[11px] text-[var(--color-primary)]"><code
								>{WAYBAR_JSON_SNIPPET}</code
							></pre>
					</div>
				</div>

				<div
					class="border-t border-[var(--border-ui)] bg-[var(--bg-panel)] p-3 text-xs text-[var(--text-dim)]"
				>
					Script callback support: <code class="text-[var(--text-main)]"
						>pomlock --callback /path/to/script.sh</code
					>
				</div>
			</div>
		</div>
	</div>
</section>
