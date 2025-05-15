import { useState, useEffect } from 'react';
import styles from '../styles/CountdownTimer.module.css';

export default function CountdownTimer({ 
  endDate, 
  title = '特别优惠即将结束', 
  description = '抓紧时间报名，享受优惠价格',
  onComplete
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // 如果没有传入结束日期，默认设置为7天后
    const targetDate = endDate ? new Date(endDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();
      
      if (difference <= 0) {
        setIsExpired(true);
        clearInterval(timer);
        onComplete && onComplete();
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // 初始计算
    calculateTimeLeft();
    
    // 设置定时器每秒更新一次
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  // 数字前补零
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  if (isExpired) {
    return (
      <div className={styles.expired}>
        <h3>优惠已结束</h3>
        <p>您可以联系我们咨询最新价格</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className={styles.timerContainer}>
          <div className={styles.timerItem}>
            <div className={styles.timerValue}>{padZero(timeLeft.days)}</div>
            <div className={styles.timerLabel}>天</div>
          </div>
          <div className={styles.timerSeparator}>:</div>
          <div className={styles.timerItem}>
            <div className={styles.timerValue}>{padZero(timeLeft.hours)}</div>
            <div className={styles.timerLabel}>时</div>
          </div>
          <div className={styles.timerSeparator}>:</div>
          <div className={styles.timerItem}>
            <div className={styles.timerValue}>{padZero(timeLeft.minutes)}</div>
            <div className={styles.timerLabel}>分</div>
          </div>
          <div className={styles.timerSeparator}>:</div>
          <div className={styles.timerItem}>
            <div className={styles.timerValue}>{padZero(timeLeft.seconds)}</div>
            <div className={styles.timerLabel}>秒</div>
          </div>
        </div>
      </div>
    </div>
  );
} 