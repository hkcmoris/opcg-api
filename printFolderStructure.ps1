$excludeDirs = @("node_modules", "coverage", "logs")
$excludeFiles = @("combined.txt", "combine.ps1", "printFolderStructure.ps1")
$rootPath = Get-Location

function Get-DirectoryTree {
    param (
        [string]$path,
        [int]$depth
    )

    $depth++

    Get-ChildItem -Path $path -Directory | Where-Object { $excludeDirs -notcontains $_.Name } | ForEach-Object {
        $relativePath = $_.FullName.Substring((Get-Location).Path.Length).TrimStart('\')
        Write-Host $relativePath
        Get-DirectoryTree -path $_.FullName -depth $depth
    }
    Get-ChildItem -Path $path -File | Where-Object { $excludeFiles -notcontains $_.Name } | ForEach-Object {
        $relativePath = $_.FullName.Substring((Get-Location).Path.Length).TrimStart('\')
        Write-Host $relativePath
    }
}

Get-DirectoryTree -path $rootPath -depth 0