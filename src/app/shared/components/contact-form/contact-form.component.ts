import { ButtonComponent } from '@shared/ui/button/button.component';
import { Component, computed, inject, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '@core/services/http/http.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { InfoDialogComponent, InfoDialogData } from '../info-dialog/info-dialog.component';
import { LocalStorageService } from 'ngx-webstorage';
import { NgClass } from '@angular/common';
import { RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha-2';
import { SpeechRecognitionService } from '@core/services/speech-recognition/speech-recognition.service';
import { RootDialogService } from '@shared/modules/root-dialog/service/root-dialog.service';

enum States {
	start = 'start',
	stop = 'stop'
}

@Component({
	selector: 'app-contact-form',
	imports: [NgClass, FormsModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule, IconComponent, NgxEditorModule, ButtonComponent],
	templateUrl: './contact-form.component.html',
	styleUrl: './contact-form.component.css',
	providers: [HttpService, ReCaptchaV3Service],
	encapsulation: ViewEncapsulation.None
})
export class ContactFormComponent implements OnInit, OnDestroy {
	protected siteKey = environment.recaptchaSiteKey;
	protected FormUtils = FormUtils;
	protected contactForm: FormGroup;

	public isLoading = signal<boolean>(false);
	public disabled = computed<boolean>(() => this.isLoading());

	protected listening = signal<boolean>(false);

	protected isSubmited = false;
	protected speechRecognitionErro = false;
	protected isSupported = false;

	editor!: Editor;

	toolbar: Toolbar = [
		['undo', 'redo'],
		['bold', 'italic'],
		['align_left', 'align_center', 'align_right', 'align_justify'],
		['text_color', 'background_color'],
		['code', 'blockquote']
	];

	colorPresets = [
		'#FFFFFF', // Branco
		'#000000', // Preto
		'#EF4444', // Vermelho 500
		'#F59E0B', // Amarelo 500
		'#10B981', // Verde 500
		'#3B82F6', // Azul 500
		'#8B5CF6', // Roxo 500
		'#EC4899', // Rosa 500
		'#6B7280', // Cinza 500
		'#64748B', // Cinza azul 500
		'#14B8A6', // Turquesa 500
		'#F97316', // Laranja 500
		'#06B6D4', // Ciano 500
		'#EAB308', // Âmbar 500
		'#D946EF', // Fúcsia 500
		'#7C3AED' // Violeta 500
	];

	constructor(
		private fb: FormBuilder,
		private httpService: HttpService,
		private speechRecognitionService: SpeechRecognitionService,
		private localSt: LocalStorageService
	) {
		// apenas para despertar o servidor
		this.httpService.get<{ message: string }>('').subscribe({
			next: (res: { message: string }) => {
				console.log(res.message);
			},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			}
		});

		this.contactForm = this.fb.group({
			name: new FormControl({ value: '', disabled: this.disabled() }, [Validators.required, FormUtils.notEmpty]),
			email: new FormControl({ value: '', disabled: this.disabled() }, [Validators.required, Validators.email]),
			whatsapp: new FormControl({ value: '', disabled: this.disabled() }, []),
			message: new FormControl({ value: '', disabled: this.disabled() }, [Validators.required, FormUtils.notEmpty])
		});

		this.contactForm.patchValue(this.localSt.retrieve('contact-form-values'));

		this.contactForm.valueChanges.subscribe((changes) => {
			this.localSt.store('contact-form-values', changes);
		});

		this.isSupported = speechRecognitionService.isSupported;

		this.speechRecognitionService.getSubject().subscribe({
			next: (recognition) => {
				if (recognition.message && !recognition.end) {
					this.contactForm.patchValue({
						message: this.FormUtils.getControl(this.contactForm, 'message').valid
							? `${this.contactForm.value.message} ${recognition.message}`
							: recognition.message
					});
					this.editorScrollDown();
				}
				if (recognition.end) {
					this.listening.set(false);
				}
			},
			error: () => {
				this.speechRecognitionErro = true;
			}
		});
	}

	ngOnInit(): void {
		this.editor = new Editor();
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}

	onSubmit(recaptcha: string) {
		this.isSubmited = true;
		if (this.FormUtils.valid(this.contactForm) && !this.isLoading()) {
			this.isLoading.set(true);
			this.setState(States.stop);
			const payload = {
				...this.contactForm.value,
				recaptcha: recaptcha
			};
			this.httpService.post('contacts', payload).subscribe({
				next: () => {
					this.contactForm.reset();
					this.launchDialog();
				},
				error: (error: HttpErrorResponse) => {
					this.isLoading.set(false);
					this.isSubmited = false;
					console.error(error);
				},
				complete: () => {
					this.isLoading.set(false);
					this.isSubmited = false;
				}
			});
		} else {
			console.error('Invalid form');
		}
	}

	start() {
		this.setState(States.start);
	}

	private setState(state: States): void {
		switch (state) {
			case States.start:
				if (!this.listening()) {
					this.speechRecognitionService.start();
					this.listening.set(true);
				} else {
					this.speechRecognitionService.stop();
					this.listening.set(false);
				}
				break;

			case States.stop:
				if (this.listening()) {
					this.speechRecognitionService.stop();
					this.listening.set(false);
				}
				break;
		}
	}

	private editorScrollDown(): void {
		this.editor.view.dom.scrollTop = this.editor.view.dom.scrollHeight;
	}

	private rootDialogService = inject(RootDialogService<InfoDialogComponent, InfoDialogData>);

	launchDialog() {
		this.rootDialogService.launch({
			component: InfoDialogComponent,
			inputs: {
				data: {
					title: 'Mensagem enviada com sucesso!',
					subTitle: 'Obrigado!',
					content: 'Fico feliz por receber sua mensagem.'
				}
			}
		});
	}
}
