#!/usr/bin/env python3
"""
CCIE培训网站 - 本地预览服务器
使用Python内置的HTTP服务器来预览静态网站
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# 服务器配置
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义请求处理器，支持单页应用路由"""
    
    def end_headers(self):
        # 添加CORS头，避免本地开发问题
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # 处理路由，如果文件不存在则返回index.html（单页应用）
        path = self.path.lstrip('/')
        if path == '':
            path = 'index.html'
        
        # 检查文件是否存在
        if not os.path.exists(path) and not path.endswith('.html'):
            # 尝试查找对应的HTML文件
            html_path = f"{path}/index.html"
            if os.path.exists(html_path):
                path = html_path
            else:
                # 如果都不存在，返回index.html
                path = 'index.html'
        
        self.path = f"/{path}"
        return super().do_GET()

def start_server():
    """启动本地服务器"""
    # 确保在项目根目录
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # 检查index.html是否存在
    if not os.path.exists('index.html'):
        print("❌ 错误：未找到index.html文件")
        print("   请确保在项目根目录运行此脚本")
        sys.exit(1)
    
    try:
        # 创建服务器
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://{HOST}:{PORT}"
            print("🚀 CCIE培训网站本地服务器")
            print("=" * 40)
            print(f"📂 服务目录: {os.getcwd()}")
            print(f"🌐 访问地址: {server_url}")
            print(f"📱 端口: {PORT}")
            print("=" * 40)
            print("💡 提示:")
            print("   - 按 Ctrl+C 停止服务器")
            print("   - 修改文件后刷新浏览器即可看到更改")
            print("   - 所有路由都会正确工作")
            print("=" * 40)
            
            # 自动打开浏览器
            try:
                webbrowser.open(server_url)
                print("🌐 已自动打开浏览器")
            except:
                print("⚠️  无法自动打开浏览器，请手动访问上述地址")
            
            print(f"\n✅ 服务器已启动，正在监听 {HOST}:{PORT}")
            print("   (按 Ctrl+C 停止)")
            
            # 启动服务器
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用")
            print("   请关闭其他使用该端口的程序，或者修改PORT变量")
        else:
            print(f"❌ 启动服务器时出错: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 意外错误: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_server() 