
#~~~ hexor solve below ~~~
unhexd = binascii.unhexlify(hexform)
print("Hex to bytes: ", unhexd)
pt = bytearray()
for k in range(len(unhexd)):
	if k & 1:
		pt.append(unhexd[k] ^ 0x13)
	else:
		pt.append(unhexd[k] ^ 0x37)

print(pt)
