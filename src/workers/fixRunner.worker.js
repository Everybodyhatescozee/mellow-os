// Simple worker to execute user scripts and forward console logs/errors to the main thread.
// Runs in a Worker environment; keeps things off the main thread and isolates DOM access.

self.onmessage = function (e) {
  const { type, code } = e.data || {}
  if (type !== 'run') return

  try {
    // Provide a basic console shim that posts logs back to the main thread.
    const consoleShim = {
      log: function (...args) {
        try {
          self.postMessage({ type: 'log', payload: args.map(a => String(a)).join(' ') })
        } catch (err) {
          // ignore
        }
      }
    }

    // Execute the code. Note: still executes arbitrary JS but inside a Worker.
    const fn = new Function('console', code)
    fn(consoleShim)

    // Notify completion
    self.postMessage({ type: 'done' })
  } catch (err) {
    self.postMessage({ type: 'error', error: err?.message || String(err) })
  }
}
