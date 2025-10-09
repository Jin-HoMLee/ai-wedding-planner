import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="AI Wedding Planner Logo" />
        <h1>AI Wedding Planner</h1>
        <p>
          Welcome to your personalized wedding planning assistant!
        </p>
        <ul>
          <li>Vendor Management</li>
          <li>Budget Tracking</li>
          <li>Guest List</li>
          <li>Timeline & Checklist</li>
          <li>AI Chatbot</li>
        </ul>
        <a
          className="App-link"
          href="https://github.com/Jin-HoMLee/ai-wedding-planner"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project on GitHub
        </a>
      </header>
    </div>
  );
}

export default App;