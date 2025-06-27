import { InjectionToken } from "@angular/core";
import { IProfileData } from "@types";

const profile: IProfileData = {
	name: "Joel Estumano",

	phone: "+55 91 99293-5806",
	email: "joelestumano@gmail.com",
	whatsapp: "559192935806",

	websiteUrl: "joelestumano.com",

	linkedinUrl: "https://www.linkedin.com/in/joel-estumano",
	githubUrl: "https://github.com/joel-estumano",
	instagramUrl: "https://www.instagram.com/joel.estumano",

	profession: "Desenvolvedor Web",
	professionStack: "full stack",
	professionLevel: "Pleno",
	professionEmphasis: "Desenvolvimento Web",
	professionalStart: 2021,

	address: "Rua Manoel da Silva Raposo, 2405 - São Lourenço",
	city: "Abaetetuba/PA - 68440-000, Brasil",

	experiences: [
		{
			company: "Profissional autônomo · Freelance",
			office: "Desenvolvedor Web Full-Stack",
			period: "abr de 2021 · atual",
			local: "Remota"
		},
		{
			company: "inLoco Solutions · PJ",
			office: "Desenvolvedor Web Front-End",
			period: "mai de 2024 - mar de 2025",
			local: "Remota"
		},
		{
			company: "SambliTech · PJ",
			office: "Desenvolvedor Web Full-Stack",
			period: "abr de 2021 - fev de 2024",
			local: "Presencial"
		}
	],

	stacks: {
		basic: [
			{
				name: "HTML5",
				docs: "#",
				iconName: "logoHtml5"
			},
			{
				name: "CSS3",
				docs: "#",
				iconName: "logoCss3"
			},
			{
				name: "JavaScript",
				docs: "#",
				iconName: "logoJavascript"
			},
			{
				name: "TypeScript ",
				docs: "https://www.typescriptlang.org/pt/",
				iconName: "logoTypescript"
			},
			{
				name: "Node.js",
				docs: "https://nodejs.org/pt",
				iconName: "logoNodeJs"
			}
		],
		frontEnd: [
			{
				name: "Angular",
				docs: "https://angular.dev/",
				iconName: "logoAngular"
			},
			{
				name: "Vue.js",
				docs: "https://vuejs.org/",
				iconName: "logoVueJs"
			},
			{
				name: "React",
				docs: "https://react.dev/",
				iconName: "logoReact"
			},
			{
				name: "Next",
				docs: "https://nextjs.org/",
				iconName: "logoNextJs"
			},
			{
				name: "Bootstrap",
				docs: "https://getbootstrap.com/",
				iconName: "logoBootstrap"
			},
			{
				name: "Tailwind CSS",
				docs: "https://tailwindcss.com/",
				iconName: "logoTailwind"
			},
			{
				name: "Jest",
				docs: "https://jestjs.io/",
				iconName: "logoJest"
			},
			{
				name: "Flutter",
				docs: "https://flutter.dev/",
				iconName: "logoFlutter"
			},
			{
				name: "Ionic",
				docs: "https://ionicframework.com/",
				iconName: "logoIonic"
			},
			{
				name: "Expo",
				docs: "https://expo.dev/",
				iconName: "logoExpo"
			}
		],
		backEnd: [
			{
				name: "NestJS",
				docs: "https://nestjs.com/",
				iconName: "logoNestJs"
			},
			{
				name: "AdonisJS",
				docs: "https://adonisjs.com/",
				iconName: "logoAdoniJs"
			},
			{
				name: "Laravel",
				docs: "https://laravel.com/",
				iconName: "logoLaravel"
			},
			{
				name: "Spring Boot",
				docs: "https://spring.io/",
				iconName: "logoSpringBoot"
			},
			{
				name: "Swagger",
				docs: "https://swagger.io/",
				iconName: "logoSwagger"
			}
		],
		others: [
			{
				name: "MongoDB",
				docs: "https://www.mongodb.com/",
				iconName: "logoMongoDb"
			},
			{
				name: "Firebase",
				docs: "https://firebase.google.com/?hl=pt-br",
				iconName: "logoFirebase"
			},
			{
				name: "MySQL",
				docs: "https://www.mysql.com/",
				iconName: "logoMySql"
			},
			{
				name: "Postgres",
				docs: "https://www.postgresql.org/",
				iconName: "logoPostgreSql"
			},
			{
				name: "VS Code",
				docs: "https://code.visualstudio.com/",
				iconName: "logoVsCode"
			},
			{
				name: "IntelliJ IDEA",
				docs: "https://www.jetbrains.com/idea/",
				iconName: "logoIntellijIdea"
			},
			{
				name: "Postman",
				docs: "https://www.postman.com/",
				iconName: "logoPostman"
			},
			{
				name: "Github",
				docs: "https://github.com/",
				iconName: "logoGitHub"
			},
			{
				name: "Redis",
				docs: "https://redis.io/",
				iconName: "logoRedis"
			},
			{
				name: "Docker",
				docs: "https://www.docker.com/",
				iconName: "logoDocker"
			}
		]
	},

	projects: [
		{
			id: "super-site-movida",
			company: "Movida",
			companyUrl: "https://www.movida.com.br",
			name: "Super Site Movida",
			resources: ["TypeScript", "Angular", "Tailwind CSS"],
			bannerUrl: "movida.png",
			demoUrl: "https://www.movida.com.br"
		},
		{
			id: "landing-page-esf",
			company: "Exploradores Sem Fronteiras",
			companyUrl: "https://exploradoressemfronteiras.com.br/",
			name: "Landing Page ESF",
			resources: ["TypeScript", "React", "Bootstrap", "NestJS", "Firebase"],
			bannerUrl: "esf.png",
			demoUrl: "" //'https://verdant-duckanoo-f1c0fe.netlify.app/home'
		},
		{
			id: "brax",
			company: "Grupo Brax",
			companyUrl: "http://grupobrax.com.br/",
			name: "Brax Admin, Brax Consultor, Brax Cliente",
			resources: ["TypeScript", "Ionic", "Angular", "Tailwind CSS", "Firebase"],
			bannerUrl: "brax.png",
			demoUrl: "https://grupo-brax-client.web.app"
		},
		{
			id: "ats-globe",
			company: "Cia de Talentos",
			companyUrl: "https://www.ciadetalentos.com.br/pt/",
			name: "ATS Globe",
			resources: ["TypeScript", "Angular", "SCSS ", "Bulma CSS", "Java", "Spring Boot", "JavaScript", "AngularJS", "CSS"],
			bannerUrl: "ct.png",
			demoUrl: "https://candidate.atsglobe.com/"
		},
		{
			id: "appLogo-nina-saude",
			company: "Nina Saúde",
			companyUrl: "https://ninasaude.com.br/",
			name: "AppLogo Nina Saúde",
			resources: ["TypeScript", "Angular", "Bootstrap", "AdonisJS", "Swagger UI", "MySQL"],
			bannerUrl: "nina.png",
			demoUrl: "https://play.google.com/store/apps/details?id=com.ninasaudeapp"
		},
		{
			id: "crm-saber",
			company: "Saber Educação",
			companyUrl: "https://www.saber.com.br/",
			name: "CRM Saber",
			resources: ["TypeScript", "Angular", "Bootstrap"],
			bannerUrl: "saber.png",
			demoUrl: "https://crm-ui.pnld.saber.com.br"
		},
		{
			id: "jogueiros-app",
			company: "Jogueiros Tecnologia",
			companyUrl: "https://jogueiros.com/",
			name: "Jogueiros",
			resources: ["JavaScript", "Ionic", "AngularJS", "Bootstrap"],
			bannerUrl: "jogueiros.png",
			demoUrl: "https://play.google.com/store/apps/details?id=com.jogueirosfc.app"
		},
		{
			id: "projeto-pisteiro",
			company: "4Cadia",
			companyUrl: "https://4cadia.com/",
			name: "Pisteiro",
			resources: ["TypeScript", "Angular", "Bootstrap"],
			bannerUrl: "pisteiro.png",
			demoUrl: "" // 'http://pisteiro.com/'
		}
		/* {
			bannerUrl: 'projeto-wize.webp',
			description:
				'Os sistemas Wizewaste, Wizebox e Wizetracking formam um conjunto de softwares desenvolvidos pela empresa Wizecompany. Eles foram criados para oferecer soluções abrangentes no gerenciamento de resíduos sólidos, monitoramento de recipientes e controle de frota, respectivamente. Esses softwares visam aprimorar a eficiência operacional e o gerenciamento de recursos para empresas de reciclagem e gestão de resíduos.',
			name: 'Wizewaste, Wizebox e Wizetracking',
			demoUrl: '',
			id: 1
		} */
	]
};

export const PROFILE = new InjectionToken<IProfileData>("profile.token", {
	factory: () => profile
});
