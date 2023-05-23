import base64

message = "CSUSM{93tt1n9_cr4zy_w1th_b453_64}"
num_iterations = 32

encoded_message = message
encoded_message = encoded_message.encode('ascii')
for i in range(num_iterations):
    #encoded_message_bytes = encoded_message.encode('ascii')
    encoded_message = base64.b64encode(encoded_message)

#print("Original message:", message)
print(encoded_message)

decoded = encoded_message
for i in range(num_iterations * 2):
    decoded = base64.b64decode(encoded_message)

print(decoded)

