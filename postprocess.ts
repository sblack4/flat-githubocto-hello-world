
import { readJSON, readJSONFromURL, writeJSON } from 'https://deno.land/x/flat/mod.ts'
import { format } from "https://deno.land/std@0.106.0/datetime/mod.ts";

const today = format(new Date(), "yyyy-MM-dd");
// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename
const data = await readJSON(filename)

// Pluck a specific key off
// and write it out to a different file
// Careful! any uncaught errors and the workflow will fail, committing nothing.
// const newfile = `results-${filename}`
// await writeJSON(newfile, data.results)
const resultsLists = data.results

const apiUrl = `https://api.open.fec.gov/v1/filings/?per_page=100&sort=-receipt_date&sort_nulls_last=false&sort_hide_null=false&sort_null_only=false&min_receipt_date=${today}&api_key=DEMO_KEY`

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
