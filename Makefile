
path := "https://api.open.fec.gov/v1/filings/?per_page=100&sort=-receipt_date&sort_nulls_last=false&sort_hide_null=false&page=1&sort_null_only=false&min_receipt_date=2021-08-22&api_key=DEMO_KEY"

test:
	URLPATH=$(path) deno --unstable run --allow-net --allow-env --allow-read --allow-write ./postprocess.ts data.json
