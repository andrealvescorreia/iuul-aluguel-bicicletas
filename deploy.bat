@echo off

xcopy /E /Y ".\*" "C:\Program Files\nginx-1.24.0\html\turma-5\desafio-4\grupo-x\servico" && cd "C:\Program Files\nginx-1.24.0\html\turma-5\desafio-4\grupo-x\servico" && npm ci && npm run start:prod && cd "C:\Program Files\nginx-1.24.0" && nginx -s reload

exit /b 0