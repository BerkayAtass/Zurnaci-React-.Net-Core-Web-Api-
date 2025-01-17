import random
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains


email = "abc@abc.com"
password = "aa"
name = "deneme"

service = Service("./chromedriver.exe")
driver = webdriver.Chrome(service=service)
driver.maximize_window()

driver.get("http://localhost:5173/")


# ----------------------------------------------- LOGIN ------------------------------------------------
#login pop open
driver.find_element(By.ID, "authButton").click()
#fill the input
driver.find_element(By.ID, "email").send_keys(email)
driver.find_element(By.ID, "password").send_keys(password)
driver.find_element(By.ID, "agreeTerm").click()
#Login submit
driver.find_element(By.ID, "submitButton").click()

try:
    # Wait toast message
    toast_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
    )
    print("Message:", toast_message.text)
    if "Welcome to our restaurant." in toast_message.text:
        print("OK: User login successfully.")
    else:
        print("FAIL: User login failed.")
except Exception as e:
    print("Fail: Didn't find toastify message.", e)


# ----------------------------------------------- SELECT FOOD ------------------------------------------------

# Find button elements
add_buttons = driver.find_elements(By.ID, 'addButton')


# If there are fewer than 7 buttons, print an error message
if len(add_buttons) < 7:
    print(f"ERROR: Not enough buttons found. Only {len(add_buttons)} buttons are available.")
else:
    # Select 7 random buttons
  # Select 7 random buttons
    random_buttons = random.sample(add_buttons, min(len(add_buttons), 7))

    # Click each selected button
    for button in random_buttons:
        try:
            # Scroll the element into view
            driver.execute_script("arguments[0].scrollIntoView(true);", button)
            time.sleep(0.5)  # Allow time for the scroll action
            
            # Use ActionChains for better compatibility
            ActionChains(driver).move_to_element(button).click(button).perform()
            time.sleep(1)
        except Exception as e:
            print(f"Error clicking button: {e}")


# Scroll back to the top of the page
driver.execute_script("window.scrollTo(0, 0);")
time.sleep(2) 
#go to basket
driver.find_element(By.ID, "basketIcon").click()
time.sleep(2) 
# Scroll to the bottom of the page
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(2)  # Wait for 2 seconds
#proceed
driver.find_element(By.ID, "proceedButton").click()
time.sleep(2) 
#fill the input fields
driver.find_element(By.ID, "firstName").send_keys("testValue")
driver.find_element(By.ID, "lastName").send_keys("testValue")
driver.find_element(By.ID, "email").send_keys(email)
driver.find_element(By.ID, "street").send_keys("testValue")
driver.find_element(By.ID, "city").send_keys("testValue")
driver.find_element(By.ID, "state").send_keys("testValue")
driver.find_element(By.ID, "zipCode").send_keys("testValue")
driver.find_element(By.ID, "country").send_keys("testValue")
driver.find_element(By.ID, "phone").send_keys("testValue")
#proceed payment
driver.find_element(By.ID, "proceedButton").click()
time.sleep(2) 

try:
    # Wait toast message
    toast_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
    )
    print("Message:", toast_message.text)
    if "Order placed successfully!" in toast_message.text or "Your order is being processed. Please check back later." in toast_message.text:
        print("OK: User order a meal successfully.")
    else:
        print("FAIL: User order attempt failed.")
except Exception as e:
    print("Fail: Didn't find toastify message.", e)


#go to my orders
driver.find_element(By.ID, "myOrders").click()
time.sleep(2) 

try:
    
    # Find all order items
    order_items = driver.find_elements(By.CLASS_NAME, "order-item")

    # Check if there's at least one order item
    if len(order_items) > 0:
        print("Success: At least one order item is present.")
    else:
        print("Fail: No order items found.")

except Exception as e:
    print(f"Error: {e}")

# ----------------------------------------------- LOGOUT ------------------------------------------------

#logout
driver.find_element(By.ID, "authButton").click()
try:
    # Wait toast message
    toast_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
    )
    print("Message:", toast_message.text)
    if "Logged out successfully." in toast_message.text:
        print("OK: User logged successfully.")
    else:
        print("FAIL: User logged failed.")
except Exception as e:
    print("Fail: Didn't find toastify message.", e)


time.sleep(10) 