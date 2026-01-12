import { useState } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

function UseStatePage() {
  // Example 1: Simple counter
  const [count, setCount] = useState(0)
  
  // Example 2: String state
  const [text, setText] = useState('')
  
  // Example 3: Boolean toggle
  const [isOn, setIsOn] = useState(false)
  
  // Example 4: Object state
  const [user, setUser] = useState({ name: '', age: 0 })
  
  // Example 5: Array state
  const [items, setItems] = useState(['Apple', 'Banana'])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem])
      setNewItem('')
    }
  }

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useState Hook</h1>
      
      <section className="intro">
        <h2>What is useState?</h2>
        <p>
          <code>useState</code> is a React Hook that lets you add a state variable to your component. 
          When the state changes, React re-renders the component to reflect the new value.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`const [state, setState] = useState(initialValue)`}</code></pre>
        
        <ul>
          <li><strong>state</strong> — The current value</li>
          <li><strong>setState</strong> — Function to update the value</li>
          <li><strong>initialValue</strong> — The starting value (can be any type)</li>
        </ul>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Counter (Number)</h3>
          <p>Track a simple numeric value.</p>
          <pre><code>{`const [count, setCount] = useState(0)

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Text Input (String)</h3>
          <p>Store user input from a text field.</p>
          <pre><code>{`const [text, setText] = useState('')

<input 
  value={text} 
  onChange={(e) => setText(e.target.value)} 
/>`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <input 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Type something..."
            />
            <p>You typed: {text || '(nothing yet)'}</p>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Toggle (Boolean)</h3>
          <p>Switch between true and false states.</p>
          <pre><code>{`const [isOn, setIsOn] = useState(false)

<button onClick={() => setIsOn(!isOn)}>
  {isOn ? 'ON' : 'OFF'}
</button>`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <button onClick={() => setIsOn(!isOn)}>
              {isOn ? '🟢 ON' : '🔴 OFF'}
            </button>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Form Data (Object)</h3>
          <p>Store multiple related values in an object.</p>
          <pre><code>{`const [user, setUser] = useState({ name: '', age: 0 })

// Update one property (spread the rest)
setUser({ ...user, name: 'John' })`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <input 
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input 
              type="number"
              placeholder="Age"
              value={user.age || ''}
              onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
            />
            <p>User: {user.name || '?'}, Age: {user.age || '?'}</p>
          </div>
        </div>

        {/* Example 5 */}
        <div className="example-card">
          <h3>5. List (Array)</h3>
          <p>Manage a dynamic list of items.</p>
          <pre><code>{`const [items, setItems] = useState(['Apple', 'Banana'])

// Add item
setItems([...items, 'Orange'])

// Remove item
setItems(items.filter(item => item !== 'Apple'))`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div className="inline-form">
              <input 
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add item..."
              />
              <button onClick={addItem}>Add</button>
            </div>
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  {item} 
                  <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}>×</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>State updates are <strong>asynchronous</strong> — you won't see the new value immediately after calling setState.</li>
          <li>Use the <strong>functional form</strong> when the new state depends on the previous: <code>setCount(prev =&gt; prev + 1)</code></li>
          <li>Never mutate state directly — always create a <strong>new object/array</strong>.</li>
          <li>Keep state as <strong>simple as possible</strong> — split complex state into multiple useState calls.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseStatePage
