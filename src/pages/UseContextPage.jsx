import { useState, useContext, createContext } from 'react'
import { Link } from 'react-router-dom'
import './HookPage.css'

// Create contexts for examples
const ThemeContext = createContext('light')
const UserContext = createContext(null)
const LanguageContext = createContext('en')

// Child components that consume context
function ThemedButton() {
  const theme = useContext(ThemeContext)
  return (
    <button 
      style={{ 
        background: theme === 'dark' ? '#333' : '#667eea',
        color: 'white',
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '8px'
      }}
    >
      I'm a {theme} themed button!
    </button>
  )
}

function UserGreeting() {
  const user = useContext(UserContext)
  if (!user) return <p>Please log in</p>
  return <p>Welcome, <strong>{user.name}</strong>! ({user.role})</p>
}

function NestedChild() {
  const theme = useContext(ThemeContext)
  const user = useContext(UserContext)
  return (
    <div style={{ 
      padding: '1rem', 
      background: theme === 'dark' ? '#1a1a2e' : '#f0f0f0',
      color: theme === 'dark' ? '#fff' : '#333',
      borderRadius: '8px'
    }}>
      <p>🎨 Theme: {theme}</p>
      <p>👤 User: {user?.name || 'Guest'}</p>
      <p>📍 I'm deeply nested but still have access!</p>
    </div>
  )
}

function UseContextPage() {
  // Example 1: Theme context
  const [theme, setTheme] = useState('light')
  
  // Example 2: User context
  const [user, setUser] = useState(null)
  
  // Example 3: Multiple contexts
  const [language, setLanguage] = useState('en')

  const translations = {
    en: { greeting: 'Hello!', button: 'Click me' },
    es: { greeting: '¡Hola!', button: 'Haz clic' },
    fr: { greeting: 'Bonjour!', button: 'Cliquez' },
    jp: { greeting: 'こんにちは!', button: 'クリック' }
  }

  return (
    <div className="hook-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <h1>useContext Hook</h1>
      
      <section className="intro">
        <h2>What is useContext?</h2>
        <p>
          <code>useContext</code> lets you read and subscribe to context from any component, 
          without passing props through every level (prop drilling).
        </p>
        
        <h3>Syntax</h3>
        <pre><code>{`// 1. Create a context
const ThemeContext = createContext('light')

// 2. Provide value at top level
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 3. Consume anywhere below
function Button() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Click</button>
}`}</code></pre>
        
        <h3>When to Use</h3>
        <ul>
          <li><strong>Theme</strong> — Light/dark mode across the app</li>
          <li><strong>User data</strong> — Current logged-in user</li>
          <li><strong>Language</strong> — i18n/translations</li>
          <li><strong>Settings</strong> — App-wide preferences</li>
        </ul>

        <div className="comparison">
          <div className="compare-item">
            <h4>❌ Prop Drilling</h4>
            <pre><code>{`<App theme={theme}>
  <Layout theme={theme}>
    <Page theme={theme}>
      <Button theme={theme} />
    </Page>
  </Layout>
</App>`}</code></pre>
          </div>
          <div className="compare-item">
            <h4>✅ With Context</h4>
            <pre><code>{`<ThemeContext.Provider value={theme}>
  <App>
    <Layout>
      <Page>
        <Button /> {/* Just useContext! */}
      </Page>
    </Layout>
  </App>
</ThemeContext.Provider>`}</code></pre>
          </div>
        </div>
      </section>

      <section className="examples">
        <h2>Examples</h2>

        {/* Example 1 */}
        <div className="example-card">
          <h3>1. Theme Context</h3>
          <p>Share theme across components without props.</p>
          <pre><code>{`const ThemeContext = createContext('light')

function ThemedButton() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Themed!</button>
}

// Usage
<ThemeContext.Provider value={theme}>
  <ThemedButton />
</ThemeContext.Provider>`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <ThemeContext.Provider value={theme}>
              <ThemedButton />
            </ThemeContext.Provider>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              Toggle Theme ({theme})
            </button>
          </div>
        </div>

        {/* Example 2 */}
        <div className="example-card">
          <h3>2. User Context</h3>
          <p>Share user authentication state across the app.</p>
          <pre><code>{`const UserContext = createContext(null)

function UserGreeting() {
  const user = useContext(UserContext)
  if (!user) return <p>Please log in</p>
  return <p>Welcome, {user.name}!</p>
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <UserContext.Provider value={user}>
              <UserGreeting />
            </UserContext.Provider>
            <div className="button-row">
              <button onClick={() => setUser({ name: 'John', role: 'Admin' })}>
                Login as John
              </button>
              <button onClick={() => setUser({ name: 'Jane', role: 'User' })}>
                Login as Jane
              </button>
              <button onClick={() => setUser(null)}>Logout</button>
            </div>
          </div>
        </div>

        {/* Example 3 */}
        <div className="example-card">
          <h3>3. Multiple Contexts</h3>
          <p>Nest multiple providers to share different data.</p>
          <pre><code>{`<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <NestedChild />
  </UserContext.Provider>
</ThemeContext.Provider>

function NestedChild() {
  const theme = useContext(ThemeContext)
  const user = useContext(UserContext)
  // Has access to both!
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <ThemeContext.Provider value={theme}>
              <UserContext.Provider value={user}>
                <NestedChild />
              </UserContext.Provider>
            </ThemeContext.Provider>
          </div>
        </div>

        {/* Example 4 */}
        <div className="example-card">
          <h3>4. Language/i18n Context</h3>
          <p>Implement translations across your app.</p>
          <pre><code>{`const LanguageContext = createContext('en')

const translations = {
  en: { greeting: 'Hello!' },
  es: { greeting: '¡Hola!' },
}

function Greeting() {
  const lang = useContext(LanguageContext)
  return <p>{translations[lang].greeting}</p>
}`}</code></pre>
          <div className="demo">
            <strong>Try it:</strong>
            <p style={{ fontSize: '1.5rem' }}>{translations[language].greeting}</p>
            <p>Button text: {translations[language].button}</p>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="jp">🇯🇵 日本語</option>
            </select>
          </div>
        </div>
      </section>

      <section className="tips">
        <h2>💡 Tips</h2>
        <ul>
          <li>Context is great for <strong>global state</strong> that many components need.</li>
          <li>Don't overuse it — for local state, just use <code>useState</code>.</li>
          <li>Context changes trigger re-renders in <strong>all consuming components</strong>.</li>
          <li>Split contexts by concern (theme, user, settings) for better performance.</li>
          <li>Combine with <code>useReducer</code> for complex state management.</li>
        </ul>
      </section>
    </div>
  )
}

export default UseContextPage
