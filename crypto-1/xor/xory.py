import binascii

class most_secure_algo():
	def __init__(self, secret):
		assert len(secret) == 32
		self.state = bytes(secret, 'utf-8')

	def xory(self):
		ct = [self.state[i] ^ (0x13 if i & 1 else 0x37) for i in range(len(self.state))]
		return bytearray(ct)

flag = str(open('./flag.txt', 'rb').read().strip())
cipher = most_secure_algo(flag)
out = cipher.xory()
hexout = binascii.hexlify(out)
print("Good luck!!: ", hexout)

#b'5534744062407a6854614e63437c687a444c5272446a68615e745f6708324a34'