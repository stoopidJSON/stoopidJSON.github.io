// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	
	// Add gtag function declaration
	function gtag(...args: any[]): void;
	
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

export {};