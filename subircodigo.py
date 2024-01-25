import pyautogui
import pyperclip
import time

p=pyautogui

codigo="8018190030839"

p.hotkey("alt","tab")

for x in range (0,554):
    time.sleep(0.5)
    pyperclip.copy(codigo)
    p.hotkey("ctrl","v")
    time.sleep(0.5)
    p.press("tab")
    time.sleep(0.5)
    p.press("tab")
    time.sleep(0.5)
    p.press("tab")
    time.sleep(0.5)
    p.press("tab")
    time.sleep(0.5)
    p.press("tab")
    time.sleep(0.5)
    p.press("tab")
    time.sleep(0.5)

