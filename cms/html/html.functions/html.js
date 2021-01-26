exports.main = ({ accountId }, sendResponse) => {
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Hello World</title>
        <meta name="description" content="Meta description">
        <meta name="author" content="Meta Author">
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
    </html>
  `;

  sendResponse({ headers: { 'Content-Type': 'text/html' },  body: html, statusCode: 200 });
};
