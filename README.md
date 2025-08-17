Features

Member Directory – Members can log in and view information about other members in the Business Network.

Visitor Management – Add visitors by scanning their business cards. The app uses Tesseract.js (OCR) to extract text, and OpenAI GPT-3.5 Turbo to identify key details (name, company, email, phone).

Search Functionality – Search for members by name using a built-in search filter.

Deployment

The app is deployed at: https://bni-app.onrender.com/

Installation (PWA on iOS/Android)

1. Open the deployment link above in your mobile browser.

2. Tap the share/upload icon in the top-right corner.

3. Select “Add to Home Screen”.

4. The app will now appear on your home screen like a native app.

Design Decisions

OCR (Tesseract.js) – Chosen for native JavaScript support (works seamlessly with React) and reliable text extraction from varied sources.

Database (MongoDB) – Selected for handling unstructured and semi-structured data efficiently.

Testing (Keyword Extraction with GPT-3.5 Turbo)
Input Text	Expected Output	Result
""	,,,	✅
Arunav Perumandla \n randomCompany \n arunavp05@hotmail.com 919-555-5555	Arunav Perumandla, randomCompany, arunavp05@hotmail.com, 919-555-5555	✅
Arunav Perumandla arunavp05@hotmail.com 919-555-5555	Arunav Perumandla,, arunavp05@hotmail.com, 919-555-5555	✅
Arunav Perumandla 919-555-5555	Arunav Perumandla,,,919-555-5555	✅
randomCompany \n arunavp05@hotmail.com 919-555-5555	,randomCompany,arunavp05@hotmail.com,919-555-5555	✅
Arunav Perumandla \n arperuma@ncsu.edu \n arunavpm6@gmail.com \n HelloWorld	Arunav Perumandla, HelloWorld, arperuma@ncsu.edu,	❌ (Model struggled with overlapping categories)

🔎 Note: In cases where the model misclassifies text, the app allows users to manually validate and correct extracted information before saving it to the Visitors Table.
