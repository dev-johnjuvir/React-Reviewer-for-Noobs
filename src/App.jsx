import { useState, useEffect, useRef, useMemo, useCallback, useTransition, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  // useState - Basic counter
  const [count, setCount] = useState(0)
  
  // useState - Form input
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  // useState - Toggle
  const [darkMode, setDarkMode] = useState(false)
  
  // useState - Array/List
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
  ])
  const [newTodo, setNewTodo] = useState('')
  
  // useRef - DOM reference
  const inputRef = useRef(null)
  
  // useRef - Tracking previous value
  const prevCountRef = useRef()
  
  // useEffect - Update document title
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])
  
  // useEffect - Track previous count
  useEffect(() => {
    prevCountRef.current = count
  }, [count])
  
  // useEffect - Timer example
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])
  
  // useMemo - Expensive calculation
  const expensiveValue = useMemo(() => {
    return todos.filter(todo => !todo.completed).length
  }, [todos])
  
  // useCallback - Memoized function
  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { 
        id: Date.now(), 
        text: newTodo, 
        completed: false 
      }])
      setNewTodo('')
    }
  }, [newTodo])

  // useTransition - Low priority state updates
  const [isPending, startTransition] = useTransition()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const allItems = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
  
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    
    // Mark the filtering as low priority
    startTransition(() => {
      const filtered = allItems.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 10))
    })
  }

  // useLayoutEffect - Measure DOM before paint
  const boxRef = useRef(null)
  const [boxWidth, setBoxWidth] = useState(0)
  
  useLayoutEffect(() => {
    if (boxRef.current) {
      setBoxWidth(boxRef.current.offsetWidth)
    }
  }, [count]) // Re-measure when count changes
  
  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }
  
  // Focus input using ref
  const focusInput = () => {
    inputRef.current.focus()
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>🚀 React Hooks Demo</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main>
        {/* Counter Section */}
        <section className="card">
          <h2>📊 Counter (useState)</h2>
          <p className="description">
            <code>useState</code> — Store and update values that trigger re-renders when changed.
          </p>
          <Link to="/usestate" className="learn-more-link">📖 Learn more about useState →</Link>
          <div className="demo-section">
            <p>Current count: <strong>{count}</strong></p>
            <p>Previous count: <strong>{prevCountRef.current ?? 'N/A'}</strong></p>
            <div className="button-group">
              <button onClick={() => setCount(c => c - 1)}>➖ Decrease</button>
              <button onClick={() => setCount(0)}>🔄 Reset</button>
              <button onClick={() => setCount(c => c + 1)}>➕ Increase</button>
            </div>
          </div>
        </section>

        {/* Timer Section */}
        <section className="card">
          <h2>⏱️ Timer (useEffect)</h2>
          <p className="description">
            <code>useEffect</code> — Run code after render, like timers, API calls, or subscriptions.
          </p>
          <Link to="/useeffect" className="learn-more-link">📖 Learn more about useEffect →</Link>
          <div className="demo-section">
            <p className="timer-display">{seconds}s</p>
            <div className="button-group">
              <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? '⏸️ Pause' : '▶️ Start'}
              </button>
              <button onClick={() => { setIsRunning(false); setSeconds(0) }}>
                🔄 Reset
              </button>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="card">
          <h2>📝 Form Input (useRef)</h2>
          <p className="description">
            <code>useRef</code> — Access DOM elements directly or store values without re-rendering.
          </p>
          <Link to="/useref" className="learn-more-link">📖 Learn more about useRef →</Link>
          <div className="demo-section">
            <div className="form-group">
              <input
                ref={inputRef}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={focusInput}>🎯 Focus Name Input (useRef)</button>
            </div>
            {name && <p>Hello, <strong>{name}</strong>! 👋</p>}
            {email && <p>Email: <strong>{email}</strong></p>}
          </div>
        </section>

        {/* Todo List Section */}
        <section className="card">
          <h2>✅ Todo List (useCallback + useMemo)</h2>
          <p className="description">
            <code>useCallback</code> — Cache a function so it doesn't get recreated every render.
            <code>useMemo</code> — Cache a computed value to avoid recalculating it.
          </p>
          <div className="learn-more-links">
            <Link to="/usecallback" className="learn-more-link">📖 useCallback →</Link>
            <Link to="/usememo" className="learn-more-link">📖 useMemo →</Link>
          </div>
          <div className="demo-section">
            <p>Remaining tasks: <strong>{expensiveValue}</strong> (useMemo)</p>
            <div className="todo-input">
              <input
                type="text"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <button onClick={handleAddTodo}>➕ Add</button>
            </div>
            <ul className="todo-list">
              {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <span onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? '✅' : '⬜'} {todo.text}
                  </span>
                  <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* useTransition Section */}
        <section className="card">
          <h2>🔄 Search (useTransition)</h2>
          <p className="description">
            <code>useTransition</code> — Mark state updates as low priority to keep the UI responsive.
          </p>
          <Link to="/usetransition" className="learn-more-link">📖 Learn more about useTransition →</Link>
          <div className="demo-section">
            <input
              type="text"
              placeholder="Search 10,000 items..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {isPending && <p className="pending-indicator">⏳ Updating...</p>}
            <ul className="search-results">
              {searchResults.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            {searchQuery && !isPending && searchResults.length === 0 && (
              <p>No results found</p>
            )}
          </div>
        </section>

        {/* useLayoutEffect Section */}
        <section className="card">
          <h2>📐 Measure DOM (useLayoutEffect)</h2>
          <p className="description">
            <code>useLayoutEffect</code> — Run code synchronously after DOM updates, before the browser paints.
          </p>
          <Link to="/uselayouteffect" className="learn-more-link">📖 Learn more about useLayoutEffect →</Link>
          <div className="demo-section">
            <div 
              ref={boxRef} 
              className="measure-box"
              style={{ width: `${100 + count * 20}px` }}
            >
              Resize me!
            </div>
            <p>Box width: <strong>{boxWidth}px</strong></p>
            <p>Click counter buttons above to resize the box</p>
          </div>
        </section>
      </main>

      <footer>
        <p>Built with React ⚛️ + Vite ⚡</p>
      </footer>
    </div>
  )
}

export default App
