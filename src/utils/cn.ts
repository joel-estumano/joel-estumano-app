// utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Função utilitária para mesclar classes CSS com eficiência
 * e evitar conflitos de estilos no Tailwind CSS.
 *
 * @param args - Lista de classes CSS a serem combinadas.
 * @returns {string} - String contendo as classes mescladas e otimizadas.
 */
export function cn(...args: unknown[]): string {
	return twMerge(clsx(args));
}
