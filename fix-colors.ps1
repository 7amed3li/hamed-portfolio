$files = Get-ChildItem "c:\Users\Hp\OneDrive\Desktop\Portfolio\src\components\sections\*.tsx"
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $c = $c -replace '#d4ff57', '#5eead4'
    $c = $c -replace '#0a0a0a', '#0f172a'
    $c = $c -replace 'rgba\(10,10,10,', 'rgba(15,23,42,'
    $c = $c -replace '#f0f0ec', '#e2e8f0'
    $c = $c -replace '#888882', '#94a3b8'
    $c = $c -replace '"#111111"', '"#1e293b"'
    $c = $c -replace '"#111"', '"#1e293b"'
    $c = $c -replace '"#222"', '"#1e293b"'
    $c = $c -replace '"#222222"', '"#1e293b"'
    $c = $c -replace '"#1a1a1a"', '"#1e293b"'
    $c = $c -replace '"#2a2a2a"', '"#334155"'
    $c = $c -replace '"#333"', '"#334155"'
    $c = $c -replace '"#444"', '"#475569"'
    $c = $c -replace '"#555"', '"#64748b"'
    $c = $c -replace '"#666"', '"#64748b"'
    $c = $c -replace '"#888"', '"#94a3b8"'
    $c = $c -replace '"#1e1e1e"', '"#1e293b"'
    Set-Content $f.FullName $c -NoNewline
    Write-Host "Updated: $($f.Name)"
}
Write-Host "Done!"
