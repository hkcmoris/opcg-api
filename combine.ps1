# Define an array of objects holding file information
$files = @(
	@{Path="package.json"; Language="json"},
	@{Path=".env"; Language="plaintext"},
	@{Path="Procfile"; Language="plaintext"},
	@{Path="app.json"; Language="json"},
	@{Path="app.js"; Language="javascript"},
	@{Path="logger.js"; Language="javascript"},
	@{Path="errorHandler.js"; Language="javascript"},
	@{Path=(Join-Path "routes" "index.js"); Language="javascript"},
	@{Path=(Join-Path "routes" "sets.js"); Language="javascript"},
	@{Path=(Join-Path "routes" "cards.js"); Language="javascript"},
	@{Path=(Join-Path "utils" "find.js"); Language="javascript"}
)

# Clear the content of combined.txt before appending new data
Set-Content -Path "combined.txt" -Value ""

# Loop through each file and append its content to combined.txt
foreach ($file in $files) {
	$header = "$($file.Path):`n``````$($file.Language)"
    # Use Get-Content with -Raw to preserve original line breaks
	$content = Get-Content -Path $file.Path -Raw
	$footer = "```````n"
	$combinedContent = $header + "`n" + $content + "`n" + $footer

	Add-Content -Path "combined.txt" -Value $combinedContent
}

# Load collection.v2.json
$collectionData = Get-Content -Path "collection.v2.json" | ConvertFrom-Json

# Select a random set
$sets = $collectionData.sets.PSObject.Properties.Value
$randomSet = Get-Random -InputObject $sets

# Select two random cards from the set
$cardsInSet = $collectionData.cards.PSObject.Properties.Value | Where-Object { $randomSet.cards -contains $_.id }
$randomCards = Get-Random -InputObject $cardsInSet -Count 2

# Combine selected set and cards into a single object
$combinedObject = @{
    sets = $randomSet
    cards = $randomCards
}

# Convert the combined object to JSON, ensuring it's pretty-printed
$jsonContent = $combinedObject | ConvertTo-Json -Depth 5 -Compress:$true

# Prepare content for combined.txt
$combinedInfo = "collection.v2.json:`n``````json`n" + $jsonContent + "`n``````"

# Append the combined set and card information to combined.txt
Add-Content -Path "combined.txt" -Value $combinedInfo

# Existing script to combine other files continues here...