import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import random
import string
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def random_letters():
    letters = random.sample(string.ascii_lowercase, 5)  
    return ''.join(letters) 

randomString = random_letters()
email = randomString + "@gmail.com"
password = "aa"
name = "deneme"

service = Service("./chromedriver.exe")
driver = webdriver.Chrome(service=service)
driver.maximize_window()

driver.get("http://localhost:5173/")

# ----------------------------------------------- REGISTER ------------------------------------------------
#login pop open
driver.find_element(By.ID, "authButton").click()
#go to register
driver.find_element(By.ID, "registerLink").click()
#fill the input
driver.find_element(By.ID, "name").send_keys(name)
driver.find_element(By.ID, "email").send_keys(email)
driver.find_element(By.ID, "password").send_keys(password)
driver.find_element(By.ID, "agreeTerm").click()
#register submit
driver.find_element(By.ID, "submitButton").click()

try:
    # Wait toast message
    toast_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
    )
    print("Message:", toast_message.text)
    if "Account created successfully." in toast_message.text:
        print("OK: User registered successfully.")
    else:
        print("FAIL: User registration failed.")
except Exception as e:
    print("Fail: Didn't find toastify message.", e)

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