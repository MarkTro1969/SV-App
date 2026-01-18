import React, { useState } from 'react';
import { SUPPORT_PHONE, WEBSITE } from '../constants';

interface ServiceMembershipProps {
  onBack?: () => void;
}

export const ServiceMembership: React.FC<ServiceMembershipProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'limited',
      name: 'Limited',
      price: 0,
      priceLabel: 'Free',
      subtitle: '30-day warranty period',
      featured: false,
      features: [
        { text: 'Monday-Friday 9am-4pm', included: true },
        { text: 'Call response within 24hrs', included: true },
        { text: 'Remote Service: $75/30min', included: true, note: true },
        { text: 'In-Home Service: $195/hr', included: true, note: true },
        { text: 'Subject to scheduling availability', included: true },
        { text: 'Weekend & After-Hours Support', included: false },
        { text: 'Guaranteed 1-Hour Response', included: false },
        { text: 'Annual System Tune-up', included: false },
      ]
    },
    {
      id: 'elite',
      name: 'Elite Plus',
      price: 190,
      priceLabel: '$190/mo',
      subtitle: 'Most Popular',
      featured: true,
      features: [
        { text: 'Monday-Friday 9am-9pm', included: true },
        { text: 'Weekend Remote Support', included: true },
        { text: 'Guaranteed 1-Hour Response', included: true },
        { text: 'FREE Remote Service', included: true, highlight: true },
        { text: 'In-Home Service: $125/hr', included: true },
        { text: 'Same or Next Day Scheduling', included: true },
        { text: 'Annual Visit & Full Tune-up', included: true },
        { text: 'Priority Support Queue', included: true },
      ]
    },
    {
      id: 'custom',
      name: 'Custom',
      price: null,
      priceLabel: 'Contact Us',
      subtitle: 'Ultimate peace of mind',
      featured: false,
      features: [
        { text: '7 Days/Week: 9am-9pm', included: true },
        { text: 'Guaranteed 1-Hour Response', included: true },
        { text: 'FREE Remote Service', included: true, highlight: true },
        { text: 'FREE In-Home Service', included: true, highlight: true },
        { text: 'Weekend Remote Support', included: true },
        { text: 'Same or Next Day Scheduling', included: true },
        { text: 'Never Pay for Service', included: true, highlight: true },
        { text: 'Fully Customizable', included: true },
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === 'elite') {
      window.open(`https://${WEBSITE}/pricing-plans/list`, '_blank');
    } else if (planId === 'custom') {
      window.location.href = `tel:${SUPPORT_PHONE.replace(/-/g, '')}`;
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto animate-fade-in bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-sv-dark">Service Memberships</h2>
        <p className="text-sv-dark/60 mt-2">Get priority support & save on service calls</p>
      </div>

      {/* After-hours callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-amber-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800">Need support after 4pm or on weekends?</p>
            <p className="text-xs text-amber-700 mt-1">After-hours and weekend support is available exclusively to Elite Plus and Custom members.</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border-2 overflow-hidden transition-all ${
              plan.featured
                ? 'border-sv-teal bg-white shadow-lg shadow-sv-teal/10'
                : 'border-slate-200 bg-white'
            }`}
          >
            {plan.featured && (
              <div className="bg-sv-teal text-white text-xs font-bold uppercase tracking-wider py-1.5 text-center">
                Most Popular
              </div>
            )}

            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${plan.featured ? 'text-sv-teal' : 'text-sv-dark'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{plan.subtitle}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${plan.featured ? 'text-sv-teal' : 'text-sv-dark'}`}>
                    {plan.priceLabel}
                  </div>
                  {plan.price !== null && plan.price > 0 && (
                    <p className="text-xs text-slate-400">per month</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                className="w-full flex items-center justify-between py-2 text-sm text-sv-teal font-medium"
              >
                <span>{selectedPlan === plan.id ? 'Hide details' : 'View details'}</span>
                <svg
                  className={`h-5 w-5 transition-transform ${selectedPlan === plan.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {selectedPlan === plan.id && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.included ? (
                        <svg className={`h-5 w-5 flex-shrink-0 ${feature.highlight ? 'text-green-500' : 'text-sv-teal'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 flex-shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={`text-sm ${
                        !feature.included ? 'text-slate-400 line-through' :
                        feature.highlight ? 'text-green-700 font-semibold' :
                        feature.note ? 'text-slate-500' : 'text-sv-dark'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {plan.id !== 'limited' && (
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full mt-4 py-3 rounded-xl font-bold transition-all ${
                    plan.featured
                      ? 'bg-sv-teal text-white hover:bg-sv-teal-dark active:scale-[0.98]'
                      : 'bg-slate-100 text-sv-dark hover:bg-slate-200 active:scale-[0.98]'
                  }`}
                >
                  {plan.id === 'elite' ? 'Get Elite Plus' : 'Call to Customize'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400 mb-3">Questions about memberships?</p>
        <a
          href={`tel:${SUPPORT_PHONE.replace(/-/g, '')}`}
          className="inline-flex items-center gap-2 text-sv-teal font-semibold text-sm hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {SUPPORT_PHONE} (Option 2)
        </a>
      </div>
    </div>
  );
};
