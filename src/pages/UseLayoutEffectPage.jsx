import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

function UseLayoutEffectPage() {
  // Example 1: Measure element
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const boxRef = useRef(null)
  const [boxSize, setBoxSize] = useState(100)

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.offsetWidth)
      setHeight(boxRef.current.offsetHeight)
    }
  }, [boxSize])

  // Example 2: Tooltip positioning
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const buttonRef = useRef(null)
  const tooltipRef = useRef(null)

  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      setTooltipPos({
        top: btnRect.top - tooltipRect.height - 10,
        left: btnRect.left + (btnRect.width - tooltipRect.width) / 2
      })
    }
  }, [showTooltip])

  // Example 3: Scroll to element
  const listRef = useRef(null)
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [items])

  // Example 4: Prevent flash of wrong content
  const [theme, setTheme] = useState('light')
  const themeRef = useRef(null)

  useLayoutEffect(() => {
    if (themeRef.current) {
      themeRef.current.style.backgroundColor = theme === 'light' ? '#ffffff' : '#1a1a2e'
      themeRef.current.style.color = theme === 'light' ? '#333' : '#f0f0f0'
    }
  }, [theme])

  // Example 5: Animation starting position
  const [animate, setAnimate] = useState(false)
  const animBoxRef = useRef(null)

  useLayoutEffect(() => {
    if (animBoxRef.current) {
      // Set initial position before browser paints
      if (!animate) {
        animBoxRef.current.style.transform = 'translateX(0)'
        animBoxRef.current.style.opacity = '1'
      }
    }
  }, [animate])

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useLayoutEffect Hook</h1>
      
      <section className="intro">
        <h2>What is useLayoutEffect?</h2>
        <p>
          <code>useLayoutEffect</code> runs <strong>synchronously after DOM mutations</strong> but 
          <strong> before the browser paints</strong>. Use it when you need to measure or modify the DOM 
          before the user sees it.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`useLayoutEffect(() => {
  // Runs synchronously after DOM update
  // Before browser paints
  
  return () => {
    // Cleanup (optional)
  }
}, [dependencies])`}</code></pre>

        <h3>useEffect vs useLayoutEffect</h3>
        <table className="info-table">
          <thead>
            <tr><th>Feature</th><th>useEffect</th><th>useLayoutEffect</th></tr>
          </thead>
          <tbody>
            <tr><td>When it runs</td><td>After paint</td><td>Before paint</td></tr>
            <tr><td>Blocking</td><td>No</td><td>Yes (blocks painting)</td></tr>
            <tr><td>Use case</td><td>Data fetching, subscriptions</td><td>DOM measurements, animations</td></tr>
            <tr><td>Performance</td><td>Better for most cases</td><td>Can cause visual delays</td></tr>
          </tbody>
        </table>

        <div className="comparison">
          <div className="compare-item">
            <h4>useEffect (async)</h4>
            <pre><code>{`Render → Paint → Effect
// User might see flash`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>useLayoutEffect (sync)</h4>
            <pre><code>{`Render → Effect → Paint
// No flash visible`}</code></pre>
          </div>
        </div>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Measure DOM Elements</h3>
          <p>Get accurate dimensions before the browser paints.</p>
          <pre><code>{`const boxRef = useRef(null)
const [width, setWidth] = useState(0)

useLayoutEffect(() => {
  if (boxRef.current) {
    setWidth(boxRef.current.offsetWidth)
  }
}, [boxSize])`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div 
              ref={boxRef}
              className="measure-box"
              style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
            >
              Box
            </div>
            <p>Width: {width}px | Height: {height}px</p>
            <input
              type="range"
              min="50"
              max="200"
              value={boxSize}
              onChange={(e) => setBoxSize(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Position Tooltips</h3>
          <p>Calculate tooltip position based on button location.</p>
          <pre><code>{`useLayoutEffect(() => {
  if (showTooltip && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect()
    setTooltipPos({
      top: rect.top - tooltipHeight - 10,
      left: rect.left + rect.width / 2
    })
  }
}, [showTooltip])`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div className="tooltip-demo">
              <button
                ref={buttonRef}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                Hover me for tooltip
              </button>
              {showTooltip && (
                <div 
                  ref={tooltipRef}
                  className="tooltip"
                  style={{ position: 'fixed', ...tooltipPos }}
                >
                  I'm positioned correctly! ✨
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Auto-Scroll to Bottom</h3>
          <p>Scroll to new items immediately after they're added.</p>
          <pre><code>{`useLayoutEffect(() => {
  if (listRef.current) {
    listRef.current.scrollTop = listRef.current.scrollHeight
  }
}, [items])`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div 
              ref={listRef}
              className="scroll-list"
            >
              {items.map((item, i) => (
                <div key={i} className="scroll-item">{item}</div>
              ))}
            </div>
            <button onClick={addItem}>Add Item</button>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Prevent Flash of Wrong Style</h3>
          <p>Apply styles before the user sees incorrect colors.</p>
          <pre><code>{`useLayoutEffect(() => {
  // Apply theme BEFORE paint
  element.style.backgroundColor = 
    theme === 'light' ? '#fff' : '#1a1a2e'
}, [theme])`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div ref={themeRef} className="theme-box">
              This box changes theme without flashing!
            </div>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              Toggle Theme ({theme})
            </button>
          </div>
        </div>

        {/* Example 5 */}
        <div className="example-card">
          <h3>5. Set Animation Initial State</h3>
          <p>Set starting position before animation begins.</p>
          <pre><code>{`useLayoutEffect(() => {
  // Set initial position BEFORE paint
  element.style.transform = 'translateX(0)'
  element.style.opacity = '1'
}, [animate])`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div 
              ref={animBoxRef}
              className={`anim-box ${animate ? 'animate' : ''}`}
            >
              🚀
            </div>
            <button onClick={() => setAnimate(!animate)}>
              {animate ? 'Reset' : 'Animate'}
            </button>
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Use <code>useEffect</code> by default — only use useLayoutEffect when you <strong>see flashing</strong>.</li>
          <li>useLayoutEffect <strong>blocks the browser</strong> from painting — keep it fast!</li>
          <li>Great for <strong>measuring DOM</strong>, <strong>positioning elements</strong>, and <strong>synchronous animations</strong>.</li>
          <li>On the server (SSR), useLayoutEffect shows a warning — use useEffect or check for browser.</li>
          <li>If you're not sure which to use, start with <code>useEffect</code>.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseLayoutEffectPage
