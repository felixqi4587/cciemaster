import { useState, useEffect, useRef } from 'react';
import styles from '../styles/NetworkSimulator.module.css';
import Link from 'next/link';

export default function NetworkSimulator() {
  const [activeTab, setActiveTab] = useState('topology');
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [isCreatingDevice, setIsCreatingDevice] = useState(false);
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [newDeviceType, setNewDeviceType] = useState('router');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const canvasRef = useRef(null);
  const terminalRef = useRef(null);
  
  // 初始化一些示例设备和连接
  useEffect(() => {
    // 示例设备
    const initialDevices = [
      { id: 1, type: 'router', name: 'R1', x: 150, y: 150, commands: {}, interfaces: ['GigabitEthernet0/0', 'GigabitEthernet0/1'] },
      { id: 2, type: 'router', name: 'R2', x: 400, y: 150, commands: {}, interfaces: ['GigabitEthernet0/0', 'GigabitEthernet0/1'] },
      { id: 3, type: 'switch', name: 'SW1', x: 275, y: 300, commands: {}, interfaces: ['GigabitEthernet1/0/1', 'GigabitEthernet1/0/2'] }
    ];
    
    // 示例连接
    const initialConnections = [
      { id: 1, source: 1, target: 3, sourceInterface: 'GigabitEthernet0/0', targetInterface: 'GigabitEthernet1/0/1' },
      { id: 2, source: 2, target: 3, sourceInterface: 'GigabitEthernet0/0', targetInterface: 'GigabitEthernet1/0/2' }
    ];
    
    setDevices(initialDevices);
    setConnections(initialConnections);
  }, []);
  
  // 绘制拓扑图
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制连接线
    connections.forEach(connection => {
      const source = devices.find(d => d.id === connection.source);
      const target = devices.find(d => d.id === connection.target);
      
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制连接标签
        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;
        ctx.fillStyle = '#002244';
        ctx.font = '10px Arial';
        ctx.fillText(`${source.name}:${connection.sourceInterface.slice(-3)}`, midX - 40, midY - 5);
        ctx.fillText(`${target.name}:${connection.targetInterface.slice(-3)}`, midX - 40, midY + 15);
      }
    });
    
    // 如果正在创建连接，绘制临时线
    if (isCreatingConnection && connectionStart) {
      const startDevice = devices.find(d => d.id === connectionStart);
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / (rect.width / canvas.width);
      const mouseY = (event.clientY - rect.top) / (rect.height / canvas.height);
      
      ctx.beginPath();
      ctx.moveTo(startDevice.x, startDevice.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [devices, connections, isCreatingConnection, connectionStart]);
  
  // 处理命令输入
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim() || !selectedDevice) return;
    
    // 向终端输出添加命令
    const newOutput = `${terminalOutput}${selectedDevice.name}# ${commandInput}\n`;
    
    // 简单的命令模拟
    let response = '';
    const command = commandInput.toLowerCase().trim();
    
    // 基础的命令响应模拟
    if (command === 'show version') {
      response = `Cisco IOS Software, Version 15.2(4)M3\nProcessor board ID FTX12345678\n`;
    } else if (command === 'show ip interface brief') {
      response = `Interface              IP-Address      Status         Protocol\n`;
      selectedDevice.interfaces.forEach(intf => {
        response += `${intf}        unassigned      up             up\n`;
      });
    } else if (command === 'show running-config') {
      response = `Building configuration...\n\nCurrent configuration:\n!\nversion 15.2\nno service timestamps debug uptime\nno service timestamps log uptime\n!\nhostname ${selectedDevice.name}\n!\n`;
      // 在此处添加更多配置命令...
      if (command.length > 15) {
        response += `\n------ 您当前使用的是简化版模拟器 ------\n需要完整功能请升级到专业版\n`;
      }
    } else if (command.startsWith('conf t')) {
      // 如果命令超过5条，提示升级专业版
      const commandCount = Object.keys(selectedDevice.commands || {}).length;
      if (commandCount > 5) {
        response = `\n------ 命令次数已达上限 ------\n需要更多功能请升级到专业版\n`;
      } else {
        response = `Enter configuration commands, one per line. End with Ctrl+Z.\n`;
        setShowLeadForm(true);
      }
    } else {
      response = `% Unrecognized command\n\n------ 您当前使用的是简化版模拟器 ------\n需要完整功能请升级到专业版\n`;
    }
    
    setTerminalOutput(newOutput + response);
    setCommandInput('');
    
    // 自动滚动到终端底部
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };
  
  // 处理设备点击
  const handleDeviceClick = (deviceId) => {
    if (isCreatingConnection) {
      // 如果正在创建连接
      if (!connectionStart) {
        // 设置连接起点
        setConnectionStart(deviceId);
      } else if (connectionStart !== deviceId) {
        // 创建新连接
        const newConnection = {
          id: connections.length + 1,
          source: connectionStart,
          target: deviceId,
          sourceInterface: devices.find(d => d.id === connectionStart).interfaces[0],
          targetInterface: devices.find(d => d.id === deviceId).interfaces[0]
        };
        
        setConnections([...connections, newConnection]);
        setConnectionStart(null);
        setIsCreatingConnection(false);
      }
    } else {
      // 选择设备并显示终端
      const device = devices.find(d => d.id === deviceId);
      setSelectedDevice(device);
      setActiveTab('terminal');
    }
  };
  
  // 添加新设备
  const addNewDevice = (x, y) => {
    const newDevice = {
      id: devices.length + 1,
      type: newDeviceType,
      name: newDeviceType === 'router' ? `R${devices.length + 1}` : `SW${devices.length + 1}`,
      x: x,
      y: y,
      commands: {},
      interfaces: newDeviceType === 'router' 
        ? ['GigabitEthernet0/0', 'GigabitEthernet0/1'] 
        : ['GigabitEthernet1/0/1', 'GigabitEthernet1/0/2', 'GigabitEthernet1/0/3']
    };
    
    setDevices([...devices, newDevice]);
    setIsCreatingDevice(false);
  };
  
  // 处理画布点击
  const handleCanvasClick = (e) => {
    if (isCreatingDevice) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width / canvas.width);
      const y = (e.clientY - rect.top) / (rect.height / canvas.height);
      
      addNewDevice(x, y);
    }
  };
  
  // 渲染设备到画布
  const renderDevices = () => {
    return devices.map(device => (
      <div 
        key={device.id} 
        className={`${styles.device} ${styles[device.type]} ${selectedDevice?.id === device.id ? styles.selected : ''}`}
        style={{ left: `${device.x}px`, top: `${device.y}px` }}
        onClick={() => handleDeviceClick(device.id)}
      >
        <div className={styles.deviceIcon}></div>
        <div className={styles.deviceName}>{device.name}</div>
      </div>
    ));
  };
  
  // 处理表单提交
  const handleLeadFormSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加表单数据处理和提交逻辑
    setFormSubmitted(true);
    setTimeout(() => {
      setShowLeadForm(false);
      setFormSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className={styles.simulatorContainer}>
      <div className={styles.simulatorHeader}>
        <h2>CCIE网络拓扑模拟器</h2>
        <p>使用这个简化版的网络模拟器来构建拓扑和练习基本命令</p>
      </div>
      
      <div className={styles.simulatorTabs}>
        <button 
          className={activeTab === 'topology' ? styles.activeTab : ''}
          onClick={() => setActiveTab('topology')}
        >
          拓扑设计
        </button>
        <button 
          className={activeTab === 'terminal' ? styles.activeTab : ''}
          onClick={() => setActiveTab('terminal')}
          disabled={!selectedDevice}
        >
          终端控制台
        </button>
      </div>
      
      <div className={styles.simulatorContent}>
        {activeTab === 'topology' && (
          <div className={styles.topologyView}>
            <div className={styles.topologyToolbar}>
              <button 
                className={`${styles.toolButton} ${isCreatingDevice && newDeviceType === 'router' ? styles.active : ''}`}
                onClick={() => {
                  setIsCreatingDevice(true);
                  setIsCreatingConnection(false);
                  setNewDeviceType('router');
                }}
              >
                添加路由器
              </button>
              <button 
                className={`${styles.toolButton} ${isCreatingDevice && newDeviceType === 'switch' ? styles.active : ''}`}
                onClick={() => {
                  setIsCreatingDevice(true);
                  setIsCreatingConnection(false);
                  setNewDeviceType('switch');
                }}
              >
                添加交换机
              </button>
              <button 
                className={`${styles.toolButton} ${isCreatingConnection ? styles.active : ''}`}
                onClick={() => {
                  setIsCreatingConnection(!isCreatingConnection);
                  setIsCreatingDevice(false);
                  setConnectionStart(null);
                }}
              >
                添加连接
              </button>
              <button 
                className={styles.toolButton}
                onClick={() => {
                  setIsCreatingDevice(false);
                  setIsCreatingConnection(false);
                }}
              >
                选择模式
              </button>
            </div>
            
            <div className={styles.topologyCanvas} onClick={handleCanvasClick}>
              <canvas ref={canvasRef} width="800" height="600"></canvas>
              {renderDevices()}
              
              <div className={styles.canvasHint}>
                {isCreatingDevice && <p>点击画布添加{newDeviceType === 'router' ? '路由器' : '交换机'}</p>}
                {isCreatingConnection && !connectionStart && <p>选择第一个设备作为连接起点</p>}
                {isCreatingConnection && connectionStart && <p>选择第二个设备作为连接终点</p>}
              </div>
            </div>
            
            <div className={styles.topologyLimitation}>
              <p>免费版最多可添加5个设备和8条连接</p>
              <p>升级到专业版获得无限制的设备和连接数量</p>
              <Link href="/courses/simulation-lab">
                <button className={styles.upgradeButton}>升级到专业版</button>
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'terminal' && selectedDevice && (
          <div className={styles.terminalView}>
            <div className={styles.deviceInfo}>
              <h3>{selectedDevice.name} 终端控制台</h3>
              <p>设备类型: {selectedDevice.type === 'router' ? '路由器' : '交换机'}</p>
            </div>
            
            <div className={styles.terminal} ref={terminalRef}>
              <pre>{terminalOutput || `连接到${selectedDevice.name}...\n${selectedDevice.name}# `}</pre>
            </div>
            
            <form className={styles.commandForm} onSubmit={handleCommandSubmit}>
              <div className={styles.commandPrompt}>{selectedDevice.name}#</div>
              <input 
                type="text" 
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="输入Cisco IOS命令..."
                className={styles.commandInput}
              />
              <button type="submit" className={styles.runButton}>执行</button>
            </form>
            
            <div className={styles.terminalGuide}>
              <h4>可用命令示例：</h4>
              <ul className={styles.commandList}>
                <li>show version</li>
                <li>show ip interface brief</li>
                <li>show running-config</li>
                <li>conf t</li>
              </ul>
              <p className={styles.limitNote}>* 免费版仅支持上述基础命令</p>
              <Link href="/courses/simulation-lab">
                <button className={styles.upgradeButton}>升级到专业版</button>
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* 引流悬浮球 */}
      <div className={styles.floatingPromo}>
        <p>学习如何构建复杂网络？</p>
        <Link href="/courses/network-design">
          <button>查看高级网络设计课程</button>
        </Link>
      </div>
      
      {/* 引流表单弹窗 */}
      {showLeadForm && (
        <div className={styles.leadFormOverlay}>
          <div className={styles.leadForm}>
            <button className={styles.closeButton} onClick={() => setShowLeadForm(false)}>×</button>
            
            {!formSubmitted ? (
              <>
                <h3>获取完整版网络模拟器</h3>
                <p>填写以下信息，获取专业版模拟器7天免费试用资格</p>
                
                <form onSubmit={handleLeadFormSubmit}>
                  <div className={styles.formGroup}>
                    <label>姓名</label>
                    <input type="text" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>手机号码</label>
                    <input type="tel" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>邮箱</label>
                    <input type="email" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>工作经验</label>
                    <select>
                      <option value="">请选择</option>
                      <option value="0-2">0-2年</option>
                      <option value="3-5">3-5年</option>
                      <option value="5-10">5-10年</option>
                      <option value="10+">10年以上</option>
                    </select>
                  </div>
                  
                  <button type="submit" className={styles.submitButton}>
                    获取试用资格
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>提交成功！</h3>
                <p>我们将在24小时内联系您，为您开通试用账号</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 