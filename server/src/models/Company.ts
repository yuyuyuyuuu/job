import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logo?: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  type: 'private' | 'public' | 'government' | 'foreign' | 'joint';
  location: {
    city: string;
    province: string;
    country: string;
    address?: string;
  };
  description: string;
  website?: string;
  founded?: number;
  employees?: string;
  
  // 招聘信息
  recruitment: {
    status: 'active' | 'inactive' | 'seasonal';
    totalPositions: number;
    activePositions: number;
    averageSalary?: string;
    benefits: string[];
    requirements: string[];
  };

  // 评价信息
  rating: {
    overall: number;
    culture: number;
    salary: number;
    career: number;
    workLife: number;
    management: number;
    reviewCount: number;
  };

  // 历年录用数据
  historicalData: {
    year: number;
    hired: number;
    applied: number;
    interviewRate: number;
    offerRate: number;
    schools: {
      name: string;
      count: number;
    }[];
    majors: {
      name: string;
      count: number;
    }[];
  }[];

  // 联系信息
  contact: {
    phone?: string;
    email?: string;
    hr?: string;
    recruitmentEmail?: string;
  };

  // 认证信息
  verification: {
    isVerified: boolean;
    verifiedAt?: Date;
    verifiedBy?: string;
    businessLicense?: string;
  };

  // 统计信息
  stats: {
    viewsCount: number;
    followersCount: number;
    applicationsCount: number;
    lastUpdated: Date;
  };

  // 内容
  content: {
    gallery: string[];
    videos: string[];
    news: {
      title: string;
      content: string;
      publishedAt: Date;
    }[];
  };

  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  logo: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
    required: true
  },
  type: {
    type: String,
    enum: ['private', 'public', 'government', 'foreign', 'joint'],
    required: true
  },
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
    address: String
  },
  description: {
    type: String,
    required: true
  },
  website: String,
  founded: Number,
  employees: String,
  
  // 招聘信息
  recruitment: {
    status: {
      type: String,
      enum: ['active', 'inactive', 'seasonal'],
      default: 'active'
    },
    totalPositions: {
      type: Number,
      default: 0
    },
    activePositions: {
      type: Number,
      default: 0
    },
    averageSalary: String,
    benefits: [String],
    requirements: [String]
  },

  // 评价信息
  rating: {
    overall: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    culture: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    salary: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    career: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    workLife: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    management: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },

  // 历年录用数据
  historicalData: [{
    year: Number,
    hired: Number,
    applied: Number,
    interviewRate: Number,
    offerRate: Number,
    schools: [{
      name: String,
      count: Number
    }],
    majors: [{
      name: String,
      count: Number
    }]
  }],

  // 联系信息
  contact: {
    phone: String,
    email: String,
    hr: String,
    recruitmentEmail: String
  },

  // 认证信息
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verifiedBy: String,
    businessLicense: String
  },

  // 统计信息
  stats: {
    viewsCount: {
      type: Number,
      default: 0
    },
    followersCount: {
      type: Number,
      default: 0
    },
    applicationsCount: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },

  // 内容
  content: {
    gallery: [String],
    videos: [String],
    news: [{
      title: String,
      content: String,
      publishedAt: {
        type: Date,
        default: Date.now
      }
    }]
  }
}, {
  timestamps: true
});

// 索引
companySchema.index({ name: 1 });
companySchema.index({ industry: 1 });
companySchema.index({ size: 1 });
companySchema.index({ type: 1 });
companySchema.index({ 'location.city': 1 });
companySchema.index({ 'location.province': 1 });
companySchema.index({ 'recruitment.status': 1 });
companySchema.index({ 'rating.overall': -1 });
companySchema.index({ 'stats.followersCount': -1 });
companySchema.index({ createdAt: -1 });

const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company;