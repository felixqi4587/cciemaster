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
        print("Error: index.html file not found")
        print("   Please make sure to run this script from the project root directory")
        sys.exit(1)
    
    try:
        # 创建服务器
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://{HOST}:{PORT}"
            print("CCIE Training Website Local Server")
            print("=" * 40)
            print(f"Service directory: {os.getcwd()}")
            print(f"Access URL: {server_url}")
            print(f"Port: {PORT}")
            print("=" * 40)
            print("Tips:")
            print("   - Press Ctrl+C to stop server")
            print("   - Refresh browser after file changes")
            print("   - All routes will work correctly")
            print("=" * 40)
            
            # 自动打开浏览器
            try:
                webbrowser.open(server_url)
                print("Browser opened automatically")
            except:
                print("Could not open browser automatically, please visit the URL manually")
            
            print(f"\nServer started, listening on {HOST}:{PORT}")
            print("   (Press Ctrl+C to stop)")
            
            # 启动服务器
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\nServer stopped")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"Port {PORT} is already in use")
            print("   Please close other programs using this port, or modify the PORT variable")
        else:
            print(f"Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_server() 