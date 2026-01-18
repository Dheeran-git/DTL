// frontend/components/AssessmentForm.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { predictDropoutRisk } from '@/lib/api';

const steps = [
  { id: 'consent', title: 'Privacy & Consent', icon: '🔒' },
  { id: 'academic', title: 'Academic Information', icon: '📚' },
  { id: 'support', title: 'Support System', icon: '🤝' },
  { id: 'personal', title: 'Personal Factors', icon: '💼' },
  { id: 'services', title: 'Services & Review', icon: '✅' },
];

export default function AssessmentForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Consent
    consentGiven: false,
    consentDataProcessing: false,
    consentAnonymousAnalytics: false,

    // Academic
    academicYear: '',
    attendance: '',
    overwhelmFrequency: '',
    studyHours: '',
    performanceSatisfaction: 5,

    // Support
    advisorInteraction: '',
    supportNetworkStrength: 5,
    extracurricularHours: 0,

    // Personal
    employmentStatus: '',
    financialStress: '',
    careerAlignment: 5,

    // Services
    servicesUsed: [] as string[],
    withdrawalConsidered: false,
    withdrawalReasons: [] as string[],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Consent
        return formData.consentGiven && formData.consentDataProcessing;
      case 1: // Academic
        return formData.academicYear && formData.attendance &&
               formData.overwhelmFrequency && formData.studyHours;
      case 2: // Support
        return formData.advisorInteraction;
      case 3: // Personal
        return formData.employmentStatus && formData.financialStress;
      case 4: // Services
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!formData.consentGiven) {
      alert('Please provide consent to continue');
      return;
    }

    setIsSubmitting(true);

    try {
      const prediction = await predictDropoutRisk(formData);

      localStorage.setItem('assessment', JSON.stringify(formData));
      localStorage.setItem('prediction', JSON.stringify({
        riskLevel: prediction.risk_level,
        riskScore: prediction.risk_score,
        dropoutProbability: prediction.dropout_probability,
        riskFactors: prediction.risk_factors,
        recommendations: prediction.recommendations,
        modelConfidence: prediction.model_confidence,
      }));

      router.push('/results');
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      // STEP 0: CONSENT
      case 0:
        return (
          <div className="space-y-6">
            <Alert className="bg-purple-50 border-purple-200">
              <Shield className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-800">
                Your privacy is important to us. Please review and provide consent before proceeding.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {/* Main Consent */}
              <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <Checkbox
                  id="consentGiven"
                  checked={formData.consentGiven}
                  onCheckedChange={(checked) => updateFormData('consentGiven', checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="consentGiven" className="font-medium text-gray-900 cursor-pointer">
                    I consent to the assessment *
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    I understand that my responses will be used to assess dropout risk and provide personalized support recommendations.
                  </p>
                </div>
              </div>

              {/* Data Processing Consent */}
              <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <Checkbox
                  id="consentDataProcessing"
                  checked={formData.consentDataProcessing}
                  onCheckedChange={(checked) => updateFormData('consentDataProcessing', checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="consentDataProcessing" className="font-medium text-gray-900 cursor-pointer">
                    I consent to data processing *
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    My information will be processed by our ML model to generate risk predictions. Data is kept confidential and used only for assessment purposes.
                  </p>
                </div>
              </div>

              {/* Anonymous Analytics (Optional) */}
              <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <Checkbox
                  id="consentAnonymousAnalytics"
                  checked={formData.consentAnonymousAnalytics}
                  onCheckedChange={(checked) => updateFormData('consentAnonymousAnalytics', checked)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="consentAnonymousAnalytics" className="font-medium text-gray-900 cursor-pointer">
                    I consent to anonymous analytics (optional)
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Help improve our system by allowing anonymized data to be used for model improvement and research.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Your Rights</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You can withdraw consent at any time</li>
                <li>• Your data is not shared with third parties</li>
                <li>• Results are confidential between you and support staff</li>
                <li>• You can request deletion of your data</li>
              </ul>
            </div>
          </div>
        );

      // STEP 1: ACADEMIC
      case 1:
        return (
          <div className="space-y-6">
            {/* Academic Year */}
            <div className="space-y-3">
              <Label className="text-base font-medium">What is your current academic year?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['1st', '2nd', '3rd', '4th'].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => updateFormData('academicYear', year)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.academicYear === year
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="font-semibold">{year} Year</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Attendance */}
            <div className="space-y-3">
              <Label className="text-base font-medium">How often do you attend your classes?</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { value: 'always', label: 'Always', emoji: '✅' },
                  { value: 'often', label: 'Often', emoji: '👍' },
                  { value: 'sometimes', label: 'Sometimes', emoji: '🤔' },
                  { value: 'rarely', label: 'Rarely', emoji: '😕' },
                  { value: 'never', label: 'Never', emoji: '❌' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('attendance', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.attendance === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Overwhelm Frequency */}
            <div className="space-y-3">
              <Label className="text-base font-medium">How often do you feel overwhelmed by academic workload?</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { value: 'never', label: 'Never' },
                  { value: 'rarely', label: 'Rarely' },
                  { value: 'sometimes', label: 'Sometimes' },
                  { value: 'often', label: 'Often' },
                  { value: 'always', label: 'Always' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('overwhelmFrequency', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.overwhelmFrequency === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Study Hours */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Hours per week studying outside class?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['1-3', '3-5', '5-8', '8+'].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => updateFormData('studyHours', hours)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.studyHours === hours
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="font-semibold">{hours} hrs</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Satisfaction */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                How satisfied are you with your academic performance? ({formData.performanceSatisfaction}/10)
              </Label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.performanceSatisfaction}
                onChange={(e) => updateFormData('performanceSatisfaction', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Very Dissatisfied</span>
                <span>Very Satisfied</span>
              </div>
            </div>
          </div>
        );

      // STEP 2: SUPPORT
      case 2:
        return (
          <div className="space-y-6">
            {/* Advisor Interaction */}
            <div className="space-y-3">
              <Label className="text-base font-medium">How often do you interact with your academic advisor?</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'never', label: 'Never' },
                  { value: 'once-semester', label: 'Once per semester' },
                  { value: '2-3-semester', label: '2-3 times per semester' },
                  { value: 'monthly', label: 'Monthly or more' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('advisorInteraction', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.advisorInteraction === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Network */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                How strong is your support network? ({formData.supportNetworkStrength}/10)
              </Label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.supportNetworkStrength}
                onChange={(e) => updateFormData('supportNetworkStrength', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Very Weak</span>
                <span>Very Strong</span>
              </div>
            </div>

            {/* Extracurricular */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Hours per week in extracurricular activities? ({formData.extracurricularHours} hrs)
              </Label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.extracurricularHours}
                onChange={(e) => updateFormData('extracurricularHours', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        );

      // STEP 3: PERSONAL
      case 3:
        return (
          <div className="space-y-6">
            {/* Employment */}
            <div className="space-y-3">
              <Label className="text-base font-medium">What is your current employment status?</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'not-employed', label: 'Not Employed', emoji: '📚' },
                  { value: 'part-time', label: 'Part-time', emoji: '⏰' },
                  { value: 'full-time', label: 'Full-time', emoji: '💼' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('employmentStatus', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.employmentStatus === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Stress */}
            <div className="space-y-3">
              <Label className="text-base font-medium">How much financial stress are you experiencing?</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { value: 'none', label: 'None' },
                  { value: 'low', label: 'Low' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'high', label: 'High' },
                  { value: 'very-high', label: 'Very High' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('financialStress', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.financialStress === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Career Alignment */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                How well does your program align with career goals? ({formData.careerAlignment}/10)
              </Label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.careerAlignment}
                onChange={(e) => updateFormData('careerAlignment', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Not Aligned</span>
                <span>Perfectly Aligned</span>
              </div>
            </div>
          </div>
        );

      // STEP 4: SERVICES
      case 4:
        return (
          <div className="space-y-6">
            {/* Services Used */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Which support services have you used?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'academic', label: 'Academic Advising', emoji: '📖' },
                  { value: 'career', label: 'Career Services', emoji: '💼' },
                  { value: 'counseling', label: 'Counseling', emoji: '🧠' },
                  { value: 'health', label: 'Health Services', emoji: '🏥' },
                  { value: 'financial', label: 'Financial Aid', emoji: '💰' },
                  { value: 'none', label: 'None', emoji: '❌' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const current = formData.servicesUsed;
                      if (option.value === 'none') {
                        updateFormData('servicesUsed', ['none']);
                      } else {
                        const filtered = current.filter(s => s !== 'none');
                        if (filtered.includes(option.value)) {
                          updateFormData('servicesUsed', filtered.filter(s => s !== option.value));
                        } else {
                          updateFormData('servicesUsed', [...filtered, option.value]);
                        }
                      }
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.servicesUsed.includes(option.value)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Withdrawal Consideration */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Have you considered taking a leave or withdrawing?</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: true, label: 'Yes', emoji: '😔' },
                  { value: false, label: 'No', emoji: '😊' },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => updateFormData('withdrawalConsidered', option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.withdrawalConsidered === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Withdrawal Reasons */}
            {formData.withdrawalConsidered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <Label className="text-base font-medium">What were the main reasons?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Academic difficulty',
                    'Financial challenges',
                    'Mental health',
                    'Personal/family issues',
                    'Lack of interest',
                    'Career opportunities',
                  ].map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => {
                        const current = formData.withdrawalReasons;
                        if (current.includes(reason)) {
                          updateFormData('withdrawalReasons', current.filter(r => r !== reason));
                        } else {
                          updateFormData('withdrawalReasons', [...current, reason]);
                        }
                      }}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        formData.withdrawalReasons.includes(reason)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Student Risk Assessment
          </h1>
          <p className="text-gray-600">
            Help us understand your situation to provide personalized support
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 ${i <= currentStep ? 'text-purple-600' : 'text-gray-400'}`}
              >
                <span className="text-xl">{step.icon}</span>
                <span className="hidden md:inline text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="p-6 md:p-8 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-2xl">{steps[currentStep].icon}</span>
                {steps[currentStep].title}
              </h2>
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.consentGiven}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Results'
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
