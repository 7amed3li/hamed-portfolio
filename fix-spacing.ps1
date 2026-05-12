$files = Get-ChildItem "c:\Users\Hp\OneDrive\Desktop\Portfolio\src\components\sections\*.tsx"
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw

    # Section padding: py-32 -> py-40, add more breathing room
    $c = $c -replace 'className="py-32 px-6 md:px-16"', 'className="py-40 px-8 md:px-20 lg:px-28"'
    
    # Hero bottom padding
    $c = $c -replace 'pb-16 pt-28', 'pb-24 pt-32'
    
    # Increase mb-20 section headers to mb-24
    $c = $c -replace 'className="mb-20"', 'className="mb-28"'
    $c = $c -replace 'mb-20 gap-6', 'mb-28 gap-8'
    
    # Increase mb-10 to mb-14
    $c = $c -replace 'mb-10', 'mb-14'
    
    # Increase mb-8 to mb-10
    $c = $c -replace 'mb-8"', 'mb-12"'
    
    # Increase mb-12 to mb-16
    $c = $c -replace 'mb-12"', 'mb-16"'
    
    # Increase mb-6 to mb-8
    $c = $c -replace 'mb-6"', 'mb-8"'
    
    # Project rows: py-8 -> py-12
    $c = $c -replace 'py-8 grid', 'py-12 grid'
    
    # Experience items: space-y-16 -> space-y-20
    $c = $c -replace 'space-y-16', 'space-y-24'

    # Gap between items
    $c = $c -replace 'gap-6 items-start', 'gap-8 items-start'

    # Stats grid gap
    $c = $c -replace 'gap-8 pt-8', 'gap-10 pt-10'

    # Section header label mb
    $c = $c -replace 'mb-4"', 'mb-6"'

    # Nav height
    $c = $c -replace 'h-16 flex', 'h-20 flex'

    # Contact form spacing
    $c = $c -replace 'space-y-5', 'space-y-6'
    $c = $c -replace 'gap-16', 'gap-20'

    # Footer spacing
    $c = $c -replace 'mt-20 pt-8', 'mt-28 pt-12'

    # Info rows
    $c = $c -replace 'py-4" style', 'py-5" style'

    Set-Content $f.FullName $c -NoNewline
    Write-Host "Fixed spacing: $($f.Name)"
}
Write-Host "Done!"
