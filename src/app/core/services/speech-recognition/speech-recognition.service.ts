import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { WINDOW } from '@core/tokens';
import { BehaviorSubject, Observable } from 'rxjs';

enum SpchStrings {
	SpchRec = 'SpeechRecognition',
	webSpchRec = 'webkitSpeechRecognition'
}

interface RecognitionResults {
	results: { transcript: string }[][];
}

interface Recognition {
	message: string;
	end: boolean;
	error: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class SpeechRecognitionService {
	private behavior!: BehaviorSubject<Recognition>;
	private window = inject(WINDOW);
	private locale = inject(LOCALE_ID);

	getSubject(): Observable<Recognition> {
		return this.behavior.asObservable();
	}

	private recognition;
	private supported = false;

	constructor() {
		this.behavior = new BehaviorSubject<Recognition>({
			message: '',
			end: false,
			error: false
		});

		// if (typeof window !== 'undefined') {
		// 	if (SpchStrings.SpchRec in window || SpchStrings.webSpchRec in window) {
		// 		this.supported = true;
		// 		const w = window;
		// 		// @ts-expect-error: Propriedade webkitSpeechRecognition não encontrada no tipo Window
		// 		this.recognition = new (w.SpeechRecognition || w.webkitSpeechRecognition)();
		// 		this.recognition.lang = this.localeId;
		// 		this.init();
		// 	}
		// } else {
		// 	this.supported = false;
		// }

		if (this.window) {
			if (SpchStrings.SpchRec in this.window || SpchStrings.webSpchRec in this.window) {
				this.supported = true;
				// @ts-expect-error: Propriedade webkitSpeechRecognition não encontrada no tipo Window
				this.recognition = new (this.window.SpeechRecognition || this.window.webkitSpeechRecognition)();
				this.recognition.lang = this.locale;
				this.init();
			}
		} else {
			this.supported = false;
		}
	}

	public get isSupported(): boolean {
		return this.supported;
	}

	private init() {
		if (this.isSupported) {
			this.recognition.continuous = true;
			this.recognition.maxAlternatives = 1;
			this.recognition.interimResults = false;

			this.recognition.onstart = (e: Event) => {
				console.info(`SpeechRecognition ${e.type}`);
			};

			this.recognition.onend = (e: Event) => {
				console.info(`SpeechRecognition ${e.type}`);
				this.send('recognition end', true);
			};

			this.recognition.onerror = (e: Event) => {
				console.info(`SpeechRecognition ${e.type}`);
				this.send('recognition error', true);
			};

			this.recognition.onresult = (e: RecognitionResults) => {
				const result = e.results[e.results.length - 1][0].transcript;
				this.send(result);
			};

			this.send('');
		} else {
			this.send('Browser not supported', true, true);
		}
	}

	private send(result: string, end = false, error = false) {
		this.behavior.next({
			message: result,
			end,
			error
		});
	}

	start() {
		this.recognition.start();
	}

	stop() {
		this.recognition.stop();
	}
}
