import subprocess
from random import randint
user = input('Nome do usuario: ')
while len(user) < 3 :
    print('Nome invalido, nome deve ter pelo menos 3 letras')
    user = input('Nome do usuario: ')

gate = subprocess.check_output('cmd /c "cd ;/ & ipconfig /all')
gate = gate.split()
gateway = ''
posGate = 0
posIP = 0
info = []

for k in gate:
    if k in ['.',',']:
        pass
    else:
        info.append(k.decode("ISO-8859-1"))
for i in info:
    if i == '.':
        index = info.index(i)
        info.remove(info[index])
    elif i == ':':
        index = info.index(i)
        info.remove(info[index])
    else:
        pass
for u in info:
    if u == 'Gateway':
        posGate = info.index(u)
        newInfo = info[310:410]
        for j in newInfo:
            if j.startswith('172.'):
                x = j
                posIP = newInfo.index(x)
                break
        posFinal = posIP+posGate
        print(info[posFinal])

a = open(f'{user}{randint(0,100)}MAC.txt','x',encoding='utf-8')
for el in info:
    if el == '.':
        pass
    elif el == ',':
        pass
    else:
        a.write(f'{el} \n')
a.close()