import { useState, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

// Child component that re-renders when props change
const ExpensiveChild = memo(({ onClick, label }) => {
  console.log(`${label} rendered`)
  return (
    <button onClick={onClick} className="child-button">
      {label} (check console)
    </button>
  )
})

function UseCallbackPage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [items, setItems] = useState(['Item 1', 'Item 2'])

  // Without useCallback - recreated every render
  const handleClickBad = () => {
    console.log('Bad click!')
  }

  // With useCallback - only recreated when dependencies change
  const handleClickGood = useCallback(() => {
    console.log('Good click!')
  }, [])

  // useCallback with dependencies
  const handleAddItem = useCallback(() => {
    if (text.trim()) {
      setItems(prev => [...prev, text])
      setText('')
    }
  }, [text])

  // useCallback with count dependency
  const logCount = useCallback(() => {
    console.log('Current count:', count)
    alert(`Count is: ${count}`)
  }, [count])

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useCallback Hook</h1>
      
      <section className="intro">
        <h2>What is useCallback?</h2>
        <p>
          <code>useCallback</code> memoizes a function so it's not recreated on every render. 
          This is useful when passing callbacks to optimized child components.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`const memoizedFn = useCallback(() => {
  // function body
}, [dependencies])`}</code></pre>
        
        <h3>When to Use</h3>
        <ul>
          <li>Passing callbacks to <strong>memoized child components</strong> (React.memo)</li>
          <li>When a function is a <strong>dependency</strong> of another hook</li>
          <li>When creating functions in a <strong>render loop</strong></li>
        </ul>

        <div className="comparison">
          <div className="compare-item">
            <h4>❌ Without useCallback</h4>
            <pre><code>{`const handleClick = () => {
  doSomething()
}
// New function every render!`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>✅ With useCallback</h4>
            <pre><code>{`const handleClick = useCallback(() => {
  doSomething()
}, [])
// Same function reference`}</code></pre>
          </div>
        </div>

        <h3>useCallback vs useMemo</h3>
        <p>Both memoize things, but they cache different things:</p>
        <table className="info-table">
          <thead>
            <tr><th>Feature</th><th>useCallback</th><th>useMemo</th></tr>
          </thead>
          <tbody>
            <tr><td>What it caches</td><td><strong>Function itself</strong></td><td><strong>Return value</strong> (any type)</td></tr>
            <tr><td>Returns</td><td>The memoized function</td><td>The computed result</td></tr>
            <tr><td>Use case</td><td>Stable function references</td><td>Expensive calculations</td></tr>
            <tr><td>Example</td><td>onClick handlers</td><td>Filtering a large list</td></tr>
          </tbody>
        </table>
        <pre><code>{`// useCallback — caches the FUNCTION itself
const handleClick = useCallback(() => {
  console.log(count)
}, [count])
// handleClick = () => console.log(count)

// useMemo — caches the RESULT of calling the function
const doubled = useMemo(() => {
  return count * 2
}, [count])
// doubled = 10 (if count is 5)

// They're equivalent:
useCallback(fn, deps) === useMemo(() => fn, deps)`}</code></pre>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Prevent Unnecessary Child Re-renders</h3>
          <p>Memoized children only re-render when their props actually change.</p>
          <pre><code>{`const handleClickBad = () => { /* new every render */ }

const handleClickGood = useCallback(() => {
  /* same reference */
}, [])

<MemoizedChild onClick={handleClickGood} />`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong> Open console, then click "Increment Count"
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
            <div className="child-buttons">
              <ExpensiveChild onClick={handleClickBad} label="❌ Without useCallback" />
              <ExpensiveChild onClick={handleClickGood} label="✅ With useCallback" />
            </div>
            <p className="note">The bad button re-renders every time count changes!</p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Callback with Dependencies</h3>
          <p>When your function needs access to state, add it to dependencies.</p>
          <pre><code>{`const [text, setText] = useState('')

const handleAddItem = useCallback(() => {
  if (text.trim()) {
    setItems(prev => [...prev, text])
    setText('')
  }
}, [text]) // Re-create when text changes`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div className="inline-form">
              <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="New item..."
              />
              <button onClick={handleAddItem}>Add Item</button>
            </div>
            <ul>
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Using Current State in Callback</h3>
          <p>Access the latest state value when the callback is called.</p>
          <pre><code>{`const [count, setCount] = useState(0)

const logCount = useCallback(() => {
  console.log('Count:', count)
}, [count]) // Updates when count changes`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={logCount}>Log Current Count</button>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Event Handlers in Lists</h3>
          <p>Create stable handlers for items in a list.</p>
          <pre><code>{`const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id))
}, [])

// In JSX:
{items.map(item => (
  <button onClick={() => handleDelete(item.id)}>
    Delete {item.name}
  </button>
))}`}</code></pre>
          <div className="demo">
            <strong>Pattern:</strong> The handler itself is memoized, but you pass the ID when calling it.
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Don't overuse it — only use when passing to <strong>memoized components</strong> or as a hook dependency.</li>
          <li>Include <strong>all values</strong> used inside the callback in the dependency array.</li>
          <li>Combine with <code>React.memo()</code> for child components to see benefits.</li>
          <li>For state updates, use the <strong>functional form</strong>: <code>setState(prev =&gt; ...)</code> to avoid adding state as a dependency.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseCallbackPage
