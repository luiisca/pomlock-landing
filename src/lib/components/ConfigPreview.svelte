<script lang="ts">
	import { SAMPLE_CONFIG } from '$lib/constants';

	const WAYBAR_JSON_SNIPPET = `"custom/pomodoro": {
  "exec": "/path/to/waybar.py",
  "interval": 1,
  "return-type": "json",
  "on-click": "/path/to/waybar.py left",
  "on-click-right": "/path/to/waybar.py right"
}`;
</script>

<section id="config" class="border-b-2 border-[var(--border-ui)] bg-[var(--bg-app)] font-mono">
	<!-- Section header bar -->
	<div
		class="flex flex-col justify-between gap-2 border-b-2 border-[var(--border-ui)] bg-[var(--bg-panel)] px-4 py-3 sm:flex-row sm:items-center"
	>
		<div>
			<div class="mb-0.5 flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
				<span>[06 // CONFIGURATION & EXTENSIBILITY]</span>
			</div>
			<h2 class="text-lg font-bold text-[var(--text-main)] sm:text-2xl">
				Plain text configuration, native shell hooks.
			</h2>
		</div>
		<span class="text-xs text-[var(--text-dim)]">~/.config/pomlock/pomlock.conf</span>
	</div>

	<!-- Configuration split box -->
	<div
		class="grid grid-cols-1 divide-y-2 divide-[var(--border-ui)] bg-[var(--bg-card)] lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0"
	>
		<!-- Left Box: Config file viewer -->
		<div class="flex flex-col justify-between p-4 sm:p-6">
			<div>
				<div
					class="mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs font-bold text-[var(--text-dim)]"
				>
					<span class="font-mono text-[var(--color-primary)]">~/.config/pomlock/pomlock.conf</span>
					<span>INI FORMAT</span>
				</div>
				<p class="mb-3 text-xs text-[var(--text-muted)]">
					Edit directly in your text editor or inside the TUI app by pressing <kbd
						class="border border-[var(--border-ui)] bg-[var(--bg-panel)] px-1.5 py-0.5 font-bold text-[var(--color-primary)]"
						>6</kbd
					>.
				</p>
				<div
					class="tui-shadow-sm overflow-x-auto border-2 border-[var(--border-ui)] bg-[var(--bg-terminal)] p-4 text-xs leading-relaxed text-[var(--terminal-text)] sm:text-sm"
				>
					<pre class="font-mono"><code>{SAMPLE_CONFIG}</code></pre>
				</div>
			</div>

			<div
				class="mt-4 flex justify-between border-t border-[var(--border-subtle)] pt-2 text-xs text-[var(--text-dim)]"
			>
				<span>SECTIONS: [general], [presets], [overlay]</span>
			</div>
		</div>

		<!-- Right Box: Status bar integration -->
		<div class="flex flex-col justify-between p-4 sm:p-6">
			<div>
				<div
					class="mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs font-bold text-[var(--text-dim)]"
				>
					<span class="font-mono text-[var(--color-primary)]">WAYBAR & POLYBAR HOOK</span>
					<span>/tmp/pomlock.json</span>
				</div>
				<p class="mb-3 text-xs text-[var(--text-muted)]">
					Pomlock writes live state to <code class="font-bold text-[var(--color-primary)]"
						>/tmp/pomlock.json</code
					> every second while running:
				</p>
				<div
					class="tui-shadow-sm mb-4 overflow-x-auto border-2 border-[var(--border-ui)] bg-[var(--bg-terminal)] p-3 text-xs text-[var(--terminal-muted)]"
				>
					<pre class="font-mono"><code
							>&#123;
  "action": "pomodoro",
  "time": 1500,
  "start_time": 1725580800.0,
  "crr-cycle": 1,
  "total-cycles": 4,
  "state": "running"
&#125;</code
						></pre>
				</div>

				<p class="mb-2 text-xs text-[var(--text-muted)]">
					Add this custom module to your Waybar configuration to display timer status in your bar:
				</p>
				<div
					class="tui-shadow-sm overflow-x-auto border-2 border-[var(--border-ui)] bg-[var(--bg-terminal)] p-3 font-mono text-xs text-[var(--color-primary)]"
				>
					<pre><code>{WAYBAR_JSON_SNIPPET}</code></pre>
				</div>
			</div>

			<div
				class="mt-4 flex flex-wrap justify-between gap-1 border-t border-[var(--border-subtle)] pt-2 text-xs text-[var(--text-dim)]"
			>
				<span
					>SCRIPT CALLBACK: <code class="font-bold text-[var(--text-main)]"
						>pomlock --callback /path/to/script.sh</code
					></span
				>
			</div>
		</div>
	</div>
</section>
