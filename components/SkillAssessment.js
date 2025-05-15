import { useState } from 'react';
import styles from '../styles/SkillAssessment.module.css';

export default function SkillAssessment({ title, description }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    goals: [],
    currentCerts: []
  });
  
  const [result, setResult] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // CCIE认证目标选项
  const goalOptions = [
    { id: 'career_advancement', label: '职业晋升' },
    { id: 'salary_increase', label: '薪资提升' },
    { id: 'knowledge', label: '扩展知识面' },
    { id: 'job_change', label: '转行/换工作' },
    { id: 'requirement', label: '工作要求' }
  ];

  // 当前认证选项
  const certOptions = [
    { id: 'none', label: '无思科认证' },
    { id: 'ccna', label: 'CCNA' },
    { id: 'ccnp', label: 'CCNP' },
    { id: 'ccie_written', label: 'CCIE笔试通过' },
    { id: 'other', label: '其他认证' }
  ];

  // 经验年限选项
  const experienceOptions = [
    { id: 'less_than_1', label: '不到1年' },
    { id: '1_to_3', label: '1-3年' },
    { id: '3_to_5', label: '3-5年' },
    { id: '5_to_10', label: '5-10年' },
    { id: 'more_than_10', label: '10年以上' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        errors.name = '请输入您的姓名';
      }
      
      if (!formData.phone.trim()) {
        errors.phone = '请输入您的手机号码';
      } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        errors.phone = '请输入有效的手机号码';
      }
      
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = '请输入有效的邮箱地址';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.experience) {
        errors.experience = '请选择您的经验年限';
      }
      
      if (formData.goals.length === 0) {
        errors.goals = '请至少选择一个学习目标';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const calculateResult = () => {
    // 根据用户的信息评估其水平和推荐课程
    const hasExperience = !['less_than_1', '1_to_3'].includes(formData.experience);
    const hasCerts = formData.currentCerts.some(cert => cert !== 'none');
    const hasCCNP = formData.currentCerts.includes('ccnp');
    const hasCCIEWritten = formData.currentCerts.includes('ccie_written');
    
    let courseRecommendation = '';
    let timeEstimation = '';
    let difficultyLevel = '';
    
    if (hasCCIEWritten) {
      courseRecommendation = 'CCIE实验专项突破班';
      timeEstimation = '3-4个月';
      difficultyLevel = '您已经完成笔试，只需专注实验部分';
    } else if (hasCCNP) {
      courseRecommendation = 'CCIE全程班(笔试+实验)';
      timeEstimation = '6-8个月';
      difficultyLevel = '中等难度 - 您已有CCNP基础，可以加速学习';
    } else if (hasCerts) {
      courseRecommendation = 'CCIE全程班(加强版)';
      timeEstimation = '8-10个月';
      difficultyLevel = '中高难度 - 需要补充一些基础知识';
    } else if (hasExperience) {
      courseRecommendation = 'CCIE基础强化全程班';
      timeEstimation = '10-12个月';
      difficultyLevel = '高难度 - 从基础开始全面学习';
    } else {
      courseRecommendation = 'CCNP+CCIE组合课程';
      timeEstimation = '12-15个月';
      difficultyLevel = '较高难度 - 建议先获取CCNP再学习CCIE';
    }
    
    setResult({
      courseRecommendation,
      timeEstimation,
      difficultyLevel
    });
    
    // 在实际应用中，这里可以发送数据到后端保存
    console.log('提交数据', formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      calculateResult();
      setStep(4); // 直接跳到结果页
    }
  };

  return (
    <div className={styles.assessmentContainer}>
      <div className={styles.assessmentHeader}>
        <h2>{title || '免费CCIE技能评估'}</h2>
        <p>{description || '评估您当前的技能水平，获取专属学习建议'}</p>
      </div>
      
      {/* 进度指示器 */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>基本信息</div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>学习目标</div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>技能评估</div>
      </div>
      
      <div className={styles.formContainer}>
        {step === 1 && (
          <div className={styles.formStep}>
            <h3>第一步: 基本信息</h3>
            
            <div className={styles.formGroup}>
              <label>您的姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入姓名"
              />
              {formErrors.name && <div className={styles.error}>{formErrors.name}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label>手机号码</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="请输入手机号码"
              />
              {formErrors.phone && <div className={styles.error}>{formErrors.phone}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label>邮箱地址 (选填)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入邮箱"
              />
              {formErrors.email && <div className={styles.error}>{formErrors.email}</div>}
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.nextButton} onClick={nextStep}>
                下一步
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className={styles.formStep}>
            <h3>第二步: 学习目标</h3>
            
            <div className={styles.formGroup}>
              <label>您的网络工作经验</label>
              <div className={styles.radioGroup}>
                {experienceOptions.map(option => (
                  <div key={option.id} className={styles.radioItem}>
                    <input
                      type="radio"
                      id={option.id}
                      name="experience"
                      value={option.id}
                      checked={formData.experience === option.id}
                      onChange={handleChange}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ))}
              </div>
              {formErrors.experience && <div className={styles.error}>{formErrors.experience}</div>}
            </div>
            
            <div className={styles.formGroup}>
              <label>您获取CCIE认证的目标是什么? (可多选)</label>
              <div className={styles.checkboxGroup}>
                {goalOptions.map(option => (
                  <div key={option.id} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id={option.id}
                      name="goals"
                      value={option.id}
                      checked={formData.goals.includes(option.id)}
                      onChange={handleChange}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ))}
              </div>
              {formErrors.goals && <div className={styles.error}>{formErrors.goals}</div>}
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.backButton} onClick={prevStep}>
                上一步
              </button>
              <button type="button" className={styles.nextButton} onClick={nextStep}>
                下一步
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className={styles.formStep}>
            <h3>第三步: 当前技能水平</h3>
            
            <div className={styles.formGroup}>
              <label>您当前拥有的认证 (可多选)</label>
              <div className={styles.checkboxGroup}>
                {certOptions.map(option => (
                  <div key={option.id} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id={`cert_${option.id}`}
                      name="currentCerts"
                      value={option.id}
                      checked={formData.currentCerts.includes(option.id)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`cert_${option.id}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.backButton} onClick={prevStep}>
                上一步
              </button>
              <button type="button" className={styles.submitButton} onClick={handleSubmit}>
                提交评估
              </button>
            </div>
          </div>
        )}
        
        {step === 4 && result && (
          <div className={styles.resultContainer}>
            <div className={styles.resultHeader}>
              <h3>您的CCIE学习评估结果</h3>
              <div className={styles.resultIcon}>✓</div>
            </div>
            
            <div className={styles.resultContent}>
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>推荐课程:</div>
                <div className={styles.resultValue}>{result.courseRecommendation}</div>
              </div>
              
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>预计学习时间:</div>
                <div className={styles.resultValue}>{result.timeEstimation}</div>
              </div>
              
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>难度评估:</div>
                <div className={styles.resultValue}>{result.difficultyLevel}</div>
              </div>
              
              <div className={styles.resultMessage}>
                <p>我们的课程顾问将在24小时内联系您，提供更详细的学习计划和课程介绍。</p>
                <p>您也可以立即查看我们的<a href="/courses">CCIE培训课程</a>。</p>
              </div>
              
              <div className={styles.discount}>
                <div className={styles.discountLabel}>评估专属优惠码</div>
                <div className={styles.discountCode}>CCIE2024</div>
                <div className={styles.discountDesc}>报名时使用，享受课程9折优惠</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 