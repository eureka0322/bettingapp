import time
import datetime
import requests
import csv
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://livedream0322:helloworld@cluster0.u7lyd63.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.betting_db
sports_collection = db.mc_sports411s

def save_csv(array, filename):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(array)
    print("Array saved as CSV successfully.")

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument('--disable-blink-features=AutomationControlled')
chrome_options.add_argument("--disable-dev-shm-using")
chrome_options.add_argument("--remote-debugging-port=9222")
chrome_browser = webdriver.Chrome(options = chrome_options)

sports_list = ["FOOTBALL", "BASKETBALL", "BASEBALL"]
csv_data = []

current_date = datetime.datetime.now()
date_string = current_date.strftime("%b %d")

try:
    chrome_browser.get('https://be.sports411.ag/')

    username = chrome_browser.find_element(By.ID,'account')
    username.clear()
    username.send_keys('15058')

    password = chrome_browser.find_element(By.ID, 'password')
    password.clear()
    password.send_keys('Game1234')

    login_button = chrome_browser.find_element(By.CSS_SELECTOR, 'input.login') #chrome_browser.find_element(By.ID, 'submit')
    login_button.click()
    time.sleep(15)

    html = chrome_browser.page_source
    html_content = BeautifulSoup(html, "html.parser")

    sidebar_content = html_content.find("div", {"id": "leagues"})

    for sport_item in sports_list :
        nav_item = chrome_browser.find_element(By.XPATH, '//a[@cat="{}"]'.format(sport_item))
        nav_item.click()
        time.sleep(2)
        new_html = chrome_browser.page_source
        new_html_content = BeautifulSoup(new_html, "html.parser")
        
        ul_id = sidebar_content.find("a", attrs={'cat': sport_item}).get('aria-controls')
        league_content = new_html_content.find("div", {"id": "leagues"}).find("div", {"id": ul_id}).find("ul").find_all("li", recursive = False)
        
        league_cats = []
        league_dic = {}
        for league in league_content :
            league_cat = league.find("a").get("cat")
            league_cats.append(league_cat)
            league_dic[league_cat] = league
        
        for league_cat in league_cats :
            time.sleep(3)
            league_category_class = league_dic[league_cat].find("div").get("class")
            league_category = league_dic[league_cat].find("a")
            # Extract relevant information from the Beautiful Soup object
            tag_name = league_category.name
            text = league_category.text
            attributes = league_category.attrs

            # Construct an XPath expression based on the extracted information
            xpath = f"//{tag_name}[text()='{text}']"

            # Add attribute filters to the XPath, if applicable
            for attr_name, attr_value in attributes.items():
                if isinstance(attr_value, list):
                    attr_value = " ".join(attr_value)
                xpath += f"[contains(@{attr_name}, '{attr_value}')]"
                
            # Locate the corresponding Selenium element using the constructed XPath
            league_category_element = chrome_browser.find_element(By.XPATH, xpath)

            if 'show' not in league_category_class :
                league_category_element.click()
                time.sleep(2)

finally:
   chrome_browser.quit()