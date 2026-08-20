import React, { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import { v4 as uuidv4 } from 'uuid';
import './App.css'; // You will put your CSS mismatch styling here

// Initialize PostHog (Session Replay and Rage Clicks are recorded automatically)
posthog.init('YOUR_POSTHOG_PROJECT_API_KEY', { api_host: 'https://app.posthog.com' });

function App() {
  const [condition, setCondition] = useState(null);
  const [participantId, setParticipantId] = useState('');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    // 1. Generate unique ID and randomly assign condition
    const id = uuidv4();
    const assignedCondition = Math.random() < 0.5 ? 'Dark_Pattern' : 'Bright_Pattern';
    
    setParticipantId(id);
    setCondition(assignedCondition);
    setStartTime(Date.now());

    // 2. Identify user in PostHog
    posthog.identify(id);
    posthog.people.set({ condition: assignedCondition });
  }, []);

  const handleDecision = (decision) => {
    const reactionTime = Date.now() - startTime;

    // 1. Fire Custom Telemetry Event to PostHog
    posthog.capture('cookie_interaction', {
      decision: decision,
      time_ms: reactionTime,
      condition: condition,
      task_success: decision === 'Reject_All'
    });

    // 2. Redirect to NASA-TLX Survey
    // Paste your pre-filled link here, and replace 'REPLACE_ID' and 'REPLACE_CONDITION' with the variables
    const surveyUrl = `https://docs.google.com/forms/d/e/1FAIpQLSf0YR_TlX3LO2gEQhtlFGILwfcd0Bital0WtOnFRSiYNRJHcg/viewform?usp=pp_url&entry.1232941259=REPLACE_ID&entry.517250482=REPLACE_CONDITION`;
    
    // Redirect the user
    window.location.href = surveyUrl;
  };

  if (!condition) return <div>Loading experiment...</div>;

  return (
    <div className="App">
      {/* Mock Content */}
      <div className="article blur-background">
        <h1>The Future of Artificial Intelligence in 2027</h1>
        <p>Please read this article, but you MUST decline all non-essential cookies first.</p>
      </div>

      {/* Condition A: Interface Interference */}
      {condition === 'Dark_Pattern' && (
        <div className="cookie-overlay">
          <div className="cookie-banner">
            <h2>We Value Your Privacy</h2>
            <button className="btn-massive-green" onClick={() => handleDecision('Accept_All')}>
              ACCEPT ALL COOKIES
            </button>
            <button className="btn-tiny-grey" onClick={() => handleDecision('Manage_Options')}>
              manage options
            </button>
          </div>
        </div>
      )}

      {/* Condition B: Privacy Nutrition Label */}
      {condition === 'Bright_Pattern' && (
        <div className="cookie-overlay">
          <div className="cookie-banner">
            <h2>Cookie Preferences</h2>
            <div className="button-group-equal">
              <button className="btn-neutral" onClick={() => handleDecision('Accept_All')}>Accept</button>
              <button className="btn-neutral" onClick={() => handleDecision('Reject_All')}>Reject All</button>
              <button className="btn-neutral" onClick={() => handleDecision('Manage_Options')}>Manage</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;