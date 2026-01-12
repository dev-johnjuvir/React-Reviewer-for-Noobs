import { useState, useReducer } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

// Example 1: Counter reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

// Example 2: Todo reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload, completed: false }]
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
    case 'delete':
      return state.filter(todo => todo.id !== action.payload)
    case 'clear_completed':
      return state.filter(todo => !todo.completed)
    default:
      return state
  }
}

// Example 3: Form reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value }
    case 'reset':
      return { name: '', email: '', message: '' }
    case 'submit':
      return { ...state, submitted: true }
    default:
      return state
  }
}

// Example 4: Shopping cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    case 'remove':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }
    case 'clear':
      return { ...state, items: [] }
    default:
      return state
  }
}

function UseReducerPage() {
  // Example 1: Counter
  const [counterState, dispatchCounter] = useReducer(counterReducer, { count: 0 })
  const [customValue, setCustomValue] = useState(10)

  // Example 2: Todo list
  const [todos, dispatchTodos] = useReducer(todoReducer, [
    { id: 1, text: 'Learn useReducer', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')

  // Example 3: Form
  const [form, dispatchForm] = useReducer(formReducer, {
    name: '',
    email: '',
    message: '',
    submitted: false
  })

  // Example 4: Shopping cart
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [] })
  const products = [
    { id: 1, name: '🍎 Apple', price: 1.5 },
    { id: 2, name: '🍕 Pizza', price: 12 },
    { id: 3, name: '☕ Coffee', price: 4 }
  ]
  const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useReducer Hook</h1>
      
      <section className="intro">
        <h2>What is useReducer?</h2>
        <p>
          <code>useReducer</code> is an alternative to <code>useState</code> for managing 
          complex state logic. It uses a reducer function (like Redux) to update state.
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`// Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// Use in component
const [state, dispatch] = useReducer(reducer, initialState)

// Dispatch actions
dispatch({ type: 'increment' })
dispatch({ type: 'set', payload: 100 })`}</code></pre>
        
        <h3>useState vs useReducer</h3>
        <table className="info-table">
          <thead>
            <tr><th>Feature</th><th>useState</th><th>useReducer</th></tr>
          </thead>
          <tbody>
            <tr><td>Best for</td><td>Simple state</td><td>Complex state logic</td></tr>
            <tr><td>Updates</td><td>Direct value</td><td>Action objects</td></tr>
            <tr><td>Related state</td><td>Multiple calls</td><td>Single reducer</td></tr>
            <tr><td>Testing</td><td>Harder</td><td>Easier (pure function)</td></tr>
          </tbody>
        </table>

        <div className="comparison">
          <div className="compare-item">
            <h4>useState</h4>
            <pre><code>{`const [count, setCount] = useState(0)
setCount(count + 1)
setCount(prev => prev - 1)`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>useReducer</h4>
            <pre><code>{`const [state, dispatch] = useReducer(reducer, {count: 0})
dispatch({ type: 'increment' })
dispatch({ type: 'decrement' })`}</code></pre>
          </div>
        </div>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Counter with Actions</h3>
          <p>Simple counter with multiple action types.</p>
          <pre><code>{`function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset': return { count: 0 }
    case 'set': return { count: action.payload }
  }
}

dispatch({ type: 'increment' })
dispatch({ type: 'set', payload: 100 })`}</code></pre>
          <div className="demo">
            <strong>Count: {counterState.count}</strong>
            <div className="button-row">
              <button onClick={() => dispatchCounter({ type: 'decrement' })}>➖</button>
              <button onClick={() => dispatchCounter({ type: 'reset' })}>🔄 Reset</button>
              <button onClick={() => dispatchCounter({ type: 'increment' })}>➕</button>
            </div>
            <div className="inline-form">
              <input
                type="number"
                value={customValue}
                onChange={(e) => setCustomValue(Number(e.target.value))}
              />
              <button onClick={() => dispatchCounter({ type: 'set', payload: customValue })}>
                Set to {customValue}
              </button>
            </div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. Todo List</h3>
          <p>Manage a list with add, toggle, and delete actions.</p>
          <pre><code>{`function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload }]
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload 
          ? { ...todo, completed: !todo.completed } 
          : todo
      )
    case 'delete':
      return state.filter(todo => todo.id !== action.payload)
  }
}`}</code></pre>
          <div className="demo">
            <div className="inline-form">
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New todo..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newTodo.trim()) {
                    dispatchTodos({ type: 'add', payload: newTodo })
                    setNewTodo('')
                  }
                }}
              />
              <button onClick={() => {
                if (newTodo.trim()) {
                  dispatchTodos({ type: 'add', payload: newTodo })
                  setNewTodo('')
                }
              }}>Add</button>
            </div>
            <ul className="todo-list-demo">
              {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <span onClick={() => dispatchTodos({ type: 'toggle', payload: todo.id })}>
                    {todo.completed ? '✅' : '⬜'} {todo.text}
                  </span>
                  <button onClick={() => dispatchTodos({ type: 'delete', payload: todo.id })}>🗑️</button>
                </li>
              ))}
            </ul>
            <button onClick={() => dispatchTodos({ type: 'clear_completed' })}>
              Clear Completed
            </button>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Form State</h3>
          <p>Handle multiple form fields with a single reducer.</p>
          <pre><code>{`function formReducer(state, action) {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value }
    case 'reset':
      return { name: '', email: '', message: '' }
  }
}

dispatch({ type: 'field', field: 'name', value: 'John' })`}</code></pre>
          <div className="demo">
            <div className="form-group">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => dispatchForm({ type: 'field', field: 'name', value: e.target.value })}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => dispatchForm({ type: 'field', field: 'email', value: e.target.value })}
              />
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => dispatchForm({ type: 'field', field: 'message', value: e.target.value })}
                rows={2}
              />
            </div>
            <div className="button-row">
              <button onClick={() => dispatchForm({ type: 'submit' })}>Submit</button>
              <button onClick={() => dispatchForm({ type: 'reset' })}>Reset</button>
            </div>
            {form.submitted && <p>✅ Form submitted!</p>}
            <p className="note">State: {JSON.stringify(form)}</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Shopping Cart</h3>
          <p>Complex state with nested updates.</p>
          <pre><code>{`function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      // Check if item exists, increment qty
      // Otherwise add new item
    case 'remove':
      return { items: state.items.filter(...) }
    case 'clear':
      return { items: [] }
  }
}`}</code></pre>
          <div className="demo">
            <strong>Products:</strong>
            <div className="products-grid">
              {products.map(product => (
                <button 
                  key={product.id}
                  onClick={() => dispatchCart({ type: 'add', payload: product })}
                >
                  {product.name} - ${product.price}
                </button>
              ))}
            </div>
            <strong>Cart ({cart.items.length} items):</strong>
            {cart.items.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
                <ul>
                  {cart.items.map(item => (
                    <li key={item.id}>
                      {item.name} x{item.qty} = ${(item.price * item.qty).toFixed(2)}
                      <button onClick={() => dispatchCart({ type: 'remove', payload: item.id })}>×</button>
                    </li>
                  ))}
                </ul>
                <p><strong>Total: ${cartTotal.toFixed(2)}</strong></p>
                <button onClick={() => dispatchCart({ type: 'clear' })}>Clear Cart</button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Use <code>useReducer</code> when state logic is <strong>complex</strong> or involves multiple sub-values.</li>
          <li>Reducers must be <strong>pure functions</strong> — no side effects!</li>
          <li>Action types are usually <strong>strings</strong> describing what happened.</li>
          <li>Use <code>payload</code> to pass data with actions.</li>
          <li>Combine with <code>useContext</code> for app-wide state management.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseReducerPage
