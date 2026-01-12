import { useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

function UseTransitionPage() {
  // Example 1: Basic transition
  const [isPending1, startTransition1] = useTransition()
  const [count, setCount] = useState(0)
  const [slowCount, setSlowCount] = useState(0)

  const handleClick = () => {
    setCount(c => c + 1) // High priority - updates immediately
    
    startTransition1(() => {
      setSlowCount(c => c + 1) // Low priority - can be interrupted
    })
  }

  // Example 2: Search with large list
  const [isPending2, startTransition2] = useTransition()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  const allItems = Array.from({ length: 20000 }, (_, i) => ({
    id: i,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4]
  }))

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value) // High priority - keep input responsive
    
    startTransition2(() => {
      // Low priority - filter large list
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filtered.slice(0, 20))
    })
  }

  // Example 3: Tab switching
  const [isPending3, startTransition3] = useTransition()
  const [activeTab, setActiveTab] = useState('home')

  const handleTabChange = (tab) => {
    startTransition3(() => {
      setActiveTab(tab)
    })
  }

  const tabContent = {
    home: 'Welcome to the Home tab! This content loads smoothly.',
    profile: 'Profile information with lots of data...',
    settings: 'Settings panel with many options...'
  }

  // Example 4: Filtering with multiple criteria
  const [isPending4, startTransition4] = useTransition()
  const [filters, setFilters] = useState({ minPrice: 0, category: 'all' })
  const [filteredProducts, setFilteredProducts] = useState([])

  const products = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 10,
    category: ['Tech', 'Fashion', 'Food'][i % 3]
  }))

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    startTransition4(() => {
      const result = products.filter(p => {
        if (newFilters.category !== 'all' && p.category !== newFilters.category) return false
        if (p.price < newFilters.minPrice) return false
        return true
      })
      setFilteredProducts(result.slice(0, 10))
    })
  }

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useTransition Hook</h1>
      
      <section className="intro">
        <h2>What is useTransition?</h2>
        <p>
          <code>useTransition</code> lets you mark certain state updates as <strong>low priority</strong>, 
          keeping the UI responsive while heavy updates happen in the background.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`const [isPending, startTransition] = useTransition()

// Wrap low-priority updates
startTransition(() => {
  setExpensiveState(newValue)
})`}</code></pre>
        
        <ul>
          <li><strong>isPending</strong> — Boolean, true while the transition is in progress</li>
          <li><strong>startTransition</strong> — Function to wrap low-priority updates</li>
        </ul>

        <h3>When to Use</h3>
        <ul>
          <li><strong>Search/Filter</strong> — Keep typing responsive while filtering large lists</li>
          <li><strong>Tab Switching</strong> — Show old content until new content is ready</li>
          <li><strong>Heavy Computations</strong> — Defer expensive re-renders</li>
        </ul>

        <div className="comparison">
          <div className="compare-item">
            <h4>❌ Without useTransition</h4>
            <pre><code>{`// UI freezes during update
setHeavyState(value)`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>✅ With useTransition</h4>
            <pre><code>{`// UI stays responsive
startTransition(() => {
  setHeavyState(value)
})`}</code></pre>
          </div>
        </div>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Priority Updates</h3>
          <p>High-priority updates happen immediately, low-priority can be deferred.</p>
          <pre><code>{`const [isPending, startTransition] = useTransition()

const handleClick = () => {
  setCount(c => c + 1) // Immediate
  
  startTransition(() => {
    setSlowCount(c => c + 1) // Can be deferred
  })
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <p>Immediate count: {count}</p>
            <p>Transition count: {slowCount} {isPending1 && '⏳'}</p>
            <button onClick={handleClick}>Update Both</button>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Responsive Search</h3>
          <p>Keep the input responsive while filtering 20,000 items.</p>
          <pre><code>{`const handleSearch = (e) => {
  const value = e.target.value
  setQuery(value) // Keep input responsive
  
  startTransition(() => {
    // Filter happens in background
    const filtered = items.filter(...)
    setResults(filtered)
  })
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong> Search through 20,000 products
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search products..."
            />
            {isPending2 && <p className="pending">⏳ Searching...</p>}
            <ul>
              {results.map(item => (
                <li key={item.id}>{item.name} — {item.category}</li>
              ))}
            </ul>
            {query && !isPending2 && results.length === 0 && <p>No results</p>}
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Tab Switching</h3>
          <p>Show a loading state while switching between tabs with heavy content.</p>
          <pre><code>{`const handleTabChange = (tab) => {
  startTransition(() => {
    setActiveTab(tab)
  })
}

// Show pending state
{isPending && <span>Loading...</span>}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div className="tab-buttons">
              {['home', 'profile', 'settings'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={activeTab === tab ? 'active' : ''}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {isPending3 ? '⏳ Loading...' : tabContent[activeTab]}
            </div>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Multi-Filter</h3>
          <p>Apply multiple filters without blocking the UI.</p>
          <pre><code>{`const handleFilterChange = (key, value) => {
  setFilters({ ...filters, [key]: value })
  
  startTransition(() => {
    const result = products.filter(...)
    setFilteredProducts(result)
  })
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <div className="filter-controls">
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Tech">Tech</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
              </select>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
              />
              <span>Min: ${filters.minPrice}</span>
            </div>
            {isPending4 && <p className="pending">⏳ Filtering...</p>}
            <ul>
              {filteredProducts.map(p => (
                <li key={p.id}>{p.name} — ${p.price} ({p.category})</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Only wrap <strong>state updates</strong> that cause slow re-renders.</li>
          <li>The function passed to startTransition must be <strong>synchronous</strong>.</li>
          <li>Use <code>isPending</code> to show a <strong>loading indicator</strong>.</li>
          <li>Transitions can be <strong>interrupted</strong> by higher-priority updates.</li>
          <li>For async operations (like fetch), use <strong>Suspense</strong> instead.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseTransitionPage
