import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

function UseMemoPage() {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [filterEven, setFilterEven] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const users = [
    { id: 1, name: 'Alice', age: 25, role: 'Developer' },
    { id: 2, name: 'Bob', age: 30, role: 'Designer' },
    { id: 3, name: 'Charlie', age: 35, role: 'Developer' },
    { id: 4, name: 'Diana', age: 28, role: 'Manager' },
    { id: 5, name: 'Eve', age: 32, role: 'Developer' },
  ]

  // Example 1: Expensive calculation (simulated)
  const expensiveValue = useMemo(() => {
    console.log('💰 Expensive calculation running...')
    // Simulate expensive operation
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += i
    }
    return result
  }, []) // Empty deps = calculate once

  // Example 2: Filtered list
  const filteredNumbers = useMemo(() => {
    console.log('🔢 Filtering numbers...')
    return filterEven 
      ? numbers.filter(n => n % 2 === 0)
      : numbers
  }, [numbers, filterEven])

  // Example 3: Search filter
  const filteredUsers = useMemo(() => {
    console.log('👥 Filtering users...')
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Example 4: Computed statistics
  const stats = useMemo(() => {
    console.log('📊 Computing stats...')
    return {
      total: numbers.length,
      sum: numbers.reduce((a, b) => a + b, 0),
      average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
      max: Math.max(...numbers),
      min: Math.min(...numbers),
    }
  }, [numbers])

  // Example 5: Sorted list
  const [sortBy, setSortBy] = useState('name')
  const sortedUsers = useMemo(() => {
    console.log('🔀 Sorting users...')
    return [...users].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'age') return a.age - b.age
      return a.role.localeCompare(b.role)
    })
  }, [sortBy])

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useMemo Hook</h1>
      
      <section className="intro">
        <h2>What is useMemo?</h2>
        <p>
          <code>useMemo</code> caches the result of a calculation between re-renders. 
          It only recalculates when its dependencies change.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`const cachedValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])`}</code></pre>
        
        <h3>When to Use</h3>
        <ul>
          <li><strong>Expensive calculations</strong> — sorting, filtering, complex math</li>
          <li><strong>Referential equality</strong> — when passing objects/arrays to memoized children</li>
          <li><strong>Derived state</strong> — values computed from other state</li>
        </ul>

        <div className="comparison">
          <div className="compare-item">
            <h4>❌ Without useMemo</h4>
            <pre><code>{`// Runs EVERY render
const sorted = items.sort(...)`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>✅ With useMemo</h4>
            <pre><code>{`// Only runs when items change
const sorted = useMemo(() => 
  items.sort(...), [items])`}</code></pre>
          </div>
        </div>

        <h3>useMemo vs useCallback</h3>
        <p>These hooks are similar but cache different things:</p>
        <table className="info-table">
          <thead>
            <tr><th>Feature</th><th>useMemo</th><th>useCallback</th></tr>
          </thead>
          <tbody>
            <tr><td>What it caches</td><td><strong>Return value</strong> (any type)</td><td><strong>Function itself</strong></td></tr>
            <tr><td>Returns</td><td>The computed result</td><td>The memoized function</td></tr>
            <tr><td>Use case</td><td>Expensive calculations</td><td>Stable function references</td></tr>
            <tr><td>Example</td><td>Filtering a large list</td><td>onClick handlers for children</td></tr>
          </tbody>
        </table>
        <pre><code>{`// useMemo — caches the RESULT of calling the function
const sortedList = useMemo(() => items.sort(), [items])
// sortedList = [sorted array]

// useCallback — caches the FUNCTION itself
const handleSort = useCallback(() => items.sort(), [items])
// handleSort = () => items.sort()

// They're equivalent:
useCallback(fn, deps) === useMemo(() => fn, deps)`}</code></pre>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Expensive Calculation</h3>
          <p>Cache heavy computations so they don't run on every render.</p>
          <pre><code>{`const expensiveValue = useMemo(() => {
  // This only runs once (empty deps)
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += i
  }
  return result
}, [])`}</code></pre>
          <div className="demo">
            <strong>Result:</strong> {expensiveValue.toLocaleString()}
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>
              Increment (won't recalculate)
            </button>
            <p className="note">Check console — calculation only runs once!</p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Filtered List</h3>
          <p>Only re-filter when the source data or filter changes.</p>
          <pre><code>{`const filteredNumbers = useMemo(() => {
  return filterEven 
    ? numbers.filter(n => n % 2 === 0)
    : numbers
}, [numbers, filterEven])`}</code></pre>
          <div className="demo">
            <strong>Numbers:</strong> {filteredNumbers.join(', ')}
            <label>
              <input 
                type="checkbox"
                checked={filterEven}
                onChange={(e) => setFilterEven(e.target.checked)}
              />
              Show only even numbers
            </label>
            <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
              Add Number
            </button>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Search Filter</h3>
          <p>Filter a list based on user input.</p>
          <pre><code>{`const filteredUsers = useMemo(() => {
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm)
  )
}, [searchTerm])`}</code></pre>
          <div className="demo">
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
            />
            <ul>
              {filteredUsers.map(user => (
                <li key={user.id}>{user.name} — {user.role}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Computed Statistics</h3>
          <p>Derive multiple values from a dataset.</p>
          <pre><code>{`const stats = useMemo(() => ({
  total: numbers.length,
  sum: numbers.reduce((a, b) => a + b, 0),
  average: sum / numbers.length,
  max: Math.max(...numbers),
  min: Math.min(...numbers),
}), [numbers])`}</code></pre>
          <div className="demo">
            <strong>Stats for [{numbers.slice(0, 5).join(', ')}...]:</strong>
            <ul>
              <li>Total: {stats.total}</li>
              <li>Sum: {stats.sum}</li>
              <li>Average: {stats.average.toFixed(2)}</li>
              <li>Max: {stats.max}</li>
              <li>Min: {stats.min}</li>
            </ul>
          </div>
        </div>

        {/* Example 5 */}
        <div className="example-card">
          <h3>5. Sorted List</h3>
          <p>Sort only when the sort criteria changes.</p>
          <pre><code>{`const sortedUsers = useMemo(() => {
  return [...users].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'age') return a.age - b.age
    return 0
  })
}, [sortBy])`}</code></pre>
          <div className="demo">
            <strong>Sort by:</strong>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="role">Role</option>
            </select>
            <ul>
              {sortedUsers.map(user => (
                <li key={user.id}>
                  {user.name} ({user.age}) — {user.role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Don't overuse it — only memoize <strong>expensive calculations</strong>.</li>
          <li><code>useMemo</code> caches <strong>values</strong>, <code>useCallback</code> caches <strong>functions</strong>.</li>
          <li>Include <strong>all dependencies</strong> — values used in the calculation.</li>
          <li>React may discard cached values — don't rely on it for correctness, only performance.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseMemoPage
