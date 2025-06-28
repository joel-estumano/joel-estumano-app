// .prettierrc.js

module.exports = {
	// Coloca o fechamento de tags JSX na linha seguinte
	bracketSameLine: false,

	// Adiciona espaço entre chaves em objetos
	bracketSpacing: true,

	// Comprimento máximo de linha antes de quebrar
	printWidth: 160,

	// Sempre adiciona ponto e vírgula no final das instruções
	semi: true,

	// Define o tamanho visual de um tab como 4 espaços
	tabWidth: 4,

	// Não adiciona vírgula no final de objetos, arrays, etc.
	trailingComma: "none",

	// Usa tabs (↹) em vez de espaços
	useTabs: true,

	// Usa LF como caractere de quebra de linha
	endOfLine: "lf",

	// Plugin para ordenar classes do Tailwind CSS
	plugins: ["prettier-plugin-tailwindcss"]
};
