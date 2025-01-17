import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


email = "ww@ww.com"
oldPassword = "ww"
newPassword = "aa"

service = Service("./chromedriver.exe")
driver = webdriver.Chrome(service=service)
driver.maximize_window()

driver.get("http://localhost:5173/")


# ----------------------------------------------- LOGIN ------------------------------------------------
#login pop open
driver.find_element(By.ID, "authButton").click()
#fill the input
driver.find_element(By.ID, "email").send_keys(email)
driver.find_element(By.ID, "password").send_keys(oldPassword)
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

# ----------------------------------------------- RESET PASSWORD ------------------------------------------------

#go to reset password page
driver.find_element(By.ID, "profile").click()
#fill the input
driver.find_element(By.ID, "oldPassword").send_keys(oldPassword)
driver.find_element(By.ID, "newPassword1").send_keys(newPassword)
driver.find_element(By.ID, "newPassword2").send_keys(newPassword)
driver.find_element(By.ID, "submitPass").click()

try:
    # Wait toast message
    toast_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
    )
    print("Message:", toast_message.text)
    if "Password updated successfully!" in toast_message.text:
        print("OK: User password updated successfully.")
    else:
        print("FAIL: User password updated attempt failed.")
except Exception as e:
    print("Fail: Didn't find toastify message.", e)


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
    
# ----------------------------------------------- LOGIN WITH NEW PASSWORD------------------------------------------------
#login pop open
driver.find_element(By.ID, "authButton").click()
#fill the input
driver.find_element(By.ID, "email").send_keys(email)
driver.find_element(By.ID, "password").send_keys(newPassword)
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



time.sleep(10) 