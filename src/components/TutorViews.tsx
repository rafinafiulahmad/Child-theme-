import React, { useState } from 'react';
import type { RouteId } from '../utils/themeHelpers';

export function CourseView({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <main id="main" className="site-main aga-tutor-shell" role="main">
      <div className="aga-container">
        <header className="aga-archive-header">
          <span className="aga-badge" style={{ marginBottom: '10px' }}>
            Executive Certificate
          </span>
          <h1 className="aga-archive-header__title">AI Governance &amp; Public Policy Practicum</h1>
          <p className="aga-archive-header__desc">
            6-week cohort programme for policymakers, legal scholars, and technical leads in Bangladesh and South Asia.
          </p>
        </header>

        <div className="aga-lesson-module">
          <div className="aga-lesson-module__header">Module 1: Foundations of Algorithmic Accountability</div>
          <div style={{ padding: '18px' }}>
            <p>Lesson 1.1: Statutory Authorities &amp; Risk-Tiered Procurement</p>
            <div className="aga-progress-bar" aria-label="Module progress 65%">
              <div className="aga-progress-bar__fill" style={{ width: '65%' }} />
            </div>
          </div>
        </div>

        <section className="aga-quiz-card" aria-labelledby="aga-quiz-heading">
          <h2 id="aga-quiz-heading">Module Check: Impact Assessments</h2>
          <p>Which instrument establishes ex-ante public accountability prior to agency deployment?</p>
          <div role="radiogroup" aria-label="Quiz options">
            {[
              'Algorithmic Impact Assessment (AIA) with vendor audit clauses',
              'Post-hoc internal memorandum without public notice',
              'Unreviewed third-party marketing certification',
            ].map((option, idx) => (
              <label key={option} className="aga-quiz-option">
                <input
                  type="radio"
                  name="aga-quiz"
                  checked={selectedAnswer === idx}
                  onChange={() => setSelectedAnswer(idx)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button type="button" className="aga-button aga-button--primary" onClick={() => onNavigate('dashboard')}>
              Open Student Dashboard &rarr;
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export function DashboardView({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <main id="main" className="site-main aga-tutor-shell" role="main">
      <div className="aga-container">
        <header className="aga-archive-header">
          <h1 className="aga-archive-header__title">Learning Dashboard</h1>
          <p className="aga-archive-header__desc">Track enrolled programmes, lesson completion, and certificates.</p>
        </header>

        <div style={{ display: 'grid', gap: '24px' }}>
          <aside className="aga-tutor-sidebar" aria-label="Student dashboard menu">
            <ul className="aga-tutor-sidebar__list">
              <li>
                <a
                  href="#dashboard"
                  className="aga-tutor-sidebar__link is-active"
                  onClick={(e) => e.preventDefault()}
                >
                  Enrolled Courses
                </a>
              </li>
              <li>
                <a
                  href="#course"
                  className="aga-tutor-sidebar__link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('course');
                  }}
                >
                  Active Course Curriculum
                </a>
              </li>
              <li>
                <a
                  href="#reading-library"
                  className="aga-tutor-sidebar__link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('reading-library');
                  }}
                >
                  Assigned Reading Library
                </a>
              </li>
            </ul>
          </aside>

          <article className="aga-course-card" style={{ padding: '20px' }}>
            <h2>AI Governance &amp; Public Policy Practicum</h2>
            <p className="aga-tabular" style={{ color: 'var(--aga-muted)' }}>
              Progress: 65% completed (4 of 6 modules)
            </p>
            <div className="aga-progress-bar" style={{ marginBottom: '18px' }}>
              <div className="aga-progress-bar__fill" style={{ width: '65%' }} />
            </div>
            <div>
              <button type="button" className="aga-button aga-button--primary" onClick={() => onNavigate('course')}>
                Continue Learning
              </button>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
