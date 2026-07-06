@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\browserslist@4.28.2\node_modules\browserslist\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\browserslist@4.28.2\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\browserslist@4.28.2\node_modules\browserslist\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\browserslist@4.28.2\node_modules;C:\Users\heyob\Documents\Codex\2026-05-25\i-want-to-make-one-app\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\.pnpm\browserslist@4.28.2\node_modules\browserslist\cli.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\.pnpm\browserslist@4.28.2\node_modules\browserslist\cli.js" %*
)
