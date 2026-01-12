import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

function UseEffectPage() {
  // Example 1: Run on every render
  const [count, setCount] = useState(0)
  
  // Example 2: Run once on mount
  const [mounted, setMounted] = useState(false)
  
  // Example 3: Run when dependency changes
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  
  // Example 4: Cleanup (timer)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  // Example 5: Fetch data
  const [userId, setUserId] = useState(1)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Effect 1: Update document title
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  // Effect 2: Run once on mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Effect 3: React to name changes
  useEffect(() => {
    if (name) {
      setGreeting(`Hello, ${name}!`)
    } else {
      setGreeting('')
    }
  }, [name])

  // Effect 4: Timer with cleanup
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  // Effect 5: Fetch user data
  useEffect(() => {
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [userId])

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useEffect Hook</h1>
      
      <section className="intro">
        <h2>What is useEffect?</h2>
        <p>
          <code>useEffect</code> lets you perform side effects in your components — things like 
          fetching data, setting up timers, updating the DOM, or subscribing to events.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`useEffect(() => {
  // Side effect code here
  
  return () => {
    // Cleanup code (optional)
  }
}, [dependencies])`}</code></pre>
        
        <ul>
          <li><strong>Effect function</strong> — Runs after render</li>
          <li><strong>Cleanup function</strong> — Runs before the next effect or on unmount</li>
          <li><strong>Dependencies array</strong> — Controls when the effect runs</li>
        </ul>

        <h3>Dependency Array Behavior</h3>
        <table className="info-table">
          <thead>
            <tr><th>Dependencies</th><th>When it runs</th></tr>
          </thead>
          <tbody>
            <tr><td><code>undefined</code></td><td>After every render</td></tr>
            <tr><td><code>[]</code></td><td>Only once on mount</td></tr>
            <tr><td><code>[a, b]</code></td><td>When a or b changes</td></tr>
          </tbody>
        </table>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Update Document Title</h3>
          <p>React to state changes and update something outside React.</p>
          <pre><code>{`useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong> Check your browser tab title!
            <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Run Once on Mount</h3>
          <p>Initialize something when the component first appears.</p>
          <pre><code>{`useEffect(() => {
  console.log('Component mounted!')
  // Fetch initial data, set up listeners, etc.
}, []) // Empty array = run once`}</code></pre>
          <div className="demo">
            <strong>Status:</strong> {mounted ? '✅ Component has mounted!' : '⏳ Mounting...'}
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. React to Changes</h3>
          <p>Run code whenever a specific value changes.</p>
          <pre><code>{`useEffect(() => {
  if (name) {
    setGreeting(\`Hello, \${name}!\`)
  }
}, [name]) // Runs when 'name' changes`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />
            <p>{greeting || 'Type your name above'}</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Cleanup (Timer)</h3>
          <p>Clean up resources like timers or subscriptions to prevent memory leaks.</p>
          <pre><code>{`useEffect(() => {
  let interval = null
  if (isRunning) {
    interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }
  
  // Cleanup: clear interval when effect re-runs or unmounts
  return () => clearInterval(interval)
}, [isRunning])`}</code></pre>
          <div className="demo">
            <strong>Timer:</strong> {seconds}s
            <button onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? '⏸️ Pause' : '▶️ Start'}
            </button>
            <button onClick={() => { setIsRunning(false); setSeconds(0) }}>
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Example 5 */}
        <div className="example-card">
          <h3>5. Fetch Data</h3>
          <p>Load data from an API when the component mounts or when a parameter changes.</p>
          <pre><code>{`useEffect(() => {
  setLoading(true)
  fetch(\`https://api.example.com/users/\${userId}\`)
    .then(res => res.json())
    .then(data => {
      setUserData(data)
      setLoading(false)
    })
}, [userId]) // Re-fetch when userId changes`}</code></pre>
          <div className="demo">
            <strong>Select User ID:</strong>
            <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map(id => (
                <option key={id} value={id}>User {id}</option>
              ))}
            </select>
            {loading ? (
              <p>Loading...</p>
            ) : userData ? (
              <p>👤 {userData.name} — {userData.email}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Always include <strong>all values</strong> used inside the effect in the dependency array.</li>
          <li>Return a <strong>cleanup function</strong> for timers, event listeners, and subscriptions.</li>
          <li>Effects run <strong>after</strong> the render is committed to the screen.</li>
          <li>For data fetching, consider using libraries like <strong>React Query</strong> or <strong>SWR</strong>.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseEffectPage
