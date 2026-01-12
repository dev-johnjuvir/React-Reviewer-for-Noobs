import { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

// Reusable form field component
function FormField({ label, type = 'text', value, onChange }) {
  const id = useId()
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  )
}

// Reusable checkbox component
function Checkbox({ label, checked, onChange }) {
  const id = useId()
  return (
    <div className="checkbox-field">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

// Form with multiple fields
function MultiFieldForm() {
  const nameId = useId()
  const emailId = useId()
  const bioId = useId()
  
  return (
    <div className="multi-form">
      <div className="form-field">
        <label htmlFor={nameId}>Name</label>
        <input id={nameId} type="text" placeholder="Your name" />
      </div>
      <div className="form-field">
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} type="email" placeholder="you@example.com" />
      </div>
      <div className="form-field">
        <label htmlFor={bioId}>Bio</label>
        <textarea id={bioId} placeholder="Tell us about yourself" rows={2} />
      </div>
      <p className="note">IDs: {nameId}, {emailId}, {bioId}</p>
    </div>
  )
}

function UseIdPage() {
  // Example 1: Simple IDs
  const simpleId = useId()
  
  // Example 2: Reusable components
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  
  // Example 3: Multiple instances
  const [checkboxes, setCheckboxes] = useState({
    newsletter: false,
    updates: false,
    marketing: false
  })

  // Example 4: Accessibility with aria
  const descriptionId = useId()
  const errorId = useId()
  const [hasError, setHasError] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useId Hook</h1>
      
      <section className="intro">
        <h2>What is useId?</h2>
        <p>
          <code>useId</code> generates unique IDs that are stable across server and client renders. 
          It's perfect for accessibility attributes like <code>htmlFor</code> and <code>aria-*</code>.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`const id = useId()

// Use for form labels
<label htmlFor={id}>Email</label>
<input id={id} type="email" />

// Use for aria attributes
<input aria-describedby={id} />
<p id={id}>Help text here</p>`}</code></pre>
        
        <h3>Why Not Use Math.random()?</h3>
        <table className="info-table">
          <thead>
            <tr><th>Approach</th><th>SSR Safe</th><th>Stable</th><th>Unique</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Math.random()</code></td><td>❌ No</td><td>❌ No</td><td>✅ Yes</td></tr>
            <tr><td><code>let counter = 0</code></td><td>❌ No</td><td>⚠️ Maybe</td><td>✅ Yes</td></tr>
            <tr><td><code>useId()</code></td><td>✅ Yes</td><td>✅ Yes</td><td>✅ Yes</td></tr>
          </tbody>
        </table>

        <div className="comparison">
          <div className="compare-item">
            <h4>❌ Without useId</h4>
            <pre><code>{`// Hardcoded - not reusable!
<label htmlFor="email">Email</label>
<input id="email" />

// Random - breaks SSR!
const id = Math.random()`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>✅ With useId</h4>
            <pre><code>{`const id = useId()
// Unique, stable, SSR-safe!
<label htmlFor={id}>Email</label>
<input id={id} />`}</code></pre>
          </div>
        </div>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Basic Form Labels</h3>
          <p>Connect labels to inputs for better accessibility.</p>
          <pre><code>{`function Form() {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>Username</label>
      <input id={id} type="text" />
    </>
  )
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong> Click the label to focus the input
            <div className="form-field">
              <label htmlFor={simpleId}>Username</label>
              <input id={simpleId} type="text" placeholder="Click the label!" />
            </div>
            <p className="note">Generated ID: <code>{simpleId}</code></p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Reusable Form Components</h3>
          <p>Each instance gets its own unique ID automatically.</p>
          <pre><code>{`function FormField({ label, type, value, onChange }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  )
}

// Each gets unique ID!
<FormField label="Name" />
<FormField label="Email" />
<FormField label="Phone" />`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <FormField 
              label="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <FormField 
              label="Email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <FormField 
              label="Phone" 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Multiple Checkboxes</h3>
          <p>Each checkbox component gets its own unique ID.</p>
          <pre><code>{`function Checkbox({ label, checked, onChange }) {
  const id = useId()
  return (
    <div>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}`}</code></pre>
          <div className="demo">
            <strong>Preferences:</strong>
            <Checkbox 
              label="Subscribe to newsletter"
              checked={checkboxes.newsletter}
              onChange={(e) => setCheckboxes({...checkboxes, newsletter: e.target.checked})}
            />
            <Checkbox 
              label="Receive product updates"
              checked={checkboxes.updates}
              onChange={(e) => setCheckboxes({...checkboxes, updates: e.target.checked})}
            />
            <Checkbox 
              label="Marketing communications"
              checked={checkboxes.marketing}
              onChange={(e) => setCheckboxes({...checkboxes, marketing: e.target.checked})}
            />
            <p className="note">State: {JSON.stringify(checkboxes)}</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Accessibility with ARIA</h3>
          <p>Use IDs for aria-describedby and aria-errormessage.</p>
          <pre><code>{`const descriptionId = useId()
const errorId = useId()

<input
  aria-describedby={descriptionId}
  aria-errormessage={hasError ? errorId : undefined}
/>
<p id={descriptionId}>Enter your email address</p>
{hasError && <p id={errorId}>Invalid email!</p>}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <input
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-describedby={descriptionId}
              aria-errormessage={hasError ? errorId : undefined}
              aria-invalid={hasError}
              placeholder="email@example.com"
            />
            <p id={descriptionId} style={{ fontSize: '0.85rem', color: '#666' }}>
              We'll never share your email.
            </p>
            {hasError && (
              <p id={errorId} style={{ color: '#ef4444', fontSize: '0.85rem' }}>
                ⚠️ Please enter a valid email address!
              </p>
            )}
            <button onClick={() => setHasError(!hasError)}>
              Toggle Error State
            </button>
          </div>
        </div>

        {/* Example 5 */}
        <div className="example-card">
          <h3>5. Multiple Fields in One Component</h3>
          <p>Generate related IDs with a prefix pattern.</p>
          <pre><code>{`function Form() {
  const id = useId()
  return (
    <>
      <input id={id + '-name'} />
      <input id={id + '-email'} />
      <input id={id + '-phone'} />
    </>
  )
}`}</code></pre>
          <div className="demo">
            <strong>Form with related IDs:</strong>
            <MultiFieldForm />
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Use for <code>htmlFor</code>, <code>aria-describedby</code>, <code>aria-labelledby</code>, etc.</li>
          <li><strong>Don't</strong> use for list keys — use data IDs instead.</li>
          <li><strong>Don't</strong> use for CSS selectors — use classes instead.</li>
          <li>Works with <strong>Server-Side Rendering (SSR)</strong> without hydration mismatches.</li>
          <li>IDs are <strong>stable</strong> across re-renders.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseIdPage
