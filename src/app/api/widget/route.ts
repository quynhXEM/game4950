export async function GET() {
    const widgetHTML = `
      <div id="time-widget-root"></div>
      <script>
        (function() {
          const root = document.getElementById('time-widget-root');
          if (root) {
            const updateWidget = () => {
              const now = new Date();
              const time = now.toLocaleTimeString();
              root.innerHTML = \`
                <div style="border: 1px solid #ccc; padding: 10px; border-radius: 8px; text-align: center; width: 200px; font-family: Arial, sans-serif;">
                  <h3 style="margin: 0;">Current Time</h3>
                  <p style="font-size: 24px; margin: 5px 0;">\${time}</p>
                </div>
              \`;
            };
  
            updateWidget();
            setInterval(updateWidget, 1000);
          }
        })();
      </script>
    `;
    return new Response(widgetHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
  