import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  avatar?: string;
  userType: 'student' | 'professional' | 'hr' | 'admin';
  isEmailVerified: boolean;
  
  // 学生信息
  studentInfo?: {
    school: string;
    major: string;
    degree: 'bachelor' | 'master' | 'phd' | 'other';
    graduationYear: number;
    studentId?: string;
    isVerified: boolean;
  };

  // 从业者信息
  professionalInfo?: {
    company: string;
    position: string;
    workYears: number;
    industry: string;
    skills: string[];
    isVerified: boolean;
    verificationDoc?: string;
    rating: number;
    successCases: number;
  };

  // HR信息
  hrInfo?: {
    company: string;
    position: string;
    isVerified: boolean;
    verificationDoc?: string;
  };

  // 个人资料
  profile: {
    fullName?: string;
    phone?: string;
    location?: string;
    bio?: string;
    targetIndustries?: string[];
    targetPositions?: string[];
    expectedSalary?: string;
    jobStatus?: 'seeking' | 'employed' | 'considering';
  };

  // 会员信息
  membership: {
    type: 'free' | 'premium' | 'vip';
    expiresAt?: Date;
    features: string[];
  };

  // 设置
  settings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    privacy: 'public' | 'private' | 'friends';
  };

  // 统计信息
  stats: {
    loginCount: number;
    lastLoginAt?: Date;
    postsCount: number;
    connectionsCount: number;
    viewsCount: number;
  };

  createdAt: Date;
  updatedAt: Date;
  
  // 方法
  matchPassword(password: string): Promise<boolean>;
  generateAuthToken(): string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    default: ''
  },
  userType: {
    type: String,
    enum: ['student', 'professional', 'hr', 'admin'],
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // 学生信息
  studentInfo: {
    school: String,
    major: String,
    degree: {
      type: String,
      enum: ['bachelor', 'master', 'phd', 'other']
    },
    graduationYear: Number,
    studentId: String,
    isVerified: {
      type: Boolean,
      default: false
    }
  },

  // 从业者信息
  professionalInfo: {
    company: String,
    position: String,
    workYears: Number,
    industry: String,
    skills: [String],
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationDoc: String,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    successCases: {
      type: Number,
      default: 0
    }
  },

  // HR信息
  hrInfo: {
    company: String,
    position: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationDoc: String
  },

  // 个人资料
  profile: {
    fullName: String,
    phone: String,
    location: String,
    bio: String,
    targetIndustries: [String],
    targetPositions: [String],
    expectedSalary: String,
    jobStatus: {
      type: String,
      enum: ['seeking', 'employed', 'considering'],
      default: 'seeking'
    }
  },

  // 会员信息
  membership: {
    type: {
      type: String,
      enum: ['free', 'premium', 'vip'],
      default: 'free'
    },
    expiresAt: Date,
    features: {
      type: [String],
      default: []
    }
  },

  // 设置
  settings: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    privacy: {
      type: String,
      enum: ['public', 'private', 'friends'],
      default: 'public'
    }
  },

  // 统计信息
  stats: {
    loginCount: {
      type: Number,
      default: 0
    },
    lastLoginAt: Date,
    postsCount: {
      type: Number,
      default: 0
    },
    connectionsCount: {
      type: Number,
      default: 0
    },
    viewsCount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// 密码加密中间件
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// 密码验证方法
userSchema.methods.matchPassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// 索引
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ 'professionalInfo.company': 1 });
userSchema.index({ 'professionalInfo.industry': 1 });
userSchema.index({ 'profile.targetIndustries': 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model<IUser>('User', userSchema);

export default User;