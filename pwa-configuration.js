const pwaConfiguration = {
	srcDir: './build',
	outDir: './.svelte-kit/output/client',
	mode: 'development',
	includeManifestIcons: false,
	scope: '/',
	base: '/',
	manifest: {
		short_name: "Daily Image",
		name: "Quick Image of the Day",
		start_url: "/",
		scope: "/",
		display: "standalone",
		theme_color: "#ff2300",
		background_color: "#ffffff",
		icons: []
	},
}

const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const sw = process.env.SW === 'true'
const replaceOptions = {
	__DATE_OBJ__: new Date(),
	__DATE__: new Date().toDateString(),
	__MONTH_DAY__: new Date().getUTCDate().toString() + new Date().getUTCMonth().toString(),
	__RELOAD_SW__: reload ? 'true' : 'false',
}

const workboxOrInjectManifestEntry = {
	// vite and SvelteKit are not aligned: pwa plugin will use /\.[a-f0-9]{8}\./ by default: #164 optimize workbox work
	dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
	globDirectory: './build/',
	globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
	globIgnores: sw ? (claims ? ['**/claims-sw*'] : ['**/prompt-sw*']) : ['**/sw*', '**/workbox-*'],
	// Before generating the service worker, manifestTransforms entry will allow us to transform the resulting precache manifest. See the manifestTransforms docs for mode details.
	manifestTransforms: [async (entries) => {
		// manifest.webmanifest is added always by pwa plugin, so we remove it.
		// EXCLUDE from the sw precache sw and workbox-*
		const manifest = entries.filter(({ url }) =>
			url !== 'manifest.webmanifest' && !url.endsWith('sw.js') && !url.startsWith('workbox-')
		).map((e) => {
			let url = e.url
			if (url && url.endsWith('.html')) {
				if (url.startsWith('/'))
					url = url.slice(1)

				e.url = url === 'index.html' ? '/' : `/${url.substring(0, url.lastIndexOf('/'))}`
				console.log(`${url} => ${e.url}`)
			}

			return e
		})
		return { manifest }
	}]
}

if (sw) {
	pwaConfiguration.srcDir = 'src'
	pwaConfiguration.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
	pwaConfiguration.strategies = 'injectManifest'
	pwaConfiguration.manifest.name = 'Quick Image Of the Day'
	pwaConfiguration.manifest.short_name = 'Daily Image'
	pwaConfiguration.injectManifest = workboxOrInjectManifestEntry
} else {
	workboxOrInjectManifestEntry.mode = 'development'
	workboxOrInjectManifestEntry.navigateFallback = '/'
	pwaConfiguration.workbox = workboxOrInjectManifestEntry
}

if (claims)
	pwaConfiguration.registerType = 'autoUpdate'

export { pwaConfiguration, replaceOptions }
