import pyautogui,time,pyperclip

p = pyautogui
pip = pyperclip
t = time.sleep(2)

# PRIMERO POSICIONARSE SOBRE EL SQL, EJECUTAR Y POSICIONARSE EN LA FILA 1
# SEGUNDO IR A LA PANTALLA DE COMPLETAR FIGURITAS EN CHROME
# EJECUTAR EL PROGRAMA PYTHON

p.hotkey('alt','tab')
t
p.hotkey('ctrl','home')
t
p.click(276,1057)
t
p.click(365,673)
t
p.hotkey('ctrl','c')
time.sleep(0.5)
p.hotkey('alt','tab')
t
p.click(529,473)
t
p.hotkey('ctrl','v')

for i in range (1,36):
    time.sleep(0.5)
    p.hotkey('alt','tab')
    t
    p.press('down')
    t
    p.hotkey('ctrl','c')
    time.sleep(0.5)
    p.hotkey('alt','tab')
    t
    p.click(529,473)
    time.sleep(0.5)
    for x in range (0,i):
        p.press('tab')
        t
    t
    p.hotkey('ctrl','v')