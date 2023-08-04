# News App - Formative 3.1 by Deepak

This news application has been created in React and Vite using various dependencies to expand on the base functionality of a React application, In order to use the application you will need to create and .env file in the root of the project and input a VITE_NEWS_API_KEY: Here is an example of the .env file that needs to be created

```env
VITE_NEWS_API_KEY = "YOUR_API_KEY"
```

# Dependencies Used

Throughout the application I have used multiple Dependencies here is a list of those dependencies.

- React-Router-Dom - This dep allows me to create a single page application where the content of the page changes depending on what page is selected.

```javascript
<Router>
  <Navigation />
  <Routes>
    <Route path="/articles/:id" element={<NewsArticles />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NewsArticles />} />
  </Routes>
</Router>
```

- Axios - I have used Axios to make HTTP requests to an external API (News API) in order to fetch articles for your news application

```javascript
 axios
      .get(apiUrl)
      .then((response) => {
        setTimeout(() => {
          setArticles(response.data.articles);
          setLoading(false); // Set loading to false after articles are set
        }, 5000); // 5000 milliseconds = 5 seconds
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with an error status code (4xx or 5xx)
          const statusCode = error.response.status;
          const responseData = error.response.data;

          if (statusCode === 429) {
            console.error(
              "Error 429: Too Many Requests - You have exceeded your rate limit."
            );
            apiKey = import.meta.env.VITE_BACKUP_API_KEY;
          } else if (statusCode === 401) {
            console.error(
              "Error 401: Unauthorized - Your API key is invalid or missing."
            );
          } else if (statusCode === 426) {
            console.error(
              "Error 426: Upgrade Required - Your API key needs to be upgraded."
            );
          } else {
            console.error(`Error ${statusCode}: ${responseData.message}`);
          }
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("Request error:", error.request);
        } else {
          // Something else happened in making the request
          console.error("Other error:", error.message);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request completes (either success or error)
      });
  }, [activeFilter, searchTerm]);
```

- React-Loader-Spinner - This has been used to create a loading spinner while axios is fetching the newsapi data to show.

```javascript

.finally(() => {
        setLoading(false); // Set loading to false when request completes (either success or error)
      });

{loading ? (
          // Display the Loader component while loading is true
          <Puff
            ariaLabel="puff"
            color="white"
            height="100"
            width="100"
            radius={1}
            wrapperClass=""
            wrapperStyle={{}}
            visible={true}
          />
        ) : (
```

# Project Tools

This project was developed using Visual studio code, ES-Lint terminal tools and react dev tool on chrome. These tools helped with finding and mitigating errors, ensuring that the API was being called correctly and to make sure that all systems were functioning as expected. The console is used to show specific error codes that may show up and the direct meaning of what they are.

# Project Mockup

Here is the mockup for the project where I created a layout and design that I wanted to stick to. The design is meant to be modern but simple therefore going for darker more muted colours appealed to me more.

![MockupImage](https://i.imgur.com/3Yf6zAX.png)

# Note from the Developer

This project was created by Deepak for Yoobee Collages Web and UX Design Course. this was made for Formative 3.1 and was used to create a better understanding of the intricacies for React and React application development
