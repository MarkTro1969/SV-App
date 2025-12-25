import React, { useState } from 'react';
import { Button } from './ui/Button';
import { GOOGLE_REVIEW_URL } from '../constants';

interface FeedbackProps {
  onComplete: () => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ onComplete }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend API here
    console.log('Feedback submitted:', { rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-sv-light text-sv-teal rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-sv-dark mb-2">Thank You!</h2>
        <p className="text-sv-dark/60 mb-8 text-lg">Your feedback helps us provide better service.</p>
        
        {/* If rating is high, encourage Google Review */}
        {rating >= 4 && (
          <div className="w-full max-w-sm bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <p className="text-sv-dark font-medium mb-3">Happy with our service? We'd love a Google Review!</p>
            <a 
              href={GOOGLE_REVIEW_URL} 
              target="_blank" 
              rel="noreferrer"
            >
              <Button fullWidth className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 shadow-sm">
                <span className="flex items-center gap-2">
                   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                   Rate us on Google
                </span>
              </Button>
            </a>
          </div>
        )}

        <Button onClick={onComplete} variant={rating >= 4 ? "ghost" : "primary"} fullWidth>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto animate-fade-in">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-sv-dark mb-2 text-center">Rate Your Experience</h2>
        <p className="text-sv-dark/60 mb-8 text-center">How would you rate the support you received?</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-2 transition-transform hover:scale-110 focus:outline-none ${
                  star <= rating ? 'text-sv-teal' : 'text-slate-200'
                }`}
                aria-label={`Rate ${star} stars`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <div className="text-center text-sm font-medium text-slate-400 h-6">
            {rating === 1 && "Very Dissatisfied"}
            {rating === 2 && "Dissatisfied"}
            {rating === 3 && "Neutral"}
            {rating === 4 && "Satisfied"}
            {rating === 5 && "Very Satisfied"}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-sv-dark mb-2">
              Additional Feedback (Optional)
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sv-dark focus:ring-2 focus:ring-sv-teal focus:outline-none resize-none"
              placeholder="Tell us what we did well or how we can improve..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={rating === 0} fullWidth>
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
};