export function base64ToUint8Array(base64: string) {
	const binaryString = atob(base64)
	const len = binaryString.length
	const bytes = new Uint8Array(len)
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i)
	}
	return bytes
}

export function uint8ArrayToBase64(uint8Array: any) {
	const length = uint8Array.length
	let binaryString = ''
	const chunkSize = 1024 * 1024; // Process 1MB at a time
	for (let i = 0; i < length; i += chunkSize) {
		const chunkEnd = Math.min(i + chunkSize, length)
		const chunk = uint8Array.subarray(i, chunkEnd)
		binaryString += Array.from(chunk, byte => String.fromCharCode(byte)).join('')
	}
	return btoa(binaryString)
}