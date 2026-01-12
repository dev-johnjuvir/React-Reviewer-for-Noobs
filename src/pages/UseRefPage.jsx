import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

function UseRefPage() {
  // Example 1: DOM reference
  const inputRef = useRef(null)
  
  // Example 2: Store previous value
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()
  
  // Example 3: Mutable value (doesn't cause re-render)
  const renderCount = useRef(0)
  const [, forceUpdate] = useState({})
  
  // Example 4: Store interval ID
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  
  // Example 5: Video player reference
  const videoRef = useRef(null)

  // Track previous count
  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  // Increment render count (doesn't cause re-render)
  renderCount.current += 1

  // Timer with ref to store interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const stopTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useRef Hook</h1>
      
      <section className="intro">
        <h2>What is useRef?</h2>
        <p>
          <code>useRef</code> returns a mutable ref object that persists across renders. 
          Unlike state, changing a ref does <strong>not</strong> trigger a re-render.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`const ref = useRef(initialValue)

// Access the value
ref.current

// Update the value (no re-render!)
ref.current = newValue`}</code></pre>
        
        <h3>Two Main Use Cases</h3>
        <ul>
          <li><strong>DOM Access</strong> — Get a reference to a DOM element</li>
          <li><strong>Persistent Values</strong> — Store values that don't need to trigger re-renders</li>
        </ul>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Focus an Input (DOM Reference)</h3>
          <p>Access DOM elements directly without using document.querySelector.</p>
          <pre><code>{`const inputRef = useRef(null)

// Attach to element
<input ref={inputRef} />

// Use the reference
const focusInput = () => {
  inputRef.current.focus()
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <input ref={inputRef} placeholder="Click the button to focus me" />
            <button onClick={() => inputRef.current.focus()}>🎯 Focus Input</button>
            <button onClick={() => inputRef.current.select()}>📋 Select All</button>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Track Previous Value</h3>
          <p>Remember what a value was during the last render.</p>
          <pre><code>{`const [count, setCount] = useState(0)
const prevCountRef = useRef()

useEffect(() => {
  prevCountRef.current = count
}, [count])

// prevCountRef.current holds the previous value`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <p>Current: {count} | Previous: {prevCountRef.current ?? 'N/A'}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={() => setCount(c => c - 1)}>Decrement</button>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Count Renders (Without Causing Re-render)</h3>
          <p>Track something without triggering a re-render when it changes.</p>
          <pre><code>{`const renderCount = useRef(0)

// This runs every render but doesn't cause another render
renderCount.current += 1

// Unlike useState, updating ref.current doesn't re-render!`}</code></pre>
          <div className="demo">
            <strong>Render count:</strong> {renderCount.current}
            <button onClick={() => forceUpdate({})}>Force Re-render</button>
            <p className="note">Notice: The count updates without useState!</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Store Timer/Interval ID</h3>
          <p>Keep a reference to a timer so you can clear it later.</p>
          <pre><code>{`const intervalRef = useRef(null)

useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }
  return () => clearInterval(intervalRef.current)
}, [isRunning])

// Stop from anywhere
const stopTimer = () => {
  clearInterval(intervalRef.current)
}`}</code></pre>
          <div className="demo">
            <strong>Timer:</strong> {seconds}s
            <button onClick={() => setIsRunning(true)}>▶️ Start</button>
            <button onClick={stopTimer}>⏹️ Stop</button>
            <button onClick={() => setSeconds(0)}>🔄 Reset</button>
          </div>
        </div>

        {/* Example 5 */}
        <div className="example-card">
          <h3>5. Control Media Elements</h3>
          <p>Control video/audio playback programmatically.</p>
          <pre><code>{`const videoRef = useRef(null)

<video ref={videoRef} src="video.mp4" />

// Control playback
videoRef.current.play()
videoRef.current.pause()
videoRef.current.currentTime = 0`}</code></pre>
          <div className="demo">
            <strong>Video Controls:</strong>
            <video 
              ref={videoRef} 
              width="100%" 
              style={{ maxWidth: '300px', borderRadius: '8px' }}
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
            <div className="button-row">
              <button onClick={() => videoRef.current?.play()}>▶️ Play</button>
              <button onClick={() => videoRef.current?.pause()}>⏸️ Pause</button>
              <button onClick={() => { if(videoRef.current) videoRef.current.currentTime = 0 }}>⏮️ Restart</button>
            </div>
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Refs are perfect for values that <strong>don't affect rendering</strong>.</li>
          <li>Don't read or write <code>ref.current</code> during rendering — only in effects or event handlers.</li>
          <li>Use refs for <strong>imperative actions</strong> like focusing, scrolling, or playing media.</li>
          <li>If you need the UI to update when a value changes, use <strong>useState</strong> instead.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseRefPage
