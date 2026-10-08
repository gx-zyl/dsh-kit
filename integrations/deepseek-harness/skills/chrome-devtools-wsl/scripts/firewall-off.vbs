Set UAC = CreateObject("Shell.Application")
UAC.ShellExecute "cmd.exe", "/c netsh advfirewall firewall add rule name=""WSL Chrome CDP"" dir=in action=allow protocol=TCP localport=9222 && echo Chrome CDP port 9222 allowed && pause", "", "runas", 1
