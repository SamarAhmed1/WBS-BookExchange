/**
 * Test Page
 * Run tests in the browser to verify cart and swap functionality
 */

import { useState } from 'react';
import { runAllTests } from '../utils/tests';

export const TestPage = () => {
  const [testOutput, setTestOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState(null);

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestOutput('');
    setTestsPassed(null);

    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalAssert = console.assert;
    let logs = [];

    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push('ERROR: ' + args.join(' '));
      originalError(...args);
    };

    console.assert = (condition, message) => {
      if (!condition) {
        logs.push(`ASSERT FAILED: ${message}`);
      }
      originalAssert(condition, message);
    };

    try {
      await runAllTests();
      
      // Check if all tests passed by looking at output
      const output = logs.join('\n');
      const passedCount = (output.match(/✅/g) || []).length;
      const totalTests = 7;
      
      setTestsPassed(passedCount === totalTests);
    } catch (err) {
      logs.push('Test execution error: ' + err.message);
    }

    // Restore console
    console.log = originalLog;
    console.error = originalError;
    console.assert = originalAssert;

    setTestOutput(logs.join('\n'));
    setIsRunning(false);
  };

  return (
    <section className="section">
      <div className="sec-header">
        <div>
          <p className="sec-tag reveal">Testing</p>
          <h2 className="sec-title reveal reveal-delay-1">
            System <em>tests</em>
          </h2>
        </div>
        <p className="sec-desc reveal reveal-delay-2">
          Run automated tests to verify cart, checkout, and swap functionality
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-[rgba(139,92,246,0.2)] bg-[rgba(13,5,32,0.7)] p-6 mb-6">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="w-full px-6 py-3 rounded-full bg-[rgb(245,200,66)] text-[rgb(6,3,15)] font-semibold hover:bg-[rgb(232,160,32)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>

        {testsPassed !== null && (
          <div className={`rounded-2xl border p-4 mb-6 ${
            testsPassed
              ? 'border-green-500/50 bg-green-900/20 text-green-300'
              : 'border-red-500/50 bg-red-900/20 text-red-300'
          }`}>
            {testsPassed ? '✅ All tests passed!' : '❌ Some tests failed'}
          </div>
        )}

        {testOutput && (
          <div className="rounded-2xl border border-[rgba(139,92,246,0.2)] bg-[rgba(13,5,32,0.7)] p-6">
            <h3 className="text-white font-semibold mb-4">Test Output:</h3>
            <pre className="text-[rgba(196,165,245,0.7)] text-xs overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap break-words">
              {testOutput}
            </pre>
          </div>
        )}

        {/* Test Documentation */}
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-bold text-white">Tests Included:</h3>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">1. Add Items to Cart</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies that books can be added to cart with correct quantities
              </p>
            </div>

            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">2. Remove from Cart</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies that items can be removed from the cart correctly
              </p>
            </div>

            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">3. Create Order with Billing</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies order creation with billing address and total calculation
              </p>
            </div>

            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">4. Swap Eligibility Check</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies that system checks if user has eligible books for swap
              </p>
            </div>

            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">5. Initiate Swap</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies that swap requests are created with user book selection
              </p>
            </div>

            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">6. Full Checkout Flow</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies entire flow: add to cart → checkout → billing → order creation
              </p>
            </div>

            <div className="rounded-lg border border-[rgba(139,92,246,0.2)] bg-[rgba(22,10,53,0.6)] p-4">
              <h4 className="text-white font-semibold mb-2">7. Payment Method Selection</h4>
              <p className="text-[rgba(196,165,245,0.7)] text-sm">
                Verifies both cash and visa payment methods are supported
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
          <h4 className="text-white font-semibold mb-2">How to Use:</h4>
          <ol className="text-[rgba(196,165,245,0.7)] text-sm space-y-1 list-decimal list-inside">
            <li>Click "Run All Tests" to start the test suite</li>
            <li>Wait for tests to complete</li>
            <li>Check the output for results</li>
            <li>All tests should pass (✅) if the system is working correctly</li>
          </ol>
        </div>
      </div>
    </section>
  );
};
