import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId;
  
  // 职位基本信息
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: {
    city: string;
    province: string;
    country: string;
    address?: string;
    remote: boolean;
  };
  
  // 薪资福利
  salary: {
    min?: number;
    max?: number;
    currency: string;
    type: 'monthly' | 'annually' | 'hourly';
    negotiable: boolean;
  };
  benefits: string[];
  
  // 职位分类
  category: string;
  subCategory?: string;
  level: 'intern' | 'junior' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
  type: 'full-time' | 'part-time' | 'contract' | 'intern' | 'freelance';
  
  // 工作要求
  experience: {
    min: number;
    max?: number;
    unit: 'months' | 'years';
  };
  education: 'high-school' | 'college' | 'bachelor' | 'master' | 'phd' | 'other';
  skills: string[];
  languages: {
    name: string;
    level: 'basic' | 'intermediate' | 'advanced' | 'native';
  }[];
  
  // 招聘信息
  recruitment: {
    status: 'active' | 'paused' | 'closed' | 'filled';
    openings: number;
    applicationCount: number;
    viewCount: number;
    deadline?: Date;
    startDate?: Date;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };
  
  // 应聘流程
  process: {
    steps: string[];
    currentStep?: string;
    estimatedDuration?: string;
  };
  
  // 统计信息
  stats: {
    totalApplications: number;
    pendingApplications: number;
    rejectedApplications: number;
    acceptedApplications: number;
    interviewsScheduled: number;
    offersExtended: number;
    lastActivity: Date;
  };
  
  // 内推信息
  referral: {
    enabled: boolean;
    reward?: string;
    referredBy?: mongoose.Types.ObjectId;
    referralCount: number;
  };
  
  // 标签和关键词
  tags: string[];
  keywords: string[];
  
  // 额外信息
  featured: boolean;
  urgent: boolean;
  remote: boolean;
  flexible: boolean;
  
  // 审核状态
  approved: boolean;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // 职位基本信息
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  responsibilities: [String],
  location: {
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: '中国'
    },
    address: String,
    remote: {
      type: Boolean,
      default: false
    }
  },
  
  // 薪资福利
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'CNY'
    },
    type: {
      type: String,
      enum: ['monthly', 'annually', 'hourly'],
      default: 'monthly'
    },
    negotiable: {
      type: Boolean,
      default: false
    }
  },
  benefits: [String],
  
  // 职位分类
  category: {
    type: String,
    required: true
  },
  subCategory: String,
  level: {
    type: String,
    enum: ['intern', 'junior', 'mid', 'senior', 'lead', 'manager', 'director'],
    required: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'intern', 'freelance'],
    required: true
  },
  
  // 工作要求
  experience: {
    min: {
      type: Number,
      required: true
    },
    max: Number,
    unit: {
      type: String,
      enum: ['months', 'years'],
      default: 'years'
    }
  },
  education: {
    type: String,
    enum: ['high-school', 'college', 'bachelor', 'master', 'phd', 'other'],
    required: true
  },
  skills: [String],
  languages: [{
    name: String,
    level: {
      type: String,
      enum: ['basic', 'intermediate', 'advanced', 'native']
    }
  }],
  
  // 招聘信息
  recruitment: {
    status: {
      type: String,
      enum: ['active', 'paused', 'closed', 'filled'],
      default: 'active'
    },
    openings: {
      type: Number,
      default: 1
    },
    applicationCount: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    },
    deadline: Date,
    startDate: Date,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    }
  },
  
  // 应聘流程
  process: {
    steps: [String],
    currentStep: String,
    estimatedDuration: String
  },
  
  // 统计信息
  stats: {
    totalApplications: {
      type: Number,
      default: 0
    },
    pendingApplications: {
      type: Number,
      default: 0
    },
    rejectedApplications: {
      type: Number,
      default: 0
    },
    acceptedApplications: {
      type: Number,
      default: 0
    },
    interviewsScheduled: {
      type: Number,
      default: 0
    },
    offersExtended: {
      type: Number,
      default: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  
  // 内推信息
  referral: {
    enabled: {
      type: Boolean,
      default: false
    },
    reward: String,
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    referralCount: {
      type: Number,
      default: 0
    }
  },
  
  // 标签和关键词
  tags: [String],
  keywords: [String],
  
  // 额外信息
  featured: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  remote: {
    type: Boolean,
    default: false
  },
  flexible: {
    type: Boolean,
    default: false
  },
  
  // 审核状态
  approved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date
}, {
  timestamps: true
});

// 索引
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ company: 1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ level: 1 });
jobSchema.index({ type: 1 });
jobSchema.index({ 'location.city': 1 });
jobSchema.index({ 'location.province': 1 });
jobSchema.index({ 'recruitment.status': 1 });
jobSchema.index({ 'recruitment.priority': 1 });
jobSchema.index({ 'recruitment.deadline': 1 });
jobSchema.index({ featured: 1 });
jobSchema.index({ urgent: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ updatedAt: -1 });

const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;