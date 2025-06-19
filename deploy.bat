@echo off
echo ===================================
echo CCIE培训网站 - Namecheap部署脚本
echo ===================================
echo.

REM 检查配置文件
if not exist deploy-config.txt (
  echo 配置文件不存在，正在创建...
  echo ftp_server=您的FTP服务器地址 > deploy-config.txt
  echo ftp_username=您的FTP用户名 >> deploy-config.txt
  echo ftp_password=您的FTP密码 >> deploy-config.txt
  echo ftp_directory=/public_html/ >> deploy-config.txt
  echo.
  echo 请编辑 deploy-config.txt 文件，填入您的FTP信息，然后重新运行此脚本。
  echo.
  pause
  exit /b
)

REM 读取配置信息
for /f "tokens=1,* delims==" %%a in (deploy-config.txt) do (
  if "%%a"=="ftp_server" set FTP_SERVER=%%b
  if "%%a"=="ftp_username" set FTP_USERNAME=%%b
  if "%%a"=="ftp_password" set FTP_PASSWORD=%%b
  if "%%a"=="ftp_directory" set FTP_DIRECTORY=%%b
)

echo 正在使用以下配置:
echo 服务器: %FTP_SERVER%
echo 用户名: %FTP_USERNAME%
echo 目录: %FTP_DIRECTORY%
echo.

REM 询问是否继续
set /p CONTINUE=是否继续部署? (Y/N): 
if /i "%CONTINUE%" neq "Y" (
  echo 部署已取消。
  pause
  exit /b
)

echo.
echo 步骤 1: 安装依赖
call npm install
if %errorlevel% neq 0 (
  echo 安装依赖失败！
  pause
  exit /b
)

echo.
echo 步骤 2: 构建项目
call npm run build
if %errorlevel% neq 0 (
  echo 构建项目失败！
  pause
  exit /b
)

echo.
echo 步骤 3: 导出静态文件
call npm run export
if %errorlevel% neq 0 (
  echo 导出静态文件失败！
  pause
  exit /b
)

echo.
echo 步骤 4: 创建.htaccess文件
echo Options -MultiViews > .\out\.htaccess
echo RewriteEngine On >> .\out\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-f >> .\out\.htaccess
echo RewriteCond %%{REQUEST_FILENAME} !-d >> .\out\.htaccess
echo RewriteRule ^ index.html [QSA,L] >> .\out\.htaccess

echo.
echo 步骤 5: 通过FTP上传文件
echo 将文件上传到 %FTP_SERVER%%FTP_DIRECTORY%

REM 使用WinSCP脚本进行上传
echo option batch abort > winscp_script.txt
echo option confirm off >> winscp_script.txt
echo open ftp://%FTP_USERNAME%:%FTP_PASSWORD%@%FTP_SERVER% >> winscp_script.txt
echo lcd .\out >> winscp_script.txt
echo cd %FTP_DIRECTORY% >> winscp_script.txt
echo synchronize remote >> winscp_script.txt
echo exit >> winscp_script.txt

REM 检查是否安装了WinSCP
where winscp.com >nul 2>nul
if %errorlevel% neq 0 (
  echo 无法找到WinSCP。请确保WinSCP已安装并添加到PATH环境变量中。
  echo 或者可以手动使用FTP客户端上传out目录中的文件。
  echo.
  echo out目录已准备好，可以使用您喜欢的FTP客户端手动上传。
) else (
  winscp.com /script=winscp_script.txt
  echo.
  if %errorlevel% equ 0 (
    echo 部署成功完成！
  ) else (
    echo 上传过程中出现错误，请检查FTP凭据和连接。
  )
  del winscp_script.txt
)

echo.
echo 记录部署日志...
echo ## 部署记录 >> docs\deployment_log.md
echo - 日期: %date% %time% >> docs\deployment_log.md
echo - 类型: 手动部署 >> docs\deployment_log.md
echo. >> docs\deployment_log.md

echo.
echo 部署过程完成。
pause 