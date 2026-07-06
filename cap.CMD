@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\@capacitor+cli@8.3.4\node_modules\@capacitor\cli\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\@capacitor+cli@8.3.4\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\@capacitor+cli@8.3.4\node_modules\@capacitor\cli\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\@capacitor+cli@8.3.4\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@capacitor\cli\bin\capacitor" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@capacitor\cli\bin\capacitor" %*
)
