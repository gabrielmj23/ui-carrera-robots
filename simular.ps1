param(
    [string]$SerialPort = "COM3"
)

$port = New-Object System.IO.Ports.SerialPort $SerialPort,9600,None,8,one
$port.Open()

$startTime = [DateTime]::Now
$lastLapQuarter = 0

while ($true) {
    $now = [DateTime]::Now
    $elapsed = $now - $startTime
    $elapsedMs = [int]$elapsed.TotalMilliseconds

    if ($elapsedMs -ge 60000) { break }

    $minutes = [int]($elapsedMs / 60000)
    $seconds = [int](($elapsedMs / 1000) % 60)
    $milliseconds = [int]($elapsedMs % 1000)

    $timeStr = "{0:D2}:{1:D2}:{2:D3}" -f $minutes, $seconds, $milliseconds

    $lapQuarter = [int]($elapsedMs / 15000)
    if ($lapQuarter -gt $lastLapQuarter) {
        $port.Write("vuelta ")
        $lastLapQuarter = $lapQuarter
    }

    $port.Write("$timeStr`n")

    Start-Sleep -Milliseconds 20
}

$port.Close()