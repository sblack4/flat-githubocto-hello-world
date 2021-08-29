
import { readJSON, readJSONFromURL, writeJSON } from 'https://deno.land/x/flat/mod.ts'
import { concat } from "https://deno.land/std/bytes/mod.ts";

// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename
const data = await readJSON(filename)

// Pluck a specific key off
// and write it out to a different file
// Careful! any uncaught errors and the workflow will fail, committing nothing.
// const newfile = `results-${filename}`
// await writeJSON(newfile, data.results)
let resultsLists: any[] = data.results

const apiUrl = Deno.env.get("URLPATH")

const pages = data.pagination.pages
console.log(`${pages} pages`)

for(let i=1; i<=pages+1; i++){
	const url = apiUrl + "&page=" + i
	console.log(url)
	const nextpage = await readJSONFromURL(url)
	resultsLists.push(...nextpage.results)
}

const newfile = `results-${filename}`
await writeJSON(newfile, resultsLists)
