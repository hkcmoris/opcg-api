Add-Content -Path "combined.txt" -Value "package.json:`n``````json" 
$content = Get-Content -Path "package.json"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value ".env:`n``````" 
$content = Get-Content -Path ".env"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "Procfile:`n``````" 
$content = Get-Content -Path "Procfile"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "app.json:`n``````json" 
$content = Get-Content -Path "app.json"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "app.js:`n``````javascript" 
$content = Get-Content -Path "app.js"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "errorHandler.js:`n``````javascript" 
$content = Get-Content -Path "errorHandler.js"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "routes\sets.js:`n``````javascript" 
$content = Get-Content -Path "routes\sets.js"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "routes\cards.js:`n``````javascript" 
$content = Get-Content -Path "routes\cards.js"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "```````n"

Add-Content -Path "combined.txt" -Value "utils\find.js:`n``````javascript" 
$content = Get-Content -Path "utils\find.js"
Add-Content -Path "combined.txt" -Value $content
Add-Content -Path "combined.txt" -Value "``````"