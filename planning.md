////////////////////////////////////////////////////////////////////////////////
FRONT END DESIGN
////////////////////////////////////////////////////////////////////////////////

PAGES:
1. Index.html
   A simple title page with title, small description, and a button leading to 
   the market. ✅

2. Market.html
   The page that makes the API calls. Has a nav bar. Displayed in grid, where 
   each box contains the mineral, information on price, and a buy button.

3. Buy.html
   A page where it displays the mineral that you clicked on with purchase 
   prices. It contains a form for you to fill information that will be checked 
   in the backend. 

4. 404.html
   A page to be displayed when an incorrect url is put in under the website 
   domain.

5. Holdings.html
   Shows the users current holdings and the price that they pruchased the 
   minerals at.

////////////////////////////////////////////////////////////////////////////////
TO DO
////////////////////////////////////////////////////////////////////////////////
Work on form, make sure it prevents default behaviour and then makes the API 
put request to send the buy order. Make server handle that request and save 
it to data. When submitted, hide the form and display a confirmation text

After that need to make the holdings page to display the purchases made by 
a name that is inputted.