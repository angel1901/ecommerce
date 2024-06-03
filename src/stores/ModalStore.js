import { writable } from "svelte/store";

export const isModalOpen = writable(false)
export const urlImageProduct = writable('')
export const responseCreateProduct = writable(false)
export const productToUpdate = writable([])
export const isModalOrderOpen = writable(false)