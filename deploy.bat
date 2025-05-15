@echo off
echo === CCIE培训网站部署脚本 ===

:: 设置FTP服务器信息（首次使用请编辑）
set FTP_SERVER=ftp.yournamecheapdomain.com
set FTP_USER=your_ftp_username
set FTP_PASSWORD=your_ftp_password
set REMOTE_DIR=/public_html/

:: 检查环境变量
if "%FTP_SERVER%"=="ftp.yournamecheapdomain.com" (
  echo 错误：请先编辑此脚本，设置正确的FTP服务器信息
  echo 退出部署...
  pause
  exit /b 1
)

:: 记录开始时间
echo 开始时间: %time%

:: 构建静态文件
echo === 清理旧的构建文件 ===
if exist out rmdir /s /q out

echo === 安装依赖 ===
call npm install

echo === 构建网站 ===
call npm run export

if not exist out (
  echo 错误：构建失败，未生成out目录
  echo 退出部署...
  pause
  exit /b 1
)

:: 部署前更新变更日志
echo === 更新更改日志 ===
echo [%date% %time%] 部署网站 >> docs/deployment_log.md

:: 上传到FTP服务器
echo === 部署到Namecheap服务器 ===
cd out

:: 创建FTP命令文件
echo open %FTP_SERVER% > ftpcmd.txt
echo %FTP_USER%>> ftpcmd.txt
echo %FTP_PASSWORD%>> ftpcmd.txt
echo cd %REMOTE_DIR%>> ftpcmd.txt
echo binary>> ftpcmd.txt
echo prompt>> ftpcmd.txt
echo mput *.*>> ftpcmd.txt

:: 创建子目录并上传内容的脚本
echo === 创建并上传子目录 ===
for /d %%D in (*) do (
  echo mkdir %%D>> ftpcmd.txt
  echo cd %%D>> ftpcmd.txt
  echo mput %%D\*.*>> ftpcmd.txt
  
  :: 处理二级子目录
  for /d %%S in (%%D\*) do (
    echo mkdir %%S>> ftpcmd.txt
    echo cd %%S>> ftpcmd.txt
    echo mput %%S\*.*>> ftpcmd.txt
    echo cd ..>> ftpcmd.txt
  )
  
  echo cd ..>> ftpcmd.txt
)

echo disconnect>> ftpcmd.txt
echo bye>> ftpcmd.txt

:: 执行FTP上传
ftp -s:ftpcmd.txt

:: 清理临时文件
del ftpcmd.txt

cd ..

:: 记录结束时间
echo 结束时间: %time%
echo === 部署完成 ===

pause 