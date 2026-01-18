# 🎨 UPDATED UI DESIGN SYSTEM
## Matching Your Reference Dashboard Design

---

## 1. COLOR PALETTE (Extracted from Reference)

```css
/* globals.css - REPLACE your existing color scheme with this */

:root {
  /* Background Colors */
  --bg-main: #f0f4f8;           /* Light grayish-blue background */
  --bg-card: #ffffff;            /* White cards */
  --bg-card-alt: #f8fafc;        /* Slightly off-white */
  
  /* Primary Gradient (Coral/Peach to Pink) */
  --gradient-warm: linear-gradient(135deg, #fec8a0 0%, #f8a4b8 50%, #e8b4d0 100%);
  
  /* Secondary Gradient (Blue to Purple/Teal) */
  --gradient-cool: linear-gradient(135deg, #a8d4e6 0%, #b8c4e8 50%, #c8d0f0 100%);
  
  /* Accent Colors */
  --accent-coral: #f87171;       /* Coral/Red for alerts, high risk */
  --accent-blue: #3b82f6;        /* Blue for info, progress */
  --accent-purple: #8b5cf6;      /* Purple for primary actions */
  --accent-teal: #14b8a6;        /* Teal for success */
  
  /* Text Colors */
  --text-primary: #1e293b;       /* Dark slate for headings */
  --text-secondary: #64748b;     /* Muted for descriptions */
  --text-muted: #94a3b8;         /* Light gray for hints */
  
  /* Risk Colors */
  --risk-high: #f87171;          /* Coral red */
  --risk-medium: #fbbf24;        /* Amber */
  --risk-low: #34d399;           /* Emerald green */
  
  /* Borders & Shadows */
  --border-light: #e2e8f0;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}
```

---

## 2. GLOBAL STYLES (globals.css)

```css
/* frontend/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  /* Background */
  --bg-main: #f0f4f8;
  --bg-card: #ffffff;
  
  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #fec8a0 0%, #f8a4b8 50%, #e8b4d0 100%);
  --gradient-cool: linear-gradient(135deg, #a8d4e6 0%, #b8c4e8 50%, #c8d0f0 100%);
  --gradient-warm-soft: linear-gradient(135deg, #fff5f0 0%, #fff0f5 100%);
  --gradient-cool-soft: linear-gradient(135deg, #f0f7ff 0%, #f5f0ff 100%);
  
  /* Accents */
  --accent-coral: #f87171;
  --accent-blue: #3b82f6;
  --accent-purple: #8b5cf6;
  
  /* Text */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  
  /* Risk */
  --risk-high: #f87171;
  --risk-medium: #fbbf24;
  --risk-low: #34d399;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-main);
  color: var(--text-primary);
}

/* Card Styles */
@layer components {
  .card-base {
    @apply bg-white rounded-3xl p-6 shadow-sm border border-gray-100;
  }
  
  .card-gradient-warm {
    background: var(--gradient-warm);
    @apply rounded-3xl p-6 text-white;
  }
  
  .card-gradient-cool {
    background: var(--gradient-cool);
    @apply rounded-3xl p-6;
  }
  
  .card-hover {
    @apply transition-all duration-300 hover:shadow-lg hover:-translate-y-1;
  }
  
  /* Progress bar styles */
  .progress-bar {
    @apply h-2 rounded-full bg-gray-100 overflow-hidden;
  }
  
  .progress-fill-blue {
    @apply h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600;
  }
  
  .progress-fill-coral {
    @apply h-full rounded-full bg-gradient-to-r from-orange-300 to-red-400;
  }
  
  /* Icon container */
  .icon-container {
    @apply w-10 h-10 rounded-xl flex items-center justify-center;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

---

## 3. UPDATED ADMIN DASHBOARD COMPONENT

```tsx
// frontend/components/AdminDashboard.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Users, AlertTriangle, TrendingUp, Activity, 
  Search, Bell, ChevronRight, ArrowUpRight, ArrowDownRight,
  GraduationCap, Calendar, Clock, MoreHorizontal,
  Brain, DollarSign, BookOpen, Heart
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Area, AreaChart
} from 'recharts';
import Image from 'next/image';

// Sample data
const focusData = [
  { week: 'W1', highRisk: 20, lowRisk: 65 },
  { week: 'W2', highRisk: 25, lowRisk: 60 },
  { week: 'W3', highRisk: 18, lowRisk: 70 },
  { week: 'W4', highRisk: 30, lowRisk: 55 },
  { week: 'W5', highRisk: 22, lowRisk: 68 },
  { week: 'W6', highRisk: 28, lowRisk: 58 },
  { week: 'W7', highRisk: 15, lowRisk: 75 },
  { week: 'W8', highRisk: 35, lowRisk: 50 },
];

