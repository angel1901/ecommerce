import { writable } from "svelte/store";

export const isModalOpen = writable(false)
export const urlImageProduct = writable('')
export const responseCreateProduct = writable(false)
export const productToUpdate = writable([])
export const isModalOrderOpen = writable(false)
export const orderChecked = writable([])
export const isOrderModalOpen = writable(false)
export const orderSelected = writable([])
export const orderName = writable('')
export const errorFetch = writable('')
export const authenticated = writable(false)