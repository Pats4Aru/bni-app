- Progressive Web App that allows members to login and view information about other members in the Business Network.
- Members can add Visitors into the group by scanning their business card. The application will then use OCR to scan the card for text and use OpenAI to detect relevant keywords.
- Members can also search for other members by name using the search filter.

- PWA App is deployed at the following url - https://bni-app.onrender.com/.
- To download via IOS/Android. Open the application via the deployment link above. Then, click the upload icon in the top right and click add to home screen. This will add the application as an actual application to your mobile home screen. 

Design Decisions

- Decided on Tesseract.js for OCR, due to native javascript support which is compatible with our React application. Also, picked due to ease of use, and for the library's ability to extract text from different types of text sources seamlessly.
- Decided on MongoDB for the database due to the lack of relational data, and also for its simplicity when it comes to making queries. Also, has in built scaling options to account for larger amounts of data and web traffic. 
- Picked OpenAI model 3.5 turbo for extraction of relevant keywords, due to its cheap cost, and ability to extract relevant keywords effectivly for given text. I tested, OpenAI 3.5 turbo with many different types of text body's and testing among all of them its ability to extract the name, phone, email, and company of a user. The model performed well with 95% accuracy, which gave me confidence that it could be a cheap but also effective option.

- Tests ran with ChatGPT 3.5 Turbo model

- "" (empty body of text) -> ,,,, (expected result)
- "Arunav Perumandla \n randomCompany \n arunavp05@hotmail.com 919-555-5555" -> Arunav Perumandla, randomCompany, arunavp05@hotmail.com, 919-555-5555 (expected result)
- "Arunav Perumandla arunavp05@hotmail.com 919-555-5555" -> Arunav Perumandla,, arunavp05@hotmail.com, 919-555-5555 (expected result)
- "Arunav Perumandla  919-555-5555" -> Arunav Perumandla,,,919-555-5555 (expected result)
- "randomCompany \n arunavp05@hotmail.com 919-555-5555" -> ,randomCompany,arunavp05@hotmail.com,919-555-5555 (expected result)
- "Arunav Perumandla \n arperuma@ncsu.edu \n arunavpm6@gmail.com \n HelloWorld" -> Arunav Perumandla,HelloWorld,arperuma@ncsu.edu, (failed test)

- In the case of the failing tests, it seemed that the model did struggle with processing words, that fit under multiple categories. Luckily, the application allows for the user to validate the information extracted to ensure that the correct information is displayed in the Visitors Table. 