const riskFactors = [
  { name: 'Academic Stress', percentage: 71, trend: 'down' },
  { name: 'Financial Issues', percentage: 92, trend: 'up' },
  { name: 'Mental Health', percentage: 33, trend: 'down' },
  { name: 'Low Attendance', percentage: 56, trend: 'up' },
  { name: 'Career Misalign', percentage: 79, trend: 'up' },
];

const recentAssessments = [
  { id: 1, name: 'Student Assessment', date: 'Tue, 11 Jul', time: '08:15 am', risk: 'high', type: 'Academic Review' },
  { id: 2, name: 'New Enrollment', date: 'Tue, 11 Jul', time: '09:30 pm', risk: 'low', type: 'Onboarding' },
  { id: 3, name: 'Follow-up Session', date: 'Tue, 12 Jul', time: '02:30 pm', risk: 'medium', type: 'Counseling' },
  { id: 4, name: 'Risk Review', date: 'Tue, 15 Jul', time: '04:00 pm', risk: 'high', type: 'Intervention' },
];

const interventionTypes = [
  { name: 'Counseling', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { name: 'Financial Aid', icon: DollarSign, color: 'bg-green-100 text-green-600' },
  { name: 'Academic', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
  { name: 'Wellness', icon: Heart, color: 'bg-pink-100 text-pink-600' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin</h1>
              <p className="text-gray-500 text-sm">Your student retention dashboard overview</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent outline-none text-sm flex-1 text-gray-600"
              />
            </div>
            
            {/* Notifications */}
            <button className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Profile & Stats */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Overview</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              {/* Avatar with ring */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-gray-700" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h4 className="font-semibold text-gray-900 text-lg">RVCE Admin</h4>
                <p className="text-gray-500 text-sm">Student Retention Manager</p>
              </div>
              
              {/* Stats */}
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-500">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">373</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">82%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Success</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold">45</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">At Risk</p>
                </div>
              </div>
            </motion.div>

            {/* Intervention Types Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Support Services</h3>
                <span className="text-xs text-gray-500">4 active</span>
              </div>
              
              <div className="flex gap-3">
                {interventionTypes.map((type, i) => (
                  <div 
                    key={i}
                    className={`w-12 h-12 rounded-2xl ${type.color} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                    title={type.name}
                  >
                    <type.icon className="w-5 h-5" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Column - Main Stats & Chart */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            
            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* High Risk Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #fec8a0 0%, #f8a4b8 50%, #e8b4d0 100%)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">High Risk</p>
                    <p className="text-white/60 text-xs">Students</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-5xl font-bold text-white">12%</span>
                  <p className="text-white/70 text-sm mt-1">of total students</p>
                </div>
              </motion.div>

              {/* Low Risk Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #a8d4e6 0%, #b8c4e8 50%, #c8d0f0 100%)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-700/80 text-sm font-medium">Low Risk</p>
                    <p className="text-gray-600/60 text-xs">Students</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-5xl font-bold text-gray-800">60%</span>
                  <p className="text-gray-600/70 text-sm mt-1">of total students</p>
                </div>
              </motion.div>
            </div>

            {/* Analytics Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Risk Trends</h3>
                  <p className="text-gray-500 text-sm">Student risk analytics</p>
                </div>
                <select className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-600 border-0 outline-none cursor-pointer">
                  <option>Last month</option>
                  <option>Last quarter</option>
                  <option>Last year</option>
                </select>
              </div>
              
              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={focusData}>
                    <defs>
                      <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="highRisk" 
                      stroke="#f87171" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorHigh)" 
                      name="High Risk %"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lowRisk" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorLow)" 
                      name="Low Risk %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="text-sm text-gray-500">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-500">Low Risk</span>
                </div>
              </div>
              
              {/* Summary Stat */}
              <div className="text-right mt-4">
                <span className="text-4xl font-bold text-gray-800">28%</span>
                <p className="text-gray-500 text-sm">Medium Risk</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Assessments & Factors */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            
            {/* Recent Assessments */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Recent Cases</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentAssessments.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="text-right min-w-[70px]">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <p className="text-xs font-medium text-gray-700">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          item.risk === 'high' ? 'bg-red-400' : 
                          item.risk === 'medium' ? 'bg-amber-400' : 'bg-green-400'
                        }`}></span>
                        <span className="text-xs text-gray-500">{item.type}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                See all cases <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Risk Factors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">Risk Factors</h3>
                <p className="text-gray-500 text-xs">Most common indicators</p>
              </div>
              
              <div className="space-y-4">
                {riskFactors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{factor.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{factor.percentage}%</span>
                        {factor.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                        style={{ width: `${factor.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. MATCHING COMPONENTS FOR OTHER PAGES

### Updated Hero Section (Matching Style)

```tsx
// frontend/components/Hero.tsx (Updated to match design system)
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Users, Brain, TrendingUp, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f0f4f8]">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'linear-gradient(135deg, #fec8a0 0%, #f8a4b8 100%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'linear-gradient(135deg, #a8d4e6 0%, #c8d0f0 100%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-600 font-medium text-sm mb-8">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              Design Thinking Lab Project - RVCE
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900">
              Predict.
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Prevent.
              </span>
              <br />
              Prosper.
            </h1>
            
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
              An intelligent early warning system that identifies at-risk students 
              and connects them with personalized support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" 
                className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:opacity-90 text-white text-lg h-14 px-8 rounded-2xl shadow-lg">
                <Link href="/assessment">
                  Take Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" 
                className="text-lg h-14 px-8 rounded-2xl border-2 border-gray-200 hover:bg-gray-50">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12">
              {[
                { value: '85%', label: 'Model Accuracy' },
                { value: '0.89', label: 'AUC-ROC Score' },
                { value: '4.4K', label: 'Students Trained' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Gradient Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="col-span-2 p-6 rounded-3xl relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #fec8a0 0%, #f8a4b8 50%, #e8b4d0 100%)' }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">ML Prediction</p>
                    <p className="text-white text-2xl font-bold">Random Forest</p>
                    <p className="text-white/70 text-sm mt-2">Grid Search Optimized</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Smaller Cards */}
              {[
                { icon: Users, title: 'Personalized', desc: 'Support matching', gradient: 'linear-gradient(135deg, #a8d4e6 0%, #c8d0f0 100%)' },
                { icon: Shield, title: 'Early Detection', desc: 'Proactive alerts', gradient: 'linear-gradient(135deg, #e0f0e8 0%, #d0e8e0 100%)' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-5 rounded-3xl cursor-pointer transition-all hover:shadow-lg"
                  style={{ background: feature.gradient }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## 5. UPDATED RESULTS PAGE (Matching Style)

```tsx
// frontend/components/ResultsDisplay.tsx (Key updates for matching style)

// Update the risk score card section:
<Card className={`p-8 mb-8 text-center rounded-3xl relative overflow-hidden border-0 shadow-sm`}
  style={{ 
    background: prediction.riskLevel === 'high' 
      ? 'linear-gradient(135deg, #fec8a0 0%, #f8a4b8 50%, #e8b4d0 100%)'
      : prediction.riskLevel === 'medium'
      ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
      : 'linear-gradient(135deg, #a8d4e6 0%, #b8c4e8 50%, #c8d0f0 100%)'
  }}
>
  {/* Rest of the content */}
</Card>

// Update recommendation cards:
<Card className="p-6 h-full rounded-3xl border-0 shadow-sm hover:shadow-lg transition-all bg-white">
  {/* Content */}
</Card>
```

---

## 6. TAILWIND CONFIG UPDATE

```typescript
// frontend/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f4f8',
        foreground: '#1e293b',
        card: '#ffffff',
        'card-foreground': '#1e293b',
        primary: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#475569',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          coral: '#f87171',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          teal: '#14b8a6',
        },
        destructive: {
          DEFAULT: '#f87171',
          foreground: '#ffffff',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#8b5cf6',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

---

## 7. KEY DESIGN TOKENS SUMMARY

| Element | Value |
|---------|-------|
| **Background** | `#f0f4f8` (light grayish-blue) |
| **Card Background** | `#ffffff` with `border-gray-100` |
| **Border Radius** | `rounded-3xl` (1.5rem / 24px) |
| **Shadows** | Subtle `shadow-sm` or `shadow-md` |
| **Warm Gradient** | `#fec8a0 → #f8a4b8 → #e8b4d0` |
| **Cool Gradient** | `#a8d4e6 → #b8c4e8 → #c8d0f0` |
| **High Risk Color** | `#f87171` (coral) |
| **Low Risk Color** | `#3b82f6` (blue) |
| **Text Primary** | `#1e293b` |
| **Text Secondary** | `#64748b` |
| **Font** | Inter |

---

This design system now matches your reference image exactly! All components use:
- The same soft background color
- Gradient cards (warm coral-pink and cool blue-purple)
- Rounded corners (3xl)
- Clean typography
- Subtle shadows
- Progress bars with the same style
