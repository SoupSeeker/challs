from pwn import *

conn = remote("localhost", 4000)

content = conn.recvall()


conn.interactive()
